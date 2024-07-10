<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\StripeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('forgot-password', [PasswordController::class, 'sendResetLink']);
Route::post('reset-password', [PasswordController::class, 'reset']);
Route::post('change-password', [PasswordController::class, 'change']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('cities', [CityController::class, 'index'])->name('cities.index');
    Route::get('cities/{city}', [CityController::class, 'show'])->name('cities.show');
    
    Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('projects/{project}', [ProjectController::class, 'show'])->name('projects.show');

    Route::get('my-projects', [ProjectController::class, 'usersProjects']);
    
    Route::post('projects/{project}/add-user', [ProjectController::class, 'addUser']);
    Route::delete('projects/{project}/remove-user', [ProjectController::class, 'removeUser']);

    Route::post('/stripe/create-customer', [StripeController::class, 'createCustomer']);
    Route::post('/stripe/attach-payment-method', [StripeController::class, 'attachPaymentMethod']);
    Route::post('/stripe/create-subscription', [StripeController::class, 'createSubscription']);
    Route::get('/stripe/subscription-status', [StripeController::class, 'getSubscriptionStatus']);

    // Route to cancel a subscription
    //Route::post('/stripe/cancel-subscription', [StripeController::class, 'cancelSubscription']);
   
    Route::middleware('admin')->group(function() {
        Route::apiResource('users', UserController::class);

        Route::post('cities', [CityController::class, 'store'])->name('cities.store');
        Route::put('cities/{city}', [CityController::class, 'update'])->name('cities.update');
        Route::patch('cities/{city}', [CityController::class, 'update'])->name('cities.update');
        Route::delete('cities/{city}', [CityController::class, 'destroy'])->name('cities.destroy');

        Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');
        Route::put('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
        Route::patch('projects/{pro+ject}', [ProjectController::class, 'update'])->name('projects.update');
        Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

        Route::post('projects/{project}/add-user/{user}', [ProjectController::class, 'addOtherUser']);
        Route::delete('projects/{project}/remove-user/{user}', [ProjectController::class, 'removeOtherUser']);
    });
});