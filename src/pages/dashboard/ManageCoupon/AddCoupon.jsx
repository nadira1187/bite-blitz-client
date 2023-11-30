import swal from "sweetalert";


const AddCoupon = () => {

    const handleAddCoupon = event => {
        event.preventDefault();
        const form = event.target;
        const code = form.code.value;
        const Date=form.Date.value;
        const amount = form.amount.value;
        const description = form.description.value;
        const coupons = {
           code,Date,amount,description
        }
        fetch('http://localhost:5000/coupon', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(coupons)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    swal('Coupon added successfully')
                }
            })
    }
    return (
        <div>
             <form onSubmit={handleAddCoupon} >
                <div className="  flex flex-col gap-4  justify-center items-center mt-5 mb-5">
                    <input type="text" name="code"placeholder="Coupon Code"  className=" input input-bordered input-secondary w-full max-w-xs" />
                    <input  type="date" name="Date"placeholder="Expired Date"  className="input input-bordered input-secondary w-full max-w-xs" />
                    <input type="text" name="amount" placeholder="Add Amount" className="input input-bordered input-secondary w-full max-w-xs" />
                    <input type="text" name="description" placeholder="Coupon  Description" className="input input-bordered input-secondary w-full max-w-xs" />
                  
                    <input className="btn btn-primary bg-blue-900 border-none btn-wide text-white normal-case" type="submit" value="Add Coupon" />
                </div>
            </form>
        </div>
    );
};

export default AddCoupon;