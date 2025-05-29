<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JsonModel extends Model
{
    protected $table = 'queries';
    protected $fillable = [
        'queryType',
        'paramUsed',
        'dateTime',
        'ip'
    ];
}
