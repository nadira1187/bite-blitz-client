import { useForm } from "react-hook-form"
import useAuth from "../../hooks/useAuth"
import { useState } from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddProduct=()=> {
    const {user}=useAuth();
    const axiosPublic=useAxiosPublic();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [tags, setTags] = useState([]);


    const today = new Date();

    const formattedDate = today.toLocaleDateString();
  
    const onSubmit =async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(watch(res.data));
        data.tags = tags.map((tag) => tag.text);
        console.log(data);
        if(res.data.success)
        {
            const productInfo = {
                
                Product_name: data.Product_name,
                Description:data.Description,
                Date:formattedDate,
                Status:"pending",
                External_Links:data.External_Links,
                Tags:data.Tags,
                vote:0,
                report:0,
                Featured:false,
                Product_image: res.data.data.display_url,
                Owner_email:user?.email

            }
            console.log(productInfo)
            const productRes = await axiosPublic.post('/addproduct', productInfo);
            console.log(productRes.data)
            if(productRes.data.insertedId){
                // show success popup
                 Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.Product_name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }


   


    return (
        <div className="mt-5 ml-3">
            <h2 className="text-4xl  text-blue-900 text-center font-bold mb-5">Product Owner Info</h2>
            <div className="card  lg:card-side bg-base-100 shadow-xl p-4 m-3">
            <figure> <img className="w-32" src={user.photoURL} alt="User" /></figure>   
          <div className='card-body text-blue-900'>
          <h2 className="card-title">Your Name: {user.displayName}</h2>
          <p className='text-xl font-medium'>Your Email: {user.email}</p>
          </div>    
            </div>
            <h2 className="text-4xl lg:text-6xl text-blue-900 text-center font-bold mb-8">Add your product</h2>
            <form className="form form-control gap-3 justify-center items-center" onSubmit={handleSubmit(onSubmit,errors)}>
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
               <div   style={{borderColor: '#FF0000 blue' }} >
                    {/* Tags input field */}
                    <label className="label">Add Tags</label>
                    <ReactTags 
                          {...register("Tags", { required: true })}
                        tags={tags}
                        handleDelete={(index) => setTags(tags.filter((tag, i) => i !== index))}
                        handleAddition={(tag) => setTags([...tags, tag])}
                    />
                </div>
               <button className="btn btn-primary bg-blue-900 text-white">Submit</button>
               {errors.exampleRequired && <span>This field is required</span>}
            </form>
        </div>

    )
};
export default AddProduct;