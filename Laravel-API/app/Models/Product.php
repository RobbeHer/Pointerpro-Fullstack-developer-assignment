<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
    ];

    public function purchases()
    {
        return $this->belongsToMany(Purchase::class, 'purchases_products', 'product_id', 'purchase_id');
    }
}
