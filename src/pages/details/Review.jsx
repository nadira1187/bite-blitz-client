/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Review = ({ product }) => {
  const { data: review = [], refetch } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/review/${product._id}`);
      refetch();
      return res.data;
    },
  });

  return (
    <div>
      <h2>Reviews in this product</h2>
      <div className="card bg-slate-300 w-80 md:w-96 text-red-900">
        <div className="card-body">
          {review.length > 0 ? (
            review.map((review) => (
              <div key={review.id}>
                <h2 className="">Customer Name: {review.name}</h2>
                <p>Rating: {review.ratings}</p>
                <p>Feedback: {review.description}</p>
              </div>
            ))
          ) : (
            <p className="text-3xl font-medium text-red-900">No Reviews Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
