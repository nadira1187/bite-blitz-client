import { useLoaderData } from "react-router-dom";
import AddReviews from "./AddReviews";
import { TbMessageReport } from "react-icons/tb";
import { BiUpvote } from "react-icons/bi";
//import { useEffect, useState } from "react";



const Details = () => {
    const product = useLoaderData();
    // const [review, setReview] = useState([]);
    // useEffect(() => {
    //     fetch(`https://stay-zen-server.vercel.app/review/${_id}`)
    //         .then((res) => res.json())
    //         .then((data) => setReview(data))

    // }, [_id])
    // console.log(review)

    return (
        <div>
            <div className=" text-red-900 max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto py-10" key={product._id}>
                <div className="w-full rounded-md bg-cover bg-center">
                    <img className="w-76" src={product.Product_image} alt="" />
                </div>
                <div className="ml-3 ">
                    <h1 className="pt-10 text-3xl font-bold ">
                        {product.Product_name}
                    </h1>
                    <p className="flex">
                        {
                            product.Tags?.map((tag, index) => (
                                <p key={index}>#{tag}</p>
                            ))
                        }
                    </p>
                    <a href={product.External_Links}>Product Link:{product.External_Links}</a>
                    <div className="flex justify-between">
                        <p className="text-xl text-red-900 font-semibold">Description: ${product.Description}</p>
                    </div>
                    <div className=" flex gap-5 mt-5">
                    <button className="btn btn-primary text-xl bg-blue-900 font-bold "><TbMessageReport></TbMessageReport></button>
                        <button className="btn btn-primary text-xl bg-blue-900 font-bold"><BiUpvote></BiUpvote></button>
                    </div>
                  
                </div>
            </div>
            {/* <div>
                <h2 className="text-xl md:text-4xl text-red-900 font-mono text-center">Reviews On This Room</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 ml-0 md:ml-2 my-4">
                    {
                        review ?
                            (review.map((reviews) => {
                                return <ReviewCard
                                    key={review.service_id}
                                    review={reviews}
                                ></ReviewCard>
                            })
                            ) :
                            (
                                <p className="text-3xl font-medium text-red-900">No Reviews Available</p>
                            )

                    }
                </div>
            </div> */}
            {/* <ReviewPage></ReviewPage> */}
            {/* <Review id={room._id} ></Review> */}
            <AddReviews key={product._id} product={product}></AddReviews>

        </div>
    );
};

export default Details;