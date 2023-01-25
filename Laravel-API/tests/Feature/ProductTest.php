<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Tests\TestCase;

class ProductTest extends TestCase
{
    /**
     * @return void
     */
    public function test_user_can_make_product()
    {
        // Authenticate user
        $user = User::factory()->create();
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);
        $this->assertAuthenticated();
        $response->assertNoContent();

        // Create product
        $product = Product::factory()->create();
        $response = $this->post('/api/admin/products', [
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'stock' => $product->stock,
        ]);
        // print_r($response->getOriginalContent());
        $response
            ->assertStatus(200)
            ->assertJson([
                'message' => "Product created successfully!",
            ]);
    }

    /**
     * @return void
     */
    public function test_client_can_not_make_product()
    {
        $product = Product::factory()->create();
        $response = $this->post('/api/admin/products', [
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'stock' => $product->stock,
        ]);
        $response->assertStatus(302);
    }
}
