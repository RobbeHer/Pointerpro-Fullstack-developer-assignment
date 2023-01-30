<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $requestedItems = $request->query('items');
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

            if ($requestedProduct->stock < $requestedItem['quantity']) {
                $warnings[$requestedProduct->id] = "There are only {$requestedProduct->stock} left in stock for product \"{$requestedProduct->name}\", {$requestedItem['quantity']} requested";
            }
        }

        if (count($warnings) || count($notFound)) {
            return response()->json([
                'message' => "Cart check failed!",
                'warnings' => $warnings,
                'notFound'=> $notFound,
            ], 400);
        } else {
            return response()->json([
                'message' => "Purchase created successfully!",
            ], 200);
        }
    }
}
