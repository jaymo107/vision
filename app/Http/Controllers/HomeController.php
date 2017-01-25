<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use \Illuminate\Session;


class HomeController extends Controller
{
    public $userId;
    protected $apiKey;

    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->apiKey = '53e659a15aff4a402de2d51b98703fa1ade5b8c5';
    }


    /**
     * @param Request $request
     * @return View
     */
    public function index(Request $request)
    {

        return view('index')->with([
            'apiKey' => $this->apiKey
        ]);
    }
}
