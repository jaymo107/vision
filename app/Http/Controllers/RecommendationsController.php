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
use App\Programme;

use App\Recommendation;
use GuzzleHttp as Guzzle;
use Illuminate\Queue\Queue;

class RecommendationsController
{

    protected $client;
    private $history;

    public function __construct()
    {
        $this->client = new Guzzle\Client();
        $this->history = null;
    }

    /**
     * Return the basic Json
     * @param $user
     * @return array
     */
    public function getRecommendations($user)
    {
        if (!$this->shallUseAlgorithm($user)) {
            // Return visions trending data
            $response = $this->client->request('GET', 'http://iptv-svc-node-slave.lancs.ac.uk:2000/trending');

            return [
                'ret_code' => 200,
                'data' => Guzzle\json_decode($response->getBody()->getContents())
            ];
        }

        // Dispatch the job to generate the recommendations
        \Illuminate\Support\Facades\Queue::push(new GenerateRecommendationsJob($user, $this->history));



        //return $this->generateRecommendations($user, $this->history);

        // Get the recommendations from the database
        $recommendations = Recommendation::whereUserId($user)->get();

        $data = [];

        foreach ($recommendations as $recommendation) {
            $data[] = $recommendation->getProgramme()->toArray()[0];
        }

        // Use our algorithm
        return [
            'ret_code' => 200,
            'data' => $data
        ];

    }

    /**
     * @param $user
     * @return array
     */
    private function getLocalHistory($user)
    {
        $results = History::with('programme')->where('user_id', $user)->get(['programme_id'])->toArray();
        $result = [];

        foreach ($results as $element) {
            $result[] = $element['programme'];
        }

        return $result;
    }

    /**
     * Check if the user has any history, if they do then use our algorithm
     * to filter through recommendations, otherwise, use vision's api.
     *
     * @param $user
     * @return bool
     */
    private function shallUseAlgorithm($user)
    {

        // Check which history to use
        // Get the first element from each
        $this->history = $this->getLocalHistory($user);

        return (count($this->history) > 0);
    }

}