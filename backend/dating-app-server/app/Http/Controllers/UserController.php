<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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


    // public function show(Request $request)
    // {
    //     $users = User::find(Auth::user()->interest);
    //     return response()->json([
    //         "status" => "success",
    //         "user" => $user
    //     ], 200);
    // }


}
