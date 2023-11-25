import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/product")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
console.log(products)
    return (
        <div>
            <div className="join flex justify-center items-center my-5">
  <input className="input input-primary  join-item" placeholder="Search based on tag"/>
  <button className="btn bg-blue-900 border-blue-900 text-white join-item rounded-r-full">Search</button>
</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))}
                </div>
        </div>
    );
};

export default Products;