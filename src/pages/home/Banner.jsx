import {Link} from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css';
const Banner = () => {
   AOS.init();
    return (
        <div className="mt-5">
            {/* <div style={{backgroundImage:"url('https://i.ibb.co/mTr4mLJ/ban.jpg')"}} className="hero min-h-screen   bg-opacity-10  mt-4">
  <div className="hero-content flex-col-reverse lg:flex-row-reverse">

 <div>
    <img src="https://i.ibb.co/9tn74f7/31458.jpg" className=" w-11/12 rounded-full" /></div> 

<div data-aos="fade-up"
 className="text-center text-white bg-slate-100 bg-opacity-30 p-4 rounded-md ">
<h1 className=" text-4xl md:text-7xl font-bold stroke-red-700">All Tech <br /> Accessories</h1>
      <p className="py-6 text-sm md:text-lg">Discover Innovation: Explore Our Latest Tech Marvels! Shop Now for Cutting-Edge <br /> Gadgets and Electronics at Unbeatable Prices.</p>
      <button className="btn btn-primary text-white normal-case bg-blue-900 border-blue-900"> <Link to='/login'>Get Started</Link></button>
</div>
</div>   
    </div> */}
    <section className="">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">All Tech Accessories</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Discover Innovation: Explore Our Latest Tech Marvels! Shop Now for Cutting-Edge, Gadgets and Electronics at Unbeatable Prices.</p>
            <Link to='/login'><button className="group relative flex w-36 items-center rounded-lg border-2 border-blue-900 p-4 text-blue-900"><span>Get Start</span><span className="absolute right-3 box-content flex w-1/6 justify-center rounded-md bg-blue-900 duration-300 group-hover:w-5/6"><svg viewBox="0 0 24 24" fill="none" className="w-10" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g></svg></span></button></Link>
        </div>
        <div className="flex flex-col lg:mt-0 lg:col-span-5 lg:flex-row">
            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup"/>
        </div>                
    </div>
</section>
  </div>
    );
};

export default Banner;