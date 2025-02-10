import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
    useQuery
} from '@tanstack/react-query'
import ProductCard from "../products/ProductCard";

const Featured = () => {
    const axiosPublic = useAxiosPublic();

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/featuredproducts');
            return res.data;
        }
    });
    return (
        <div>
            <h2 className=" mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white text-center my-5 ">Featured Products</h2>
       <div className="flex justify-center"> <p  className=" max-w-4xl text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-md lg:text-md dark:text-gray-400">Discover the unparalleled performance of our flagship smartphones, boasting stunning displays, lightning-fast processors, and advanced camera systems to capture every moment .</p></div>
            <div className="flex justify-center ">
            <div className="max-w-7xl  grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-5 my-3 gap-5 ">
                {
                    products.map((product)=>(
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))
                }
            </div>
            </div>
            
        </div>
    );
};

export default Featured;