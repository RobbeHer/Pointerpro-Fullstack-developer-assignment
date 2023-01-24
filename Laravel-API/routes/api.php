<?php

use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\PurchaseController as AdminPurchaseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('admin')->group(function () {
        Route::apiResources([
            'products' => AdminProductController::class,
        ]);
        Route::apiResource('purchase', AdminPurchaseController::class, ['only' => ['index']]);
    });
});

Route::apiResource('products', ProductController::class, ['only' => ['index', 'show']]);

Route::post('purchase', [PurchaseController::class, 'store']);
