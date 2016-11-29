<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return view('index');
});

$app->group(['prefix' => 'user'], function () use ($app) {
    $app->get('/', ['as' => 'user', 'uses' => 'UserController@getUser']);
});

$app->group(['prefix' => 'programmes'], function () use ($app) {
    $app->get('/', ['as' => 'programmes', 'uses' => 'ProgrammeController@getProgrammes']);
    $app->get('{id}', ['as' => 'programme', 'uses' => 'ProgrammeController@getProgramme']);
});