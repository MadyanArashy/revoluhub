<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    public function index() {
        return response()->json(Guru::all());
    }

    public function store(Request $req) {
        $req->validate([
            "nama" => "required|string|max:255",
            "nip" => "required|unique:gurus,nip|integer|digits_between:1,20",
            "telepon" => "required|string|regex:/^\+?\d{8,15}$/"
        ]);

        $guru = Guru::create($req->all());
        return response()->json([
            "message" => "Guru created successfully",
            "data" => $guru
        ], 201);
    }

    public function destroy(string $id) {
        $guru = Guru::findOrFail($id);
        $guru->delete();
        return response()->json([
            "message" => "Guru deleted successfully",
            "deleted" => $guru
        ], 200);
    }

    public function update(Request $req, string $id) {
        $req->validate([
            "nama" => "required|string|max:255",
            "nip" => "required|integer|digits_between:1,20",
            "telepon" => "required|string|regex:/^\+?\d{8,15}$/"
        ]);

        $oldGuru = Guru::findOrFail($id);
        $guru = Guru::findOrFail($id);
        $guru->update($req->all());
        return response()->json([
            "message" => "Guru $id updated successfully",
            "original" => $oldGuru,
            "new" => $guru
        ]);
    }
}
