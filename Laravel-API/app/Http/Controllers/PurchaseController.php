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
        $items = [];
        $requestedItems = $request->get('items');
        $requestedProductIds = array_map(fn($item) => $item['id'], $requestedItems);
        $requestedProducts = Product::whereIn('id', $requestedProductIds)->get();
        $warnings = [];
        $notFound = [];

        foreach ($requestedItems as $requestedItem)
        {
             $requestedProduct = $requestedProducts->firstWhere('id', '==', $requestedItem['id']);

            if (!$requestedProduct) {
                $notFound[$requestedItem['id']] = "Product with id {$requestedItem['id']} was not found";
                continue;
            }

            if ($requestedProduct->stock >= $requestedItem['quantity']) {
                $requestedProduct->stock -= $requestedItem['quantity'];
                $requestedItem['price'] = $requestedProduct->price;
                $items[] = $requestedItem;
            } else {
                $warnings[$requestedProduct->id] = "There are only {$requestedProduct->stock} left in stock for product \"{$requestedProduct->name}\", {$requestedItem['quantity']} requested";
            }
        }

        if (count($warnings) || count($notFound)) {
            return response()->json([
                'message' => "Purchase denied!",
                'warnings' => $warnings,
                'notFound'=> $notFound,
            ], 400);
        } else {
            $purchase = Purchase::create($request->all());

            foreach ($requestedProducts as $requestedProduct) {
                $requestedProduct->save();
            }

            foreach ($items as $item) {
                $purchase->products()->attach([$item['id'] => [
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]]);
            }

            return response()->json([
                'message' => "Purchase created successfully!",
                'purchase' => Purchase::with('products')->find($purchase->id),
            ], 200);
        }
    }
}
