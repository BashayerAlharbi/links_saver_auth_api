<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Link;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    // Get all links for the logged-in user
    public function index(Request $request)
    {
        $query = $request->user()->links();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $links = $query->latest()->get();

        return response()->json([
            'message' => 'Links retrieved successfully',
            'data' => $links
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|url|max:2048',
            'category' => 'required|string|max:100',
        ]);

        $link = $request->user()->links()->create($validated);

        return response()->json([
            'message' => 'Link created successfully',
            'data' => $link
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $link = $request->user()->links()->findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'url' => 'sometimes|required|url|max:2048',
            'category' => 'sometimes|required|string|max:100',
        ]);

        $link->update($validated);

        return response()->json([
            'message' => 'Link updated successfully',
            'data' => $link
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $link = $request->user()->links()->findOrFail($id);

        $link->delete();

        return response()->json([
            'message' => 'Link deleted successfully'
        ], 200);
    }
}