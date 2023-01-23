<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use App\Models\Product;
use App\Models\Purchase;

class PurchaseController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePurchaseRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StorePurchaseRequest $request)
    {
        $purchase = Purchase::create($request->all());

        foreach ($request->get('items') as $item)
        {
            $purchase->products()->attach([$item['id'] => [
                'quantity' => $item['quantity']
            ]]);
        }

        return response()->json([
            'message' => "Purchase created successfully!",
            'purchase' => Purchase::with('products')->find($purchase->id),
        ], 200);
    }
}
