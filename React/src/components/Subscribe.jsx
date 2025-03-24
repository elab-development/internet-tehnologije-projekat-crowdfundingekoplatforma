import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51PYS892MNsDLBJXPEDLA1BV5KVYbhDlGJbjUOWTRhDByPv7TEfQ0ZDVVHE7rgT9SrVQK579HjRdP09e0qN7zf1il00Mqpxxqwh'); // Use your test publishable key

const Subscribe = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default Subscribe;