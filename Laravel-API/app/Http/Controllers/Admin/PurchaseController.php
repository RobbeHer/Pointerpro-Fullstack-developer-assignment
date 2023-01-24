<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PurchaseCollection;
use App\Models\Purchase;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return PurchaseCollection
     */
    public function index()
    {
        return new PurchaseCollection(Purchase::with('products')->orderBy('created_at', 'desc')->paginate(10));
    }
}
