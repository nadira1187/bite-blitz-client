import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
    return (
        <div>

            <h2 className=" mt-8 text-4xl font-bold text-blue-900 text-center">Subscribe to Our Membership</h2>
            <h4 className="text-xl mt-5  text-blue-900 text-center">Boost your business! Make Payment to subscribe for unlimited product ads.
            </h4>
            <div>
            <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
            </div>
        </div>
    );
};

export default Payment;