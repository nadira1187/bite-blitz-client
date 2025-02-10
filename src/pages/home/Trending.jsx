import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
    useQuery
} from '@tanstack/react-query'
import ProductCard from "../products/ProductCard";


const Trending = () => {
    const axiosPublic = useAxiosPublic();

    const { data: voted = [] } = useQuery({
        queryKey: ['voted'],
        queryFn: async () => {
            const res = await axiosPublic.get('/topvoted');
            return res.data;
        }
    });
    return (
        <div>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white text-center my-5 ">Trending Products</h2>
            <div className="flex justify-center"> <p  className=" max-w-4xl text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-md lg:text-md dark:text-gray-400">Immerse yourself in unparalleled audio experiences with our trending lineup of wireless earbuds and headphones, delivering crystal-clear sound and unrivaled comfort for your listening pleasure.</p></div>
            <div className="flex justify-center ">
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-5 gap-2">
                {
                    voted.map((product)=>(
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))
                }
            </div>
            </div>
        </div>
    );
};

export default Trending;