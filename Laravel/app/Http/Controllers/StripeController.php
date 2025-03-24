<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Subscription;
use Stripe\PaymentMethod;

class StripeController extends Controller
{
    public function createSubscription(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));

        if ($user->stripe_id == "") {
            return response()->json(['error' => 'Customer not found.'], 404);
        }

        $customer = Customer::retrieve($user->stripe_id);

        $paymentMethod = PaymentMethod::retrieve($request->payment_method);

        $paymentMethod->attach(['customer' => $customer->id]);
        $customer->invoice_settings = ['default_payment_method' => $request->payment_method];
        $customer->save();

        //$price = Price::all();
        //$product = Product::all(['name' => 'Eco Platform Monthly Subscription'])->data[0];

        $subscription = Subscription::create([
            'customer' => $customer->id,
            'items' => [['plan' => 'price_1PYps62MNsDLBJXP60suHpix']],
            /*'expand' => ['latest_invoice.payment_intent'],*/
        ]);

        return response()->json(['subscription' => $subscription]);
    }

    public function getSubscriptionStatus(Request $request)
    {
        $email = $request->query('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['status' => 'User not found.'], 404);
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $customer = null;

        if ($user->stripe_id == "") {
            $customer = Customer::create([
                'name' => $user->name,
                'email' => $user->email,
            ]);
    
            $user->stripe_id = $customer->id;
            $user->save();
        } else {
            try {
                $customer = Customer::retrieve($user->stripe_id);
            } catch (Exception $e) {
                return response()->json(['error' => "".$e->getMessage()], 404);
            }
        }

        if (!$customer) {
            return response()->json(['error' => 'Customer not found.'], 404);
        }

        $subscriptions = Subscription::all(['customer' => $user->stripe_id]);

        if (count($subscriptions) == 0) {
            return response()->json(['status' => 'Not subscribed.'], 200);
        }

        $activeSubscription = array_filter($subscriptions->data, function($subscription) {
            //Log::channel('console')->info('sub: '.$subscription);
            return $subscription->status === 'active';
        });

        if (count($activeSubscription) > 0) {
            return response()->json(['status' => 'Active'], 200);
        } else {
            return response()->json(['status' => 'Not subscribed.'], 200);
        }
    }
}