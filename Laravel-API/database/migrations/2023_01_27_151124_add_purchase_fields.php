<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('purchases', function($table) {
            $table->renameColumn('username', 'name');
            $table->string('email');
            $table->string('address');
        });

        Schema::table('purchases_products', function($table) {
            $table->decimal('price');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('purchases', function($table) {
            $table->renameColumn('name', 'username');
            $table->dropColumn('email');
            $table->dropColumn('address');
        });

        Schema::table('purchases_products', function($table) {
            $table->dropColumn('price');
        });
    }
};
