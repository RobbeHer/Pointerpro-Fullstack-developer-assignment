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
        $requestedItems = $request->get('items');
        $requestedProductIds = array_map(fn($item) => $item['id'], $requestedItems);
        $requestedProducts = Product::whereIn('id', $requestedProductIds)->get();
        $warnings = [];

        foreach ($requestedProducts as $requestedProduct)
        {
            $index = array_search($requestedProduct->id, array_column($requestedItems, "id"));
            $requestedItem = $requestedItems[$index];

            if ($requestedProduct->stock >= $requestedItem['quantity']) {
                $requestedProduct->stock -= $requestedItem['quantity'];
                $requestedItems[$index]['price'] = $requestedProduct->price;
            } else {
                $warnings['products'][$requestedProduct->id] = "There are only {$requestedProduct->stock} left in stock for product \"{$requestedProduct->name}\", {$requestedItem['quantity']} requested";
            }
        }

        if (count($warnings)) {
            return response()->json([
                'message' => "Purchase denied!",
                'errors' => $warnings,
            ], 400);
        } else {
            $purchase = Purchase::create($request->all());

            foreach ($requestedProducts as $requestedProduct) {
                $requestedProduct->save();
            }

            foreach ($requestedItems as $requestedItem) {
                $purchase->products()->attach([$requestedItem['id'] => [
                    'quantity' => $requestedItem['quantity'],
                    'price' => $requestedItem['price'],
                ]]);
            }

            return response()->json([
                'message' => "Purchase created successfully!",
                'purchase' => Purchase::with('products')->find($purchase->id),
            ], 200);
        }
    }
}
