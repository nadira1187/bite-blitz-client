import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
       < div className=" mt-4 flex flex-col justify-center items-center ">
        <div className=" p-5 flex flex-col justify-center items-center gap-5 bg-slate-100 rounded-xl w-3/5">
            <img className="w-1/2" src="https://i.ibb.co/ZckJxSG/404page.jpg" alt=""/>
              <h1 className=" text-5xl text-red-900 text-center">Nothing to show here !!</h1>
            <Link className="btn bg-red-900 normal-case text-white " to="/">Go back to home</Link>
        </div>
        </div>
    );
};

export default ErrorPage;