<?php

namespace App\Http\Controllers;

use App\Models\modeloJson;
use Illuminate\Http\Request;
/**
 * Controller for retrieving and displaying all consultations.
 */
class getConsultas extends Controller
{
    /**
     * Display all consultations.
     *
     * @return \Illuminate\View\View
     */
    function getAllConsultas()
    {
        $consultas = modeloJson::all();
        return view('todasConsultas', ['ultimasConsultas' => $consultas]);
    }
}

