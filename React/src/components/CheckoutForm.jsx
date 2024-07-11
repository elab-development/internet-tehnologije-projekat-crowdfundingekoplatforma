import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CheckoutForm.css';

const CheckoutForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                /*billing_details: {
                    email: email,
                },*/
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            const response = await axios.post('http://127.0.0.1:8000/api/stripe/create-subscription', {
                email: email,
                payment_method: paymentMethod.id,
            });

            if (response.data.error) {
                setError(response.data.error);
                setLoading(false);
                return;
            } else {
                console.log('Subscription:', response.data.subscription);
            }
            navigate('/profile');
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <div className="checkout-form-container">
                <h2>Subscribe to Our Eco Projects</h2>
                <p>Join us in making the world a better place. Subscribe to support our environmental projects.</p>
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="card-element">Credit or Debit Card</label>
                    <div className="card-element">
                        <CardElement id="card-element" />
                    </div>
                    {error && <div className="card-errors" role="alert">{error}</div>}
                    <button type="submit" className="submit-btn" disabled={!stripe || loading}>
                        {loading ? 'Processing...' : 'Subscribe'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;