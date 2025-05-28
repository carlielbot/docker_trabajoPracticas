<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class modeloJson extends Model
{
    protected $table = 'consultas';
    protected $fillable = [
        'tipoConsulta',
        'paramUsado',
        'fechaHora',
        'ip'
    ];
}
