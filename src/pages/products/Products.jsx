import { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Products = () => {
  const [searchTag, setSearchTag] = useState([]);
  const [products, setProducts] = useState([]);
  const currentPageRef = useRef(1);

  const fetchProducts = async (page) => {
    try {
      console.log(page);
      const response = await axios.get(`https://byte-blitz-server.vercel.app/product?page=${page}`);
      if (currentPageRef.current === page) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts(currentPageRef.current);
    };

    fetchData();

    return () => {
      // Cleanup function to avoid setting state on unmounted component
      currentPageRef.current = 1;
    };
  }, []);

  const handleSearch = async () => {
    try {
      const tagsArray = Array.isArray(searchTag) ? searchTag : [searchTag];

      const response = await axios.get(`https://byte-blitz-server.vercel.app/product/searchByTag?Tags=${encodeURIComponent(tagsArray.join(','))}`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    currentPageRef.current = page;
    fetchProducts(page);
  };

  console.log(products);

  return (
    <div>
      <div className="join flex justify-center items-center my-5">
        <input
          className="input input-primary join-item w-80"
          placeholder="Search based on tag"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
        />
        <button onClick={handleSearch} className="btn bg-blue-900 border-blue-900 text-white text-lg font-bold join-item rounded-r-full">
          <FaSearch></FaSearch>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
      <div className="join my-5 flex justify-end">
        {[1, 2, 3, 4].map((pageNumber) => (
          <input
            key={pageNumber}
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label={pageNumber}
            checked={pageNumber === currentPageRef.current}
            onChange={() => handlePageChange(pageNumber)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
