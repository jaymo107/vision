<?php
/**
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:52 PM
 * @class UserController
 */

namespace App\Http\Controllers;


use Illuminate\Http\JsonResponse;
use GuzzleHttp as Guzzle;

class RecommendationsController
{

    protected $client;

    public function __construct()
    {
        $this->client = new Guzzle\Client();
    }

    /**
     * Return the basic Json
     * @return {}
     */
    public function getRecommendations($user)
    {
        return new JsonResponse([
            'data' => [
                'user' => $user
            ]
        ], 200);
    }

}