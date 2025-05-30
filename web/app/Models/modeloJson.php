<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * Model for handling JSON data related to consultations.
 * This model interacts with the 'consultas' table in the database.
*/
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
