<?php
/**
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:52 PM
 * @class UserController
 */

namespace App\Http\Controllers;


use App\History;
use App\Jobs\GenerateRecommendationsJob;
use App\User;
use Doctrine\DBAL\Schema\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
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

    /**
     * @param Request $request
     * @return array
     */
    public function storeUser(Request $request)
    {
        $user = User::firstOrCreate([
            'id' => $request->request->get('user_id')
        ]);

        return [
            'ret_code' => 200,
            'data' => $user->toArray()
        ];
    }

    public function addUser(Request $request)
    {
        return view('add');
    }

    public function userAdded()
    {
        return view('success');
    }

    public function userError()
    {
        return view('fail');
    }

    public function checkUser(Request $request)
    {
        $userId = Input::get('userId');

        $programmes = [];

        for ($i = 0; $i < 10; $i++) {
            $input = Input::get('programme' . ($i + 1));

            if (empty($input)) {
                return redirect(route('user-error'));
            }

            $programmes[] = $input;

        }

        // Add user
        $user = new User([
            'id' => $userId
        ]);

        $user->save();

        // Add History
        foreach ($programmes as $programme) {
            $history = new History([
                'user_id' => $userId,
                'programme_id' => $programme
            ]);

            $history->save();
        }

        $history = History::with('programme')
            ->where('user_id', $userId)->get(['programme_id'])->toArray();

        $result = [];

        foreach ($history as $element) {
            $result[] = $element['programme'];
        }

        // Dispatch a new job to generate the recommendations for this user
        $job = new GenerateRecommendationsJob($user, $result);
        dispatch($job);


        return redirect(route('user-added'));
    }

}