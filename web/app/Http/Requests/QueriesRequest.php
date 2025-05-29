<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QueriesRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'queryType' => 'required|string',
            'paramUsed' => 'required|string',
            'dateTime' => 'required|string',
            'ip' => 'required|string'
        ];
    }
}
