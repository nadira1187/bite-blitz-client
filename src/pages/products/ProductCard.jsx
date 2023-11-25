/* eslint-disable react/prop-types */


const ProductCard = ({product}) => {
    const {Product_name,Product_image,Tags}=product;
    return (
        <div>
            <div className="card card-compact w-80 bg-base-100 shadow-xl">
  <figure><img className="w-64 h-64" src={Product_image} alt="Shoes" /></figure>
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
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default ProductCard;