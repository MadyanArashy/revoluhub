<?php

namespace App\Http\Controllers;

use App\Models\Ibadah;
use Illuminate\Http\Request;

class IbadahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Ibadah::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "string|required|max:255",
            "type" => "string|required|max:255",
            "date" => "string|required|max:255",
            "note" => "string|required|max:255",
        ]);

        $ibadah = Ibadah::create($request->all());
        return response()->json([
            "message" => "dah jadi ibadah lu sok tuhan masbro",
            "data" => $ibadah
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ibadah $ibadah)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ibadah $ibadah)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ibadah $ibadah)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ibadah $ibadah)
    {
        $ibadah->delete();
        return response()->json([
            "message" => "Gelo ibadah di hapus yasudahlah",
            "deleted" => $ibadah
        ], 204);
    }
}
