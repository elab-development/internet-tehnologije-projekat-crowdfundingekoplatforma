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
            DB::statement('ALTER TABLE cities ADD CONSTRAINT check_latitude_range CHECK (latitude >= -90 AND latitude <= 90)');
            DB::statement('ALTER TABLE cities ADD CONSTRAINT check_longitude_range CHECK (longitude >= -180 AND longitude <= 180)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cities', function (Blueprint $table) {
            DB::statement('ALTER TABLE cities DROP CONSTRAINT check_latitude_range');
            DB::statement('ALTER TABLE cities DROP CONSTRAINT check_longitude_range');
        });
    }
};
