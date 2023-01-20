<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->sentence(random_int(3, 7), true),
            'description' => fake()->text(200),
            'price' => fake()->randomFloat(2, 0, 10_000),
            'stock' => fake()->randomNumber(2, false),
        ];
    }
}
