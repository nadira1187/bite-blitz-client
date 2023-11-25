import {Link} from "react-router-dom"
const Banner = () => {

    return (
        <div className="mt-5">
            <div style={{backgroundImage:"url('https://i.ibb.co/mTr4mLJ/ban.jpg')"}} className="hero min-h-screen   bg-opacity-10  mt-4">
  <div className="hero-content flex-col-reverse lg:flex-row-reverse">

{/* <div>
    <img src="https://i.ibb.co/9tn74f7/31458.jpg" className=" w-11/12 rounded-full" /></div> */}

<div className="text-center text-white bg-slate-100 bg-opacity-30 p-4 rounded-md ">
<h1 className=" text-4xl md:text-7xl font-bold stroke-red-700">All Tech <br /> Accessories</h1>
      <p className="py-6 text-sm md:text-lg">Discover Innovation: Explore Our Latest Tech Marvels! Shop Now for Cutting-Edge <br /> Gadgets and Electronics at Unbeatable Prices.</p>
      <button className="btn btn-primary text-white normal-case bg-blue-900 border-blue-900"> <Link to='/login'>Get Started</Link></button>
</div>
</div>   
    </div>
  </div>
    );
};

export default Banner;