<?php
/**
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 10/01/2017 4:31 PM
 * @class MetaController
 */

namespace App\Http\Controllers;


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
        return [
            'response_num' => 200,
            'data' => ['programme_id' => $programme_id/** Return the data that was stored */]
        ];
    }

    /**
     * Return the metadata for a given programme
     * @param $programme_id
     * @return array
     */
    public function getMeta($programme_id)
    {
        return [
            'response_num' => 200,
            'data' => []
        ];
    }
}