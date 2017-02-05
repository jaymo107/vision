<?php

namespace App\Jobs;

use App\History;
use App\Programme;
use App\Recommendation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

/**
 * Generate recommendations for a particular user.
 * Class ExampleJob
 * @package App\Jobs
 */
class GenerateRecommendationsJob extends Job
{
    protected $user;
    protected $history;

    /**
     * Create a new job instance.
     *
     * @param $user
     * @param $history
     */
    public function __construct($user, $history)
    {
        $this->user = $user;
        $this->history = $history;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        var_dump('Generating recommendations for ' . $this->user);
        $this->generateRecommendations();
    }

    /**
     * @return array
     * @internal param $user
     * @internal param $history
     * @internal param $user
     */
    private function generateRecommendations()
    {
        $user = $this->user;
        $history = $this->history;

        $data = array();
        // The number of recommendations to generate
        $numOfRecommendations = 8;

        // STEP 1: Get the history
        // Take 6 of the history for now
        $history = array_slice($history, 0, $numOfRecommendations);

        $programmeScores = [];

        $alreadyRecommended = [];

        // Loop through each programme in your history
        foreach ($history as $programme) {

            // Locate the programme in our table
            $currentProgramme = Programme::find($programme['programme_id']);

            if ($currentProgramme == null) {
                continue;
            }

            var_dump($currentProgramme->programme_name);

            // Compare this programme with every other programme in the table
            $allProgrammes = Programme::all();

            // Keep track on the highest score so far.
            $bestScoringSoFar = 0;

            // Keep track on the current best programme
            $bestProgrammeSoFar = null;

            $allScores = [];

            // Loop over every programme and compare it to the current programme in your history
            // determine the score for each of the programmes.
            // regardless

            foreach ($allProgrammes as $pgm) {

                $currentScore = 0;

                $existsInHistory = History::where(['user_id' => $user, 'programme_id' => $pgm->programme_id])->count();

                if ($existsInHistory > 0) {
                    continue;
                }

                // Make sure you're not comparing to the current programme in your history.
                if ($pgm->programme_id == $currentProgramme->programme_id) {
                    continue;
                }

                // Only match programmes which have more likes than dislikes
                if ($pgm->getLikes() <= $pgm->getDislikes()) {
                    continue;
                }
                // Compare $currentProgramme and $pgm and determine the score by counting the number of matches.

                // Try to find a match in the genres
                $currentScore += $this->matchGenres($currentProgramme, $pgm);
                // Try to find a match in the actors
                $currentScore += $this->matchActors($currentProgramme, $pgm);
                // Try to find a match with a similar rating (PG, 15, 18 etc)
                $currentScore += $this->matchRated($currentProgramme, $pgm);
                // Try to match a writer
                $currentScore += $this->matchWriters($currentProgramme, $pgm);
                // Try to match the director
                $currentScore += $this->matchDirector($currentProgramme, $pgm);

                $allScores[] = $currentScore;

                // Compare the current score with the best score so far
                if ($currentScore > $bestScoringSoFar) {
                    // Update the best score to this one, and set the programme as well
                    $bestScoringSoFar = $currentScore;
                    // Set the programme too.
                    $bestProgrammeSoFar = $pgm;

                    var_dump($bestProgrammeSoFar->programme_name . ' is best programme so far with a score of '
                        . $bestScoringSoFar);
                }
            }

            $programmeScores[] = $allScores;

            // Get the meta from our database
            $data[] = $bestProgrammeSoFar;
            var_dump($bestProgrammeSoFar->programme_name . ' was selected as a recommendation from 
            ' . $currentProgramme->programme_name);
        }

        var_dump('Deleting old recommendations!');
        // Remove all current programmes for this user
        Recommendation::whereUserId($user)->each(function (Recommendation $item) {
            $item->delete();
        });

        var_dump('Storing to database!');
        foreach ($data as $recommendedProgram) {
            $recommendation = new Recommendation([
                'user_id' => $user,
                'programme_id' => $recommendedProgram->programme_id
            ]);

            $recommendation->save();
        }

        usort($data, function ($a, $b) {
            return $a['likes'] < $b['likes'];
        });

        var_dump('Generated!');

        return $data;
    }


    /**
     * @param Programme $programmeA
     * @param Programme $programmeB
     * @return int
     */
    private function matchGenres($programmeA, $programmeB)
    {
        $aGenres = \GuzzleHttp\json_decode($programmeA->genres);
        $bGenres = \GuzzleHttp\json_decode($programmeB->genres);

        return count(array_intersect($aGenres, $bGenres));
    }

    /**
     * @param Programme $programmeA
     * @param Programme $programmeB
     * @return int
     */
    private function matchActors($programmeA, $programmeB)
    {
        $aActors = \GuzzleHttp\json_decode($programmeA->actors);
        $bActors = \GuzzleHttp\json_decode($programmeB->actors);

        return count(array_intersect($aActors, $bActors));
    }

    /**
     * @param Programme $programmeA
     * @param Programme $programmeB
     * @return int
     */
    private function matchRated($programmeA, $programmeB)
    {
        return ($programmeA->rating == $programmeB->rating) ? 1 : 0;
    }

    /**
     * @param Programme $programmeA
     * @param Programme $programmeB
     * @return int
     */
    private function matchWriters($programmeA, $programmeB)
    {
        $aWriters = \GuzzleHttp\json_decode($programmeA->writers);
        $bWriters = \GuzzleHttp\json_decode($programmeB->writers);

        $invalid = ['', ' ', 'N/A'];

        if ((count($aWriters) == 1 && in_array($aWriters[0], $invalid)) || (count($bWriters) == 1 && in_array
                ($bWriters, $invalid))
        ) {
            return 0;
        }

        return count(array_intersect($aWriters, $bWriters));
    }

    /**
     * @param Programme $programmeA
     * @param Programme $programmeB
     * @return int
     */
    private function matchDirector($programmeA, $programmeB)
    {

        if ($programmeA->director == 'N/A' || $programmeB->director == 'N\A' || empty($programmeA->director) || empty
            ($programmeB->director)
        ) {
            return 0;
        }

        return ($programmeA->director == $programmeB->director) ? 1 : 0;
    }

}
