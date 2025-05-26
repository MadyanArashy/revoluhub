<?php

use App\Http\Controllers\GuruController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\IbadahController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hallo-deck', function ()
{
    return response()->json([
        'message' => 'The man who sold the world'
    ]);
});


Route::apiResource('siswa', SiswaController::class);
Route::apiResource('guru', GuruController::class);
Route::apiResource('ibadah', IbadahController::class);
