import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
    useQuery
} from '@tanstack/react-query'
import ProductCard from "../products/ProductCard";
import { FlameIcon as Fire } from "lucide-react"


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
         <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-full mb-6">
            <Fire className="w-4 h-4 mr-2" />
            Hot Trending
          </div>

          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
            Trending Products
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              Immerse yourself in unparalleled audio experiences with our trending lineup of wireless earbuds and
              headphones, delivering crystal-clear sound and unrivaled comfort for your listening pleasure.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {voted.map((product) => (
              <div key={product._id} className="transform hover:scale-105 transition-transform duration-300">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    );
};

export default Trending;
//  {
//                     voted.map((product)=>(
//                         <ProductCard key={product._id} product={product}></ProductCard>
//                     ))
//                 }