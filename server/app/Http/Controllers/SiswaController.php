<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function index() {
        return response()->json(Siswa::all());
    }

    public function store(Request $request) {
        $request->validate([
            "nama" => "required|string|max:255",
            "nis" => "required|unique:siswas,nis|integer|digits_between:1,20",
            "kelas" => "required|string|max:255",
            "jurusan" => "required|string|max:255"
        ]);

        $siswa = Siswa::create($request->all());
        return response()->json([
            "message" => "Siswa created successfully",
            "data" => $siswa
        ], 201);
    }

    public function update(Request $request, string $id) {
         $request->validate([
            "nama" => "required|string|max:255",
            "nis" => "required|integer|digits_between:1,20",
            "kelas" => "required|string|max:255",
            "jurusan" => "required|string|max:255"
        ]);

        $oldSiswa = Siswa::findOrFail($id);
        $siswa = Siswa::findOrFail($id);
        $siswa->update($request->all());
        return response()->json([
            "message" => "Siswa $id updated successfully",
            "original" => $oldSiswa,
            "new" => $siswa
        ]);
    }

    public function destroy(string $id) {
        $siswa = Siswa::findOrFail($id);
        $siswa->delete();
        return response()->json([
            "message" => "Siswa deleted successfully",
            "deleted" => $siswa
        ], 204);
    }

}
