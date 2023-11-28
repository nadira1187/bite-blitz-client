/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BiUpvote } from "react-icons/bi";
import { TbMessageReport } from "react-icons/tb";
import { Link,  useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../provider/AuthProvider";
//import useAuth from "../../hooks/useAuth"; // Import the useAuth hook or adjust the path accordingly

const ProductCard = ({ product }) => {

  const { user} = useContext(AuthContext); // Assuming useAuth provides information about the logged-in user
  const { _id, Product_name, Product_image, Tags, Owner_email,vote } = product;
  const [isOwner, setIsOwner] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  //const location=useLocation();
  //console.log(user)
  const navigate=useNavigate();

  useEffect(() => {
    // Check if the logged-in user is the owner of the product
    setIsOwner(user && user.email === Owner_email);
  }, [user, Owner_email]);

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
      await axios.patch(`http://localhost:5000/upvote/${_id}`);
      setHasVoted(true);
      swal("Updated");
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  const handleReport = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/report/${_id}`);
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
    <div>
      <div className="card card-compact w-80 bg-base-100 shadow-xl">
        <figure>
          <Link to={`/details/${_id}`}>
            <img className="w-64 h-64" src={Product_image} alt="Shoes" />
          </Link>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{Product_name}</h2>
          <p className="flex">
            {Tags?.map((tag, index) => (
              <p key={index}>#{tag}</p>
            ))}
          </p>
          <div className="card-actions justify-end">
            <button
              onClick={handleReport}
              className="btn btn-primary text-xl bg-blue-900 font-bold "
            >
              <TbMessageReport></TbMessageReport>
            </button>
            <button
              onClick={handleUpvote}
              className={`btn btn-primary text-xl bg-blue-900 font-bold ${
                isOwner ? "cursor-not-allowed" : "" // Disable button styling for the owner
              }`}
              disabled={isOwner || hasVoted} // Disable the button for the owner or if already voted
            >
              <BiUpvote></BiUpvote> {vote}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
