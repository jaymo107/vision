<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemakeMetaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programmes', function (Blueprint $table) {
            $table->string('programme_id')->primary();
            $table->string('imdb_id');
            $table->string('type')->nullable();
            $table->boolean('series')->default(false);
            $table->text('genres')->nullable();
            $table->text('actors')->nullable();
            $table->text('poster')->nullable();
            $table->string('rated')->nullable();
            $table->string('rating')->nullable();
            $table->text('writers')->nullable();
            $table->string('director')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('programmes');
    }
}
