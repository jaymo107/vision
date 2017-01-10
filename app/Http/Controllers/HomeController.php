<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public $userId;
    protected $apiKey;

    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->userId = '2380';
        $this->apiKey = '53e659a15aff4a402de2d51b98703fa1ade5b8c5';
    }


    public function index(Request $request)
    {


        return view('index')->with([
            'userId' => $this->userId,
            'apiKey' => $this->apiKey
        ]);
    }
}
