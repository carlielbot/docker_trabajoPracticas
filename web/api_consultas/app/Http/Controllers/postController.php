<?php

namespace App\Http\Controllers;

use App\Http\Requests\consultasRequest;
use App\Models\modeloJson;
use Illuminate\Http\JsonResponse;

class postController extends Controller
{
    function postConsulta(consultasRequest $request):JsonResponse
    {
        $consultas = modeloJson::create($request->all());
        return response() ->json([
            'status' => 'success',
            'message' => 'Consulta creada con exito',
            'products' => $consultas
        ], 200);
    }
}
