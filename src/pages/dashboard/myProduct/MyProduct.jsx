import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { GrUpdate } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import swal from "sweetalert";
import { Link } from "react-router-dom";


const MyProduct = () => {
    const { user } = useAuth();
    const [products,setProducts]=useState();
    const axiosPublic=useAxiosPublic();

    useEffect(() => {
        fetch(`https://byte-blitz-server.vercel.app/myproduct?email=${user?.email}`
        )
            .then((res) => res.json())
            .then((data) =>setProducts(data));
          
    }, [user]);
    const handleDelete = async (productToDelete) => {
      try {
        const response = await axiosPublic.delete(`deleteproduct/${productToDelete._id}`);
        swal("Deleted");
        
        // Filter out the deleted product from the state
        const remainingProducts = products.filter((product) => product._id !== productToDelete._id);
        
        // Update the state with the remaining products
        setProducts(remainingProducts);
        
        console.log(response.data); // Handle the result as needed
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
    
    //console.log(products);
    return (
        <div>
           <div className="overflow-x-auto">
  <table className="table">

    {/* head */}
    <thead>
      <tr>
      {/* <p> {products.length}</p>  */}
       
        <th>Product Name</th>
        <th>Votes</th>
        <th>Status</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    
      {/* row 1 */}
      {products?.map((product)=>(
        <tbody key={product._id}>
        <tr>
        <th>{product.Product_name}</th>
        <td>{product.vote} </td>
        <td>{product.Status}</td>
        <Link to={`/dashboard/update/${product._id}`}> <td className="text-blue-900"><GrUpdate/></td></Link>
        <td onClick={()=>handleDelete(product)} className="text-blue-900"><FaTrash></FaTrash></td>
      </tr>
     </tbody>
      ))}
      
      
    
  </table>
</div>
        </div>
    );
};

export default MyProduct;