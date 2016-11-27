<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMetaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
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

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('programme_meta');
    }
}
