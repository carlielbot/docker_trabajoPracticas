<?php

namespace App\Http\Controllers;

use App\Http\Requests\QueriesRequest;
use App\Models\JsonModel;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function postQuery(QueriesRequest $request): JsonResponse
    {
        $query = JsonModel::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Query created successfully',
            'query' => $query
        ], 200);
    }
}
