import { useContext  } from "react";
import { useLocation,useNavigate ,Link} from "react-router-dom";
import swal from "sweetalert";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
//import Navbar from "../shared/navbar/NavBar";
import { AuthContext } from "../../provider/AuthProvider";
import app from "../../firebase/firebase.config";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";
//import axios from "axios";
const Login = () => {
    const {signIn}=useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth(app);
    const axiosPublic=useAxiosPublic();

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {

        signInWithPopup(auth, provider)
            .then(res => {
              const userInfo={
                email:res.user?.email,
                name:res.user?.displayName,
                photo:res.user?.photoURL,isSubscibed:false,
              }
              axiosPublic.post('/users',userInfo)
                console.log(res);
                swal("Signed in!", "You Signed in Successfully!", "success");
                navigate(location?.state?location.state:'/');
            })
            .catch(err => {
                console.log(err);
            })
    }


    const handleLogin = e =>{
        e.preventDefault();
        console.log(e.currentTarget)
        const form =new FormData(e.currentTarget);
        const email=form.get("email");
        const password=form.get("password")
        console.log(email ,password);
        signIn(email,password)
        .then(result => {
            console.log(result.user)
            const loggedInUser = result.user;
                console.log(loggedInUser);
                if(result.user)
                {
                  swal("Signed in!", "You Signed in Successfully!", "success");
                navigate(location?.state?location.state:'/');
                }
                
                //const user = { email };

                // get access token
              //  axios.post('https://stay-zen-server.vercel.app/jwt', user, { withCredentials: true })
              //       .then(res => {
              //           console.log(res.data)
              //           if (res.data.success) {
              //             swal("Good job!", "You are logged in!", "success");
              //               navigate(location?.state ? location?.state : '/')
              //           }
              //       })

        })
        .catch(error =>{
            console.error(error);
            swal("Login Failed", "Email or password is incorrect", "error");
        })
    }
    return (
        <div>
           <Helmet>
                <title>Login</title>
            </Helmet>
            {/* <Navbar></Navbar> */}
        <div className="mt-10 flex justify-center items-center">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary normal-case bg-blue-900 border-blue-900 text-white">Login</button>
        </div>
        <div className="form-control mt-6">
          <button onClick={handleGoogleLogin} className="btn btn-primary normal-case bg-transparent border-blue-950 text-black"><FcGoogle className="text-xl"></FcGoogle>Continue with Google</button>
        </div>

        <Link to='/Register'>Do not have an account ? <a className="text-blue-900 font-medium" >Register</a></Link>
      </form>
    </div>
        </div>
        
        </div>
    );
};

export default Login;