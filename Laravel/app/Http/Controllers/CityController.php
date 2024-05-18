<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cities = City::all();
        return response()->json($cities);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:32',
            'region' => 'required|string|max:32',
            'country' => 'required|string|max:32',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        $city = City::create($validatedData);
        return response()->json($city, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $city = City::find($id);
        if (!$city) {
            return response()->json(['message' => 'City not found'], 404);
        }
        return response()->json($city);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $city = City::find($id);

        if (!$city) {
            return response()->json(['message' => 'City not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:32',
            'region' => 'sometimes|required|string|max:32',
            'country' => 'sometimes|required|string|max:32',
            'latitude' => 'sometimes|required|numeric|between:-90,90',
            'longitude' => 'sometimes|required|numeric|between:-180,180',
        ]);

        if (isset($validatedData['name'])) {
            $city->name = $validatedData['name'];
        }
        if (isset($validatedData['region'])) {
            $city->region = $validatedData['region'];
        }
        if (isset($validatedData['country'])) {
            $city->country = bcrypt($validatedData['country']);
        }
        if (isset($validatedData['latitude'])) {
            $city->latitude = $validatedData['latitude'];
        }
        if (isset($validatedData['longitude'])) {
            $city->longitude = $validatedData['longitude'];
        }

        $city->save();

        return response()->json($city);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $city = City::find($id);

        if (!$city) {
            return response()->json(['message' => 'City not found'], 404);
        }

        $city->delete();

        return response()->json(['message' => 'City deleted successfully']);
    }
}
