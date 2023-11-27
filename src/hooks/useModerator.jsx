import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useModerator = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isModerator, isPending: isModeratorLoading } = useQuery({
        queryKey: ['isModerator',user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            console.log('asking or checking is Moderator', user)
            console.log(user.email);

            const res = await axiosSecure.get(`/user/moderator/${user?.email}`);
            console.log(res)
            return res.data;

        }
    })
    return [isModerator, isModeratorLoading]
    // Adding a comment to force refresh

};

export default useModerator;