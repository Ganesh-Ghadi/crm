<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId("project_id")->nullable()->constrained()->onDelete("cascade");
            $table->string('title')->nullable();
            $table->string("description")->nullable();
            $table->string("priority")->nullable();
            $table->string("weight")->nullable();
            $table->string('status')->nullable();
            $table->date("start_date")->nullable();
            $table->date("end_date")->nullable();
            $table->timestamps();
            $table->softDeletes(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};