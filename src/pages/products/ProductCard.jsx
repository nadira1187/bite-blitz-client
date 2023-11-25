/* eslint-disable react/prop-types */
import { BiUpvote } from "react-icons/bi";
import { TbMessageReport } from "react-icons/tb";
import { Link } from "react-router-dom";


const ProductCard = ({product}) => {
    
    const {_id,Product_name,Product_image,Tags}=product;
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
        {
            Tags?.map((tag,index)=>(
                <p key={index}>#{tag}</p>
            ))
        }
    </p>
    <div className="card-actions justify-end">
        <button className="btn btn-primary text-xl bg-blue-900 font-bold "><TbMessageReport></TbMessageReport></button>
      <button className="btn btn-primary text-xl bg-blue-900 font-bold"><BiUpvote></BiUpvote></button>
    </div>
  </div>
</div>
        </div>
    );
};

export default ProductCard;