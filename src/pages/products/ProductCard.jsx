/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { BiUpvote } from "react-icons/bi";
// import { TbMessageReport } from "react-icons/tb";
import { Link,  useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {  Heart, MessageSquare, Tag } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AuthContext } from "../../provider/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
//import useAuth from "../../hooks/useAuth"; // Import the useAuth hook or adjust the path accordingly

const ProductCard = ({ product }) => {

  const { user} = useContext(AuthContext); // Assuming useAuth provides information about the logged-in user
  const { _id, Product_name, Product_image, Tags, Owner_email,vote } = product;
  const [isOwner, setIsOwner] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
    const [isLiked, setIsLiked] = useState(false)

  //const location=useLocation();
  //console.log(user)
  const navigate=useNavigate();

  useEffect(() => {
    // Check if the logged-in user is the owner of the product
    setIsOwner(user && user.email === Owner_email);
    const hasVotedLocally = localStorage.getItem(`hasVoted_${_id}`);
    setHasVoted(hasVotedLocally === 'true');
    setIsLiked(isLiked === "true")

  }, [user, Owner_email,_id]);

  const handleUpvote = async () => {
    try {
      if (!user) {
        navigate('/login');
        return;      
      }

      // Check if the user has already voted
      if (hasVoted) {
        // Display a message or handle accordingly (e.g., disable the button)
        swal("You have already upvoted this product.");
        return;
      }

      // Allow upvote only if the user is logged in and not the owner
      await axios.patch(`https://byte-blitz-server.vercel.app/upvote/${_id}`);
      localStorage.setItem(`hasVoted_${_id}`, 'true');
      
      setHasVoted(true);    
        swal("You liked this product");
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  const handleReport = async () => {
    try {
      const response = await axios.patch(`https://byte-blitz-server.vercel.app/report/${_id}`);
      console.log(response)
      if (response.data.modifiedCount > 0) {
        swal("You Reported this Product");
      }
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  return (
       <Card className="group h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
       <Link to={`/details/${_id}`}>
  <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
    <img
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      src={Product_image || "/placeholder.svg"}
      alt={Product_name}
    />
  </div>
</Link>


        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Vote badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
            <Heart className={`h-3 w-3 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            {vote}
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {Product_name}
        </h3>

        <div className="flex flex-wrap gap-1">
          {Tags?.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {Tags?.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{Tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={handleReport}
          variant="outline"
          size="sm"
          className="flex-1 h-9 text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors bg-transparent"
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Report
        </Button>

        <Button
          onClick={handleUpvote}
          disabled={isOwner || hasVoted}
          size="sm"
          className={`flex-1 h-9 transition-all duration-200 ${
            isLiked ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
          } ${isOwner || hasVoted ? "opacity-50 cursor-not-allowed" : "hover:scale-105 shadow-md hover:shadow-lg"}`}
        >
          <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
          {hasVoted ? "Voted" : "Vote"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
