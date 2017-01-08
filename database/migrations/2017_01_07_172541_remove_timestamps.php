<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveTimestamps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dislikes', function(Blueprint $table) {
            $table->dropTimestamps();
        });

        Schema::table('likes', function(Blueprint $table) {
            $table->dropTimestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dislikes', function(Blueprint $table) {
            $table->timestamps();
        });

        Schema::table('likes', function(Blueprint $table) {
            $table->timestamps();
        });
    }
}
