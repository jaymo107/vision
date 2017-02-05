<?php

namespace App\Http\Controllers;

use App\Dislike;
use App\Like;
use App\Programme;
use GuzzleHttp\Client;
use Kozz\Laravel\Facades\Guzzle;

class SeedController extends Controller
{
    private $API_KEY = '4b20bf2ce372fa19d262f5da2091998b';

    public function ratings()
    {
        // Loop over every programme in our database
        Programme::all()->each(function (Programme $programme) {

            $likeExists = Like::where('programme_id', $programme->programme_id)->count();
            $dislikeExists = Dislike::where('programme_id', $programme->programme_id)->count();

            if ($likeExists > 10 || $dislikeExists > 10) {
                // Already exists so break out
                return;
            }


            $numLikes = rand(100, 999);
            $numDislikes = rand(0, 999);

            if ($numLikes > 500) {
                $numDislikes = rand(0, 100);
            }

            for ($i = 0; $i < $numLikes; $i++) {

                // Create a new like and save it
                $like = new Like([
                    'user_id' => rand(1, 9999),
                    'programme_id' => $programme->programme_id
                ]);

                $like->save();
            }

            for ($i = 0; $i < $numDislikes; $i++) {

                var_dump('Dislike created');

                // Create a new like and save it
                $like = new Dislike([
                    'user_id' => rand(1, 9999),
                    'programme_id' => $programme->programme_id
                ]);

                $like->save();
            }

        });


    }

    public function seed()
    {

        $client = new Client();

        $results = [];

        \DB::table('preseed')->get()->each(/**
         * @param $seed
         */
            function ($seed) use ($client, &$results) {
                $programme_id = $seed->programme_id;
                $programme = str_replace_first("New: ", "", $seed->programme_name);
                //$programme = 'Skyfall';
                $res = $client->get('http://api.themoviedb.org/3/search/multi?query=' . $programme . '&api_key=' . $this->API_KEY);

                //$status = $res->getStatusCode();
                $search = \GuzzleHttp\json_decode($res->getBody()->getContents())->results;

                if (count($search) <= 0) {
                    \DB::table('preseed')->where('programme_id', $programme_id)->delete();
                    return;
                };

                $search = $search[0];

                $media_type = $search->media_type;
                $id = $search->id;
                $rating = $search->vote_average;
                $poster = $search->poster_path;

                // Query and get the new data
                $res = $client->get('http://api.themoviedb.org/3/' . $media_type . '/' . $id . '?api_key=' . $this->API_KEY);
                $details = \GuzzleHttp\json_decode($res->getBody()->getContents());

                $res = $client->get('http://api.themoviedb.org/3/' . $media_type . '/' . $id . '/credits?api_key=' .
                    $this->API_KEY);
                $cast = \GuzzleHttp\json_decode($res->getBody()->getContents());

                $imdb_id = (array_key_exists("imdb_id", $details)) ? $details->imdb_id : '';
                $genres = $this->filterGenres($details->genres);
                $actors = $this->filterActors($cast->cast);

                $crew = $this->filterCrew($cast->crew);

                $programme = Programme::firstOrNew([
                    'programme_id' => $programme_id,
                    'programme_name' => $programme,
                    'genres' => \GuzzleHttp\json_encode($genres),
                    'rating' => $rating,
                    'poster' => 'https://image.tmdb.org/t/p/w154' . $poster,
                    'imdb_id' => ($imdb_id == null) ? '' : $imdb_id,
                    'type' => $media_type,
                    'image' => $seed->image,
                    'actors' => \GuzzleHttp\json_encode($actors),
                    'writers' => \GuzzleHttp\json_encode($crew['writers']),
                    'director' => $crew['director']
                ]);

                // Save this to database
                $programme->save();

                $results[] = $programme;

                sleep(1);

                // Delete from the database
            });

        // Loop over the 'pre-seed' table, query the IMDB api, find the data, and populate the new database

        return [
            'res_num' => 200,
            'data' => $results
        ];
    }

    private function filterGenres($genres)
    {
        $genreArray = [];

        foreach ($genres as $genre) {
            $genreArray[] = $genre->name;
        }

        return $genreArray;
    }

    private function filterActors($cast)
    {
        $actors = [];
        $max = 5;
        $i = 0;

        foreach ($cast as $actor) {
            $actors[] = $actor->name;

            if ($i >= 5) break;

            $i++;
        }

        return $actors;
    }

    private function filterCrew($crew)
    {

        $writers = [];
        $director = null;
        $producers = [];

        foreach ($crew as $member) {

            if ($member->job == 'Director') {
                $director = $member->name;
            }

            if ($member->job == 'Writer') {
                $writers[] = $member->name;
            }

            if ($member->job == 'Producer') {
                $producers[] = $member->name;
            }
        }

        if (empty($director) && !empty($producers)) {
            $director = $producers[0];
        }

        if (empty($writers)) {
            $writers = $producers;
        }

        return [
            'writers' => $writers,
            'director' => $director
        ];
    }
}
