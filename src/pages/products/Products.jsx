import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { FaSearch } from "react-icons/fa";
import axios from "axios";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTag, setSearchTag] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/product")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
    const handleSearch = async () => {
        try {
            const tagsArray = Array.isArray(searchTag) ? searchTag : [searchTag];

            const response = await axios.get(`http://localhost:5000/product/searchByTag?Tags=${encodeURIComponent(tagsArray.join(','))}`);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(products)
    return (
        <div>
            <div className="join flex justify-center items-center my-5">
                <input className="input input-primary  join-item w-80" placeholder="Search based on tag" value={searchTag}
                    onChange={(e) => setSearchTag(e.target.value)} />
                <button  onClick={handleSearch} className="btn bg-blue-900 border-blue-900 text-white text-lg font-bold join-item rounded-r-full">
                    <FaSearch></FaSearch>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product}></ProductCard>
                ))}
            </div>
            <div className="join my-5 flex justify-end">
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="1" checked />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
</div>
        </div>
    );
};

export default Products;