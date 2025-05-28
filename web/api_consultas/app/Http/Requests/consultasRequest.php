<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class consultasRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'tipoConsulta' => 'required|string',
            'paramUsado' => 'required|string',
            'fechaHora' => 'required|string'
        ];
    }
}
