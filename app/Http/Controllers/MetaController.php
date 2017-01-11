<?php
/**
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 10/01/2017 4:31 PM
 * @class MetaController
 */

namespace App\Http\Controllers;


use App\Programme;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MetaController extends Controller
{

    public function __construct()
    {
        // Constructor
    }

    /**
     * Check the meta does'nt already exist in the table, if it does'nt
     * then store it in the table.
     * @param $programme_id
     * @param Request $request
     * @return array
     */
    public function storeMeta($programme_id, Request $request)
    {
        $data = $request->request;

        $programme = Programme::find($programme_id);

        if ($programme == null) {
            // Create the programme
            $programme = new Programme([
                'programme_id' => $programme_id,
                'imdb_id' => $data->get('imdb_id'),
                'type' => $data->get('type'),
                'series' => $data->get('series'),
                'genres' => $this->convertToJson($data->get('genres')),
                'actors' => $this->convertToJson($data->get('actors')),
                'poster' => $data->get('poster'),
                'rated' => $data->get('rated'),
                'rating' => $data->get('rating'),
                'writers' => $this->convertToJson($data->get('writers')),
                'director' => $data->get('director')
            ]);

            $programme->save();
        }


        return [
            'response_num' => 200,
            'data' => [$programme->toArray()],
        ];
    }

    /**
     * Return the metadata for a given programme
     * @param $programme_id
     * @return array
     */
    public function getMeta($programme_id)
    {

        $programme = Programme::find($programme_id);

        $data = $programme->toArray();
        $data['likes'] = $programme->getLikes();
        $data['dislikes'] = $programme->getDislikes();
        $data['writers'] = \GuzzleHttp\json_decode($data['writers']);
        $data['actors'] = \GuzzleHttp\json_decode($data['actors']);
        $data['genres'] = \GuzzleHttp\json_decode($data['genres']);

        return [
            'response_num' => 200,
            'data' => $data
        ];
    }

    /**
     * @param $data
     * @return string
     */
    private function convertToJson($data)
    {
        // Explode the data by comma
        return \GuzzleHttp\json_encode(explode(", ", $data));
    }
}