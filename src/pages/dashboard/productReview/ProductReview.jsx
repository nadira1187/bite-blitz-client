import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import {
    useQuery
} from '@tanstack/react-query'
import { FaCalendarCheck, FaStar } from "react-icons/fa";
import swal from "sweetalert";
import { MdOutlineCancel } from "react-icons/md";


const ProductReview = () => {

    const axiosPublic = useAxiosPublic();

    const { data: product = [], refetch } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviewproducts');

            return res.data;
        }
    });
    const handleMakeFeatured=products=>{
        axiosPublic.patch(`/featured/${products._id}`)
        .then(res=>{
            console.log(res.data);
            if(res.data.modifiedCount>0)
            {
              refetch();
                swal('product featured successfully')
            }
        })
    }
    return (
        <div>
            <p className='ml-5 mt-4 font-medium'>Total User :{product.length}</p>
            <div className="overflow-x-auto rounded-xl ml-3">
                <table className="table table-zebra">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Product Detail</th>
                            <th>Make Featured</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}


                        {product?.map((products, index) => (
                            <tr key={products._id}>
                                <th>{index + 1}</th>
                                <td>{products.
                                    Product_name
                                }</td>
                                <td>{products.role === "moderator" ? "Moderator" :
                                    <button><Link to={`/details/${products._id}`}>Details</Link></button>}
                                </td>
                                <td>
                                    <button onClick={() => { handleMakeFeatured(products) }}><FaStar className='text-2xl text-blue-900 ' /></button>
                                </td>
                                <td>
                                    <button onClick={() => handleAccept(products)}><FaCalendarCheck className='text-2xl text-blue-900 ' /></button>
                                </td>
                                <td>
                                    <button onClick={() => handleAccept(products)}><MdOutlineCancel className='text-2xl text-blue-900 ' /></button>
                                </td>
                            </tr>
                        ))}




                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductReview;