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
        Schema::create('User', function (Blueprint $table) {
            $table->string('uid', 30)->primary();
            $table->string('username', 45)->unique();
            $table->string('password', 45);
            $table->string('fname', 45);
            $table->string('lname', 45);
            $table->string('email', 50)->unique();
            $table->string('phone_number', 25);
            $table->string('role_type', 20);
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('User');
    }
};
