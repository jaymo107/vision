<?php
/**
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:52 PM
 * @class UserController
 */

namespace App\Http\Controllers;


use Illuminate\Http\JsonResponse;
use Kozz\Laravel\Facades\Guzzle;

class UserController
{

    /**
     * Return the currently logged in users details.
     * @return string
     */
    public function getUser()
    {
        $client = Guzzle::getFacadeRoot();

        return new JsonResponse([
            'name' => '',
            'email' => '',
            'token' => '',
            'timestamp' => ''
        ], 200);
    }

}