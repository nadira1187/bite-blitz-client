import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: ['isAdmin',user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            console.log('asking or checking is admin', user)
            console.log(user.email);

            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            console.log(res)
            return res.data;

        }
    })
    return [isAdmin, isAdminLoading]
    // Adding a comment to force refresh

};

export default useAdmin;