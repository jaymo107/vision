<?php
/**
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 05/02/2017 9:36 PM
 * @class ConfigController
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Redirect;

class ConfigController extends Controller
{

    public function toggle()
    {

        $exists = \DB::table('config')->select('useAlgorithm')->count();

        $inserted = false;

        if ($exists > 0) {
            // Remove it
            \DB::table('config')->truncate();

            $inserted = false;

            //return Redirect::to('/');
        } else {
            // Add it
            \DB::table('config')->insert([
                'useAlgorithm' => 1
            ]);

            $inserted = true;
        }

        return [
            'Use algorithm?' => $inserted
        ];
    }

}