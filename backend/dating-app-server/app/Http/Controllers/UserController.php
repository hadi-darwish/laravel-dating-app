<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function update(Request $request)
    {

        $user = User::find(Auth::user()->id);
        $user->name = $request->name ? $request->name : $user->name;
        $user->bio = $request->bio ? $request->bio : $user->bio;
        $user->age = $request->age ? $request->age : $user->age;
        $user->profile_pic = $request->profile_pic ? $request->profile_pic : $user->profile_pic;
        $user->interests = $request->interests ? $request->interests : $user->interests;
        $user->location = $request->location ? $request->location : $user->location;
        $user->status = $request->status ? $request->status : $user->status;
        $user->save();

        return response()->json([
            "status" => "success",
            "user" => $user
        ], 200);
    }


    function addToFavorites(Request $request)
    {
        DB::table('favorites')->insert([
            'user_id' => Auth::user()->id,
            'favorite_id' => $request->favorite_id,
        ]);
        return response()->json([
            "status" => "Success",
        ]);
    }

    function removeFromFavorites(Request $request)
    {
        DB::table('favorites')->where([
            'user_id' => Auth::user()->id,
            'favorite_id' => $request->favorite_id,
        ])->delete();
        return response()->json([
            "status" => "Success",
        ]);
    }
}
