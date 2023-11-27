import { useForm } from "react-hook-form"
import useAuth from "../../hooks/useAuth"
import { useState } from "react";
import { WithContext as ReactTags } from 'react-tag-input';



const AddProduct=()=> {
    const {user}=useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [tags, setTags] = useState([]);



    const onSubmit = (data) => {
        data.tags = tags.map((tag) => tag.text);
        console.log(data)
    }


    console.log(watch("example")) // watch input value by passing the name of it


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
            <form className="form form-control gap-3 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col lg:flex-row gap-3">
                    <input className="input input-bordered input-info w-full max-w-xs " placeholder="Product Name"{...register("Product_name",{ required: true })} />
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
               <input className="btn btn-primary bg-blue-900 text-white" type="submit" />
               {errors.exampleRequired && <span>This field is required</span>}
            </form>
        </div>

    )
};
export default AddProduct;