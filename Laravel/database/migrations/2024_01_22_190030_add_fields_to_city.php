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
        Schema::table('cities', function (Blueprint $table) {
            $table->string("name");
            $table->string("region");
            $table->string("country");
            $table->string("planet");
            $table->float("latitude");
            $table->float("longitude");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cities', function (Blueprint $table) {
            $table->dropColumn("name");
            $table->dropColumn("region");
            $table->dropColumn("country");
            $table->dropColumn("planet");
            $table->dropColumn("latitude");
            $table->dropColumn("longitude");
        });
    }
};
