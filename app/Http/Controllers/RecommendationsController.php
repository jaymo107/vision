<?php
/**
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:52 PM
 * @class UserController
 */

namespace App\Http\Controllers;


use App\Programme;
use Illuminate\Http\JsonResponse;
use GuzzleHttp as Guzzle;

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

        // Use our algorithm


        return $this->generateRecommendations($user);
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
        $url = 'http://iptv-stats-lb-float.lancs.ac.uk:9110/analysis/viewing_history_v2?image_size=85x50&tv_radio=TV&timestamp=1483368621.28&api=53e659a15aff4a402de2d51b98703fa1ade5b8c5&user_id=' . $user;

        $response = $this->client->request('GET', $url);

        $content = Guzzle\json_decode($response->getBody()->getContents());

        $this->history = $content->data;

        return (!!count($content->data));
    }

    private function generateRecommendations($user)
    {
        $data = array();
        // The number of recommendations to generate
        $numOfRecommendations = 6;

        // STEP 1: Get the history
        // Take 6 of the history for now
        $history = array_slice($this->history, 0, $numOfRecommendations);

        // Loop through each programme in your history
        foreach ($history as $programme) {

            $currentProgramme = Programme::find($programme->programme_id);

            if ($currentProgramme == null) {
                continue;
            }

            // Compare this programme with every other programme in the table
            $allProgrammes = Programme::all();

            // Keep track on the highest score so far.
            $bestScoringSoFar = 0;

            // Keep track on the current best programme
            $bestProgrammeSoFar = null;

            // Loop over every programme and compare it to the current programme in your history
            // determine the score for each of the programmes.
            // TODO: Try to use only programmes people have liked, this currently will get ALL of the programmes
            // regardless
            foreach ($allProgrammes as $pgm) {

                $currentScore = 0;

                if ($pgm->programme_id == $currentProgramme->programme_id) {
                    continue;
                }

                // Compare $currentProgramme and $pgm and determine the score by counting the number of
                // matches

                // Try to find a match in the genres
                $currentScore += $this->matchGenre($currentProgramme, $pgm);
                // Try to find a match in the actors
                $currentScore += $this->matchActor($currentProgramme, $pgm);
                // Try to find a match with a similar rating (PG, 15, 18 etc)
                $currentScore += $this->matchRated($currentProgramme, $pgm);
                // Try to match a writer
                $currentScore += $this->matchWriter($currentProgramme, $pgm);
            }

            // Get the meta from our database
            $data[] = $currentProgramme;
            // Compare this programme with all of the others
        }

        return [
            'ret_code' => 200,
            'data' => $data
        ];
    }

    /**
     * @param Programme $programmeA
     * @param Programme $programmeB
     * @return int
     */
    private function matchGenre($programmeA, $programmeB)
    {
        $aGenres = Guzzle\json_decode($programmeA->genres);
        $bGenres = Guzzle\json_decode($programmeB->genres);

        return count(array_intersect($aGenres, $bGenres));
    }

    /**
     * @param Programme $programmeA
     * @param Programme $programmeB
     * @return int
     */
    private function matchActor($programmeA, $programmeB)
    {
        $aActors = Guzzle\json_decode($programmeA->actors);
        $bActors = Guzzle\json_decode($programmeB->actors);

        return count(array_intersect($aActors, $bActors));
    }

    /**
     * @param Programme $programmeA
     * @param Programme $programmeB
     * @return int
     */
    private function matchRated($programmeA, $programmeB)
    {
        return 0;
    }

    /**
     * @param Programme $programmeA
     * @param Programme $programmeB
     * @return int
     */
    private function matchWriter($programmeA, $programmeB)
    {
        return 0;
    }

}