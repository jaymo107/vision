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

class ProgrammeController
{

    protected $client;

    public function __construct()
    {
        $this->client = new Guzzle\Client();
    }

    /**
     * Return a single programme with the associated ID.
     * @param string $id
     * @return JsonResponse
     */
    public function getProgramme($id = "")
    {
        $url = 'http://vision.lancs.ac.uk:9110/modules/videometa/get_video_meta';

        $response = $this->client->request('GET', $url, [
            'query' => [
                ['programme_id' => $id],
                ['api' => '53e659a15aff4a402de2d51b98703fa1ade5b8c5']
            ]
        ]);

        $content = Guzzle\json_decode($response->getBody()->getContents());

        return new JsonResponse([
            'data' => $content->data[0]
        ], 200);
    }

    /**
     * Return multiple programmes.
     * @param $id
     * @return JsonResponse
     */
    public function getProgrammes()
    {
        return new JsonResponse([], 200);
    }

}