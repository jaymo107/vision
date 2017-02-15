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

$app->get('/', ['as' => 'home', 'middleware' => [], 'uses' => 'HomeController@index']);

$app->group(['prefix' => 'user'], function () use ($app) {
    $app->get('/', ['as' => 'user', 'uses' => 'UserController@getUser']);
    $app->post('/store', ['as' => 'storeUser', 'uses' => 'UserController@storeUser']);
});

$app->get('/history/{user}', ['as' => 'history', 'middleware' => [], 'uses' => 'UserController@getHistory']);

$app->group(['prefix' => 'programmes'], function () use ($app) {
    $app->get('/', ['as' => 'programmes', 'uses' => 'ProgrammeController@getProgrammes']);

    $app->group(['prefix' => '{id}'], function () use ($app) {
        $app->get('/', ['as' => 'programme', 'uses' => 'ProgrammeController@getProgramme']);
        $app->post('/rate', ['as' => 'programme', 'uses' => 'ProgrammeController@rateProgramme']);
        $app->get('/rating', ['as' => 'programme', 'uses' => 'ProgrammeController@getRating']);
    });
});

$app->group(['prefix' => 'recommendations'], function () use ($app) {
    $app->get('{user}', ['as' => 'recommendations', 'uses' => 'RecommendationsController@getRecommendations']);
});

$app->group(['prefix' => 'meta'], function () use ($app) {
    $app->post('{programme_id}', ['as' => 'storeMeta', 'uses' => 'MetaController@storeMeta']);
    $app->get('{programme_id}', ['as' => 'meta', 'uses' => 'MetaController@getMeta']);
});

$app->get('toggle-algorithm', ['as' => 'togglealgorithm', 'uses' => 'ConfigController@toggle']);

//$app->get('seed', ['as' => 'seed', 'uses' => 'SeedController@seed']);
$app->get('fakeRatings', ['as' => 'fakeRatings', 'uses' => 'SeedController@ratings']);

$app->get('addUser', ['as' => 'showAddUser', 'uses' => 'UserController@addUser']);
$app->post('addUser', ['as' => 'checkUser', 'uses' => 'UserController@checkUser']);
$app->get('user-added', ['as' => 'user-added', 'uses' => 'UserController@userAdded']);
$app->get('user-error', ['as' => 'user-error', 'uses' => 'UserController@userError']);


$app->get('display-recommendations/{user}', ['as' => 'display-recommendations', 'uses' =>
    'RecommendationsController@display']);