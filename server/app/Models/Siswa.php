<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    protected $table = 'siswas';
    protected $fillable = [
        "nama",
        "nis",
        "kelas",
        "jurusan"
    ];
}
