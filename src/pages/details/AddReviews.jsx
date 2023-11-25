/* eslint-disable react/prop-types */

import {  useContext } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../provider/AuthProvider";


const AddReviews = ({product}) => {
   
    const {user}=useContext(AuthContext);
   // console.log(user);

    // useEffect(() => {
    //     fetch(`http://localhost:5000/product`)
    //         .then((res) => res.json())
    //         .then((data) => setProducts(data));
    // }, []);
    const {  _id} = product;
    //console.log(_id);
    const handleAddReview = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const image=form.image.value;
        const ratings = form.ratings.value;
        const description = form.description.value;
        const reviews = {
           name,image,ratings,description,product_id:_id
        }
        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviews)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    swal('Review added successfully')
                }
            })
    }
    return (
        <div>
            
            
            <form onSubmit={handleAddReview} >
                <div className="  flex flex-col gap-4  justify-center items-center mb-5">
                    <input readOnly type="text" name="name" defaultValue={user?.displayName} className=" input input-bordered input-secondary w-full max-w-xs" />
                    <input readOnly placeholder={user?.photoURL} type="text" name="image" defaultValue={user?.photoURL} className="input input-bordered input-secondary w-full max-w-xs" />
                    <input type="text" name="ratings" placeholder="Add Rating" className="input input-bordered input-secondary w-full max-w-xs" />
                    <input type="text" name="description" placeholder="Review Description" className="input input-bordered input-secondary w-full max-w-xs" />
                  
                    <input className="btn btn-primary bg-red-900 border-none btn-wide text-white normal-case" type="submit" value="Add Review" />
                </div>
            </form>
       
        </div>
    );
};

export default AddReviews;