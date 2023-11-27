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
            <h2 className="text-4xl lg:text-6xl font-bold text-blue-900 text-center my-5 ">Featured Products</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 my-5 gap-2">
                {
                    products.map((product)=>(
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))
                }
            </div>
        </div>
    );
};

export default Featured;