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

//        return new JsonResponse([
//            'ret_code' => 200,
//            'data' => [
//                [
//                    'programme_id' => '74a56d11244e98a2f10e44a9c304f78455c9977c',
//                    'image_url' => 'http://iptv-med-image.lancs.ac.uk/cache/210x150/programmes/CBBCHD/FOUROCLOCKCLUB',
//                    'channel_name' => 'CBBC HD',
//                    'channel_id' => 384,
//                    'vod_status' => 'COMPLETE',
//                    'synopsis' => '1/13. Christmas: When Mr Bell bans Christmas it is up to the 4 O\'Clock Club gang to bring festive cheer to Elmsmere. While Josh plays Santa, Nathan comes home with a big surprise. [HD] [S]'
//                ], [
//                    'programme_id' => '74a56d11244e98a2f10e44a9c304f78455c9977c',
//                    'image_url' => 'http://iptv-med-image.lancs.ac.uk/cache/210x150/programmes/CBBCHD/FOUROCLOCKCLUB',
//                    'channel_name' => 'ITV One HD',
//                    'channel_id' => 384,
//                    'vod_status' => 'COMPLETE',
//                    'synopsis' => '1/13. Christmas: When Mr Bell bans Christmas it is up to the 4 O\'Clock Club gang to bring festive cheer to Elmsmere. While Josh plays Santa, Nathan comes home with a big surprise. [HD] [S]'
//                ], [
//                    'programme_id' => '74a56d11244e98a2f10e44a9c304f78455c9977c',
//                    'image_url' => 'http://iptv-med-image.lancs.ac.uk/cache/210x150/programmes/CBBCHD/FOUROCLOCKCLUB',
//                    'channel_name' => 'Sky Arts',
//                    'channel_id' => 384,
//                    'vod_status' => 'COMPLETE',
//                    'synopsis' => '1/13. Christmas: When Mr Bell bans Christmas it is up to the 4 O\'Clock Club gang to bring festive cheer to Elmsmere. While Josh plays Santa, Nathan comes home with a big surprise. [HD] [S]'
//                ]
//            ]
//        ], 200);
    }

    /**
     * Check if the user has any history, if they do then use our algorithm
     * to filter through recommendations, otherwise, use vision's api.
     */
    private function shallUseAlgorithm($user)
    {
        $url = 'http://iptv-stats-lb-float.lancs.ac.uk:9110/analysis/viewing_history_v2?image_size=85x50&tv_radio=TV&timestamp=1483368621.28&api=53e659a15aff4a402de2d51b98703fa1ade5b8c5&user_id=' . $user;

        $response = $this->client->request('GET', $url);

        $content = Guzzle\json_decode($response->getBody()->getContents());

        return (!!count($content->data));
    }

}