<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ibadah extends Model
{
    protected $table = "ibadahs";
    protected $fillable = [
        "name",
        "type",
        "date",
        "note"
    ];
}
