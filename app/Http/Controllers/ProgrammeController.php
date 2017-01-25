<?php
/**
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:52 PM
 * @class UserController
 */

namespace App\Http\Controllers;


use App\Dislike;
use Faker\Provider\cs_CZ\DateTime;
use Illuminate\Http\JsonResponse;
use GuzzleHttp as Guzzle;
use Illuminate\Http\Request;
use App\Like;
use Illuminate\Support\Facades\DB;

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
     * Rate the programme for the current user.
     * @return array
     */
    public function rateProgramme($id, Request $request)
    {
        $type = $request->request->get('type');
        $userId = $request->request->get('user_id');

        if ($type == 'like') {
            $dislikeExists = Dislike::where([
                'programme_id' => $id,
                'user_id' => $userId
            ])->first();

            if ($dislikeExists !== null) {
                // A like exists, so remove it
                Dislike::where([
                    'programme_id' => $id,
                    'user_id' => $userId
                ])->delete();
            }
            // Check if a like already exists
            $like = Like::firstOrNew([
                'programme_id' => $id,
                'user_id' => $userId
            ]);

            $like->save();
        }

        if ($type == 'dislike') {
            $likeExists = Like::where([
                'programme_id' => $id,
                'user_id' => $userId
            ])->first();

            if ($likeExists !== null) {
                // A like exists, so remove it
                Like::where([
                    'programme_id' => $id,
                    'user_id' => $userId
                ])->delete();
            }

            $dislike = Dislike::firstOrNew([
                'programme_id' => $id,
                'user_id' => $userId
            ]);

            $dislike->save();
        }

        return [
            'response_num' => 200,
            'type' => $type,
            'programme_id' => $id
        ];
    }

    /**
     * Return multiple programmes.
     * @return JsonResponse
     */
    public function getProgrammes()
    {
        return new JsonResponse([], 200);
    }

    public function getRating($id, Request $request)
    {
        $type = '';
        $userId = $request->request->get('user_id');

        // Check if you like or dislike the current programme
        $isLike = Like::where([
            'programme_id' => $id,
            'user_id' => $userId
        ])->first();

        $isDislike = Dislike::where([
            'programme_id' => $id,
            'user_id' => $userId
        ])->first();

        if ($isLike) {
            $type = 'like';
        }

        if ($isDislike) {
            $type = 'dislike';
        }

        return [
            'response_num' => 200,
            'type' => $type
        ];
    }

}