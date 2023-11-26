import {
    useQuery
} from '@tanstack/react-query'
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { RiAdminLine } from "react-icons/ri";
import { MdAddModerator } from "react-icons/md";
import swal from 'sweetalert';

const ManageUser = () => {
    const axiosPublic = useAxiosPublic();
   
    const { data: user = [],refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get('/user', {
                headers:{
                    authorization:`bearer ${localStorage.getItem('access-token')}`
                }
            });
            
            return res.data;
        }
    });
    const handleMakeAdmin=users=>{
        axiosPublic.patch(`/users/admin/${users._id}`)
        .then(res=>{
            console.log(res.data);
            if(res.data.modifiedCount>0)
            {
              refetch();
                swal('admin added successfully')
            }
        })
    }
    const handleMakeModerator=users=>{
        axiosPublic.patch(`/users/moderator/${users._id}`)
        .then(res=>{
            console.log(res.data);
            if(res.data.modifiedCount>0)
            {
              refetch();
                swal('moderator added successfully')
            }
        })
    }
    return (
        <div>
            <p className='ml-5 mt-4 font-medium'>Total User :{user.length}</p>
            <div className="overflow-x-auto rounded-xl ml-3">
                <table className="table table-zebra">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Moderator</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}


                        {user?.map((users,index) => (
                            <tr key={users._id}>
                                <th>{index+1}</th>
                                <td>{users.name}</td>
                                <td>{users.email}</td>
                                <td>{users.role==="moderator"?"Moderator":
                                <button onClick={()=>{handleMakeModerator(users)}}><MdAddModerator className='text-2xl text-blue-900 ' /></button>} 
                                </td>
                                <td>{users.role==="admin"?"Admin":
                                <button onClick={()=>handleMakeAdmin(users)}><RiAdminLine className='text-2xl text-blue-900 ' /></button>} 
                                </td>
                            </tr>
                        ))}




                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;