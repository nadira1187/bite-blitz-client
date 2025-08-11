import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
    useQuery
} from '@tanstack/react-query'
import ProductCard from "../products/ProductCard";
import { Sparkles } from "lucide-react";

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
         <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Featured Collection
          </div>

          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            Featured Products
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              Discover the unparalleled performance of our flagship smartphones, boasting stunning displays,
              lightning-fast processors, and advanced camera systems to capture every moment.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
             {
                    products.map((product)=>(
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))
                }
          </div>
        </div>
      </div>
    </section>
    );
};

export default Featured;
