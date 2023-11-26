import swal from "sweetalert";
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
//import Navbar from "../shared/navbar/NavBar";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUser } = useContext(AuthContext)
  const handleRegister = e => {
    e.preventDefault();
    console.log(e.currentTarget)
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photo = form.get("PhotoURL")
    console.log(email, photo);
    console.log(password);
    console.log(name);

    if (password.length < 6) {
      return swal("Opps !!", "Total length of password at least 6 characters", "error");
    }

    // Check if the input contains at least one capital letter
    if (!/[A-Z]/.test(password)) {
      return swal("Opps !!", "Give at least one capital letter ", "error");
    }

    // Check if the input contains any special characters
    // eslint-disable-next-line no-useless-escape
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return swal("Opps !!", "Give at least one special character ", "error");
    }

    createUser(email, password, name)
      .then(result => {
        console.log(result.user);
        updateUser(name, photo)
          .then(() => {
            const userInfo = {
              name: name,
              email: email,
            }
            console.log("updated")
            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  // .catch()
                  console.log("user added")
                  swal("Congrats,You are logged in");
                }
              })
          })

      })
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      {/* <Navbar></Navbar> */}
      <div className="mt-10 flex justify-center items-center">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="name" name="name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input type="text" placeholder="Photo URL" name="PhotoURL" className="input input-bordered" required />
            </div>
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
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary normal-case bg-rose-500 border-rose-500 text-white">Register</button>
            </div>
            <p>Already have an account ? <Link className="text-rose-500" to='/login'>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;