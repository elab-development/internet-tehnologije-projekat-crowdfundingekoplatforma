<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $projects = Project::with('city', 'users')->get();
        return response()->json($projects, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'city_id' => 'required|exists:cities,id'
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $project = Project::with('city', 'users')->findOrFail($id);
        return response()->json($project, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'city_id' => 'sometimes|exists:cities,id'
        ]);

        $project->update($validated);

        return response()->json($project, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }

    public function addUser(Request $request, $projectId)
    {
        $user = auth()->user();
        $project = Project::findOrFail($projectId);

        if ($project->users()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'User already added to this project'], 409);
        }

        $project->users()->attach($user->id);

        return response()->json(['message' => 'User added to project successfully'], 200);
    }

    public function removeUser(Request $request, $projectId)
    {
        $user = auth()->user();
        $project = Project::findOrFail($projectId);

        if (!$project->users()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'User not part of this project'], 404);
        }

        $project->users()->detach($user->id);

        return response()->json(['message' => 'User removed from project successfully'], 200);
    }

    public function addOtherUser(Request $request, $projectId, $userId)
    {
        $user = User::findOrFail($userId);
        $project = Project::findOrFail($projectId);

        if ($project->users()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'User already added to this project'], 409);
        }

        $project->users()->attach($user->id);

        return response()->json(['message' => 'User added to project successfully'], 200);
    }

    public function removeOtherUser(Request $request, $projectId, $userId)
    {
        $user = User::findOrFail($userId);
        $project = Project::findOrFail($projectId);

        if (!$project->users()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'User not part of this project'], 404);
        }

        $project->users()->detach($user->id);

        return response()->json(['message' => 'User removed from project successfully'], 200);
    }
}
