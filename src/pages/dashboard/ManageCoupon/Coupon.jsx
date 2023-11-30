import { BiMessageDetail } from "react-icons/bi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";
import axios from "axios";



const Coupon = () => {
   
   
    const { data: coupon = []} = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await axios.get('https://byte-blitz-server.vercel.app/coupons');
            
            return res.data;

        }
    });  
    console.log(coupon)
    return (
        <div>
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Add Coupon</th>
        <th>View Coupon</th>
        
      </tr>
    </thead>
    <tbody className="mt-5">
    
      <tr className="text-xl text-blue-800 ">
        <th> <button><Link to='/dashboard/addcoupons'><MdOutlinePlaylistAdd></MdOutlinePlaylistAdd></Link></button></th>
        <td><button><Link to='/dashboard/viewcoupons'><BiMessageDetail></BiMessageDetail></Link></button></td>
    <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div> 
        </div>
    );
};

export default Coupon;