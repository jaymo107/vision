<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewColumnsToMetadata extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::drop('programme_meta');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('programme_meta', function(Blueprint $table) {
            $table->string('programme_id');
            $table->string('imdb_type');
            $table->string('imdb_genres');
            $table->string('imdb_poster');
            $table->string('imdb_rated');
            $table->string('imdb_rating');
            $table->string('imdb_id');
        });
    }
}
