<?php

namespace App\Http\Controllers;

use App\Models\JsonModel;
use Illuminate\Http\Request;

class GetQueriesController extends Controller
{
    public function getAllQueries()
    {
        $queries = JsonModel::all();
        return view('allQueries', ['latestQueries' => $queries]);
    }
}

