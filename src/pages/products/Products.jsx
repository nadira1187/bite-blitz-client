import { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Search, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
const Products = () => {
  const [searchTag, setSearchTag] = useState([]);
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid")

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            All Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of cutting-edge tech accessories
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-3 w-full lg:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by tags (e.g., wireless, gaming, audio)"
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-10"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-10"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        <div className="mb-12">
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {products.map((product) => (
              <div key={product._id} className="transform hover:scale-105 transition-transform duration-300">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3, 4].map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={pageNumber === currentPageRef.current ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNumber)}
                className="w-10 h-10 rounded-full"
              >
                {pageNumber}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Products;
