import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { GrUpdate } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";


const MyProduct = () => {
    const { user } = useAuth();
    const [products,setProducts]=useState();

    useEffect(() => {
        fetch(`http://localhost:5000/myproduct?email=${user?.email}`
        )
            .then((res) => res.json())
            .then((data) =>setProducts(data));
          
    }, [user]);
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
        <td className="text-blue-900"><GrUpdate/></td>
        <td className="text-blue-900"><FaTrash></FaTrash></td>
      </tr>
     </tbody>
      ))}
      
      
    
  </table>
</div>
        </div>
    );
};

export default MyProduct;