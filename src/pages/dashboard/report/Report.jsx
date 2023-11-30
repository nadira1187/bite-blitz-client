import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { BiMessageDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

import axios from "axios";
import swal from "sweetalert";


const Report = () => {
    const axiosPublic = useAxiosPublic();


    const { data: product = [], refetch } = useQuery({
      queryKey: ['product'],
      queryFn: async () => {
        const res = await axiosPublic.get('/reportproducts');
        return res.data;
      },
    });
    const handleDelete = async (productId) => {
      try {
        await axios.delete(`https://byte-blitz-server.vercel.app/deleteproduct/${productId}`);
        // Update the products list after deletion
        swal("Product is deleted")
        refetch();
        
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };
    console.log(product)
    return (
        <div>
          <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Product Name</th>
        <th>Product Details</th>
        <th>Delete</th>
      </tr>
    </thead>
    {product.map((products,index)=>(
   <tbody key={products._id}>
   {/* row 1 */}
   <tr className="bg-base-200">
     <th>{index+1}</th>
     <td>{products.Product_name}</td>
     <td><Link to={`/details/${products._id}`}><BiMessageDetail></BiMessageDetail></Link></td>
     <td  > <button><FaTrashAlt onClick={() => handleDelete(products._id)}></FaTrashAlt></button></td>
   </tr>
  
 </tbody>
    ))}
    
  </table>
</div>
        </div>
    );
};

export default Report;