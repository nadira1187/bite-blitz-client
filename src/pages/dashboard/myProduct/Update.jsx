import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { WithContext as ReactTags } from 'react-tag-input';
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Update = () => {
    const product=useLoaderData();
    const {_id,Product_name}=product;
    const {user}=useAuth();
    const axiosPublic=useAxiosPublic();
    const name=Product_name;
    const {
        register,
        handleSubmit,setValue,
      
        formState: { errors },
    } = useForm();
    const [tags, setTags] = useState([]);
    // State to manage input tag
    const handleAddTag = (tag) => {
      setTags([...tags, tag]);
      setValue("Tags", tags); // Update the Tags value using setValue
  };
  
  const handleDeleteTag = (index) => {
      setTags(tags.filter((tag, i) => i !== index));
      setValue("Tags", tags); // Update the Tags value using setValue
  };
  const onSubmit = async (data) => {
    const imageFile = { image: data.Product_image[0] }
    const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });

    if (res.data.success) {
        const tagStrings = tags.map((tag) => tag.text);
        const updatedProductInfo = {
            Product_name: data.Product_name,
            Description: data.Description,
            External_Links: data.External_Links,
            Tags: tagStrings,
            Product_image: res.data.data.display_url,
        }


        // Make the update request using the product ID
        const productRes = await axios.put(`https://byte-blitz-server.vercel.app/update/${_id}`, updatedProductInfo);

        if (productRes.data.success) {
            // show success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.Product_name} is updated successfully.`,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            // handle error if update fails
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Update failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}

    return (
        <div>
            <div className="mt-5 ml-3 flex flex-col justify-center items-center ">
            <h2 className="text-4xl  text-blue-900 text-center font-bold mb-5">Product Owner Info</h2>
            <div className="card  lg:card-side bg-base-100 shadow-xl p-4 m-3">
            <figure> <img className="w-32" src={user.photoURL} alt="User" /></figure>   
          <div className='card-body text-blue-900'>
          <h2 className="card-title">Your Name: {user.displayName}</h2>
          <p className='text-xl font-medium'>Your Email: {user.email}</p>
          </div>    
            </div>
            <h2 className="text-4xl lg:text-6xl text-blue-900 text-center font-bold mb-8">Update your product:{name}</h2>
            <div className="mb-5" style={{ borderColor: '#FF0000 blue' }}>
                <label className="label">Add Product Tags</label>
                <ReactTags
                    tags={tags}
                    handleDelete={handleDeleteTag}
                    handleAddition={handleAddTag}
                />
            </div>
            <form className="form form-control gap-3 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col lg:flex-row gap-3">
                    <input  className="input input-bordered input-info w-full max-w-xs " placeholder="Product Name"{...register("Product_name",{ required: true })} />
                    <div className="form-control w-full">
                        <input {...register('Product_image', { required: true })} type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                    </div>
                </div>
               <div className="flex flex-col lg:flex-row gap-3">
               <textarea placeholder="Product Description" className="textarea textarea-info  max-w-xs w-96" {...register("Description", { required: true })} />
                <input
                                type="text"
                                placeholder="External Links"
                                {...register('External_Links', { required: true })}
                                className="input input-bordered input-info w-full max-w-xs" />
               </div>
               
               <button className="btn btn-primary bg-blue-900 text-white">Submit</button>
               {errors.exampleRequired && <span>This field is required</span>}
            </form>
            
        </div>
        </div>
    );
};

export default Update;