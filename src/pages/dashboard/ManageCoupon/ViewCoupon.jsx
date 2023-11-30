import {  useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import swal from "sweetalert";


const ViewCoupon = () => {
   
    const { data: coupon = []} = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await axios.get('https://byte-blitz-server.vercel.app/coupons');
            
            return res.data;
        }
    });
    if (coupon.length === 0) {
        // Render loading state or error message
        return <p>Loading...</p>; // You can replace this with an error message if needed
    }
    const {_id}=coupon[0];
    const handleDeleteCoupon = async () => {
        try {
            // Perform the delete operation
            await axios.delete(`https://byte-blitz-server.vercel.app/coupons/${_id}`);
            swal("Deleted");

            // Invalidate and refetch the coupon data after successful deletion
           
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    return (
        <div className="mt-5 ml-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                coupon?.map((coupons)=>(
                    <div key={coupons._id} className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">Code:{coupons.code}</h2>
                      <p>Expired Date:{coupons.Date}</p>
                      <p>Amount:{coupons.amount}</p>
                      <p>Description{coupons.description}</p>
                      <button className="btn btn-primary bg-blue-900"><Link to={`/dashboard/editcoupons/${_id}`}><GrUpdate/></Link></button>
                      <button className="btn btn-primary bg-blue-900" onClick={handleDeleteCoupon}><FaTrash></FaTrash></button>
                    </div>
                  </div>
                ))
            }
           
        </div>
    );
};

export default ViewCoupon;