<?php
/**
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:52 PM
 * @class UserController
 */

namespace App\Http\Controllers;


use App\History;
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


    /**
     * @param $user
     * @return array
     */
    public function getHistory($user)
    {
        $results = History::with('programme')->where('user_id', $user)->get(['programme_id'])->toArray();
        $result = [];

        foreach ($results as $element) {
            $result[] = $element['programme'];
        }

        return [
            'ret_code' => 200,
            'data' => array_reverse($result)
        ];
    }

}