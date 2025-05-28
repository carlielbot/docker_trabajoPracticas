<?php

namespace App\Http\Controllers;

use App\Models\modeloJson;
use Illuminate\Http\Request;

class getConsultas extends Controller
{
    function getAllConsultas()
    {
        $consultas = modeloJson::all();
        return view('todasConsultas', ['ultimasConsultas' => $consultas]);
    }
}

