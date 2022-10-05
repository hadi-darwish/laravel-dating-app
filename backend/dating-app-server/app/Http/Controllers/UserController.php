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

    function getFavorites()
    {
        $favorites = DB::table('favorites')->where('user_id', Auth::user()->id)->get();
        $favoriteUsers = [];
        foreach ($favorites as $favorite) {
            $favoriteUsers[] = User::find($favorite->favorite_id);
        }
        return response()->json([
            "status" => "Success",
            "favorites" => $favoriteUsers
        ]);
    }


    function getFavoritesTabel()
    {
        $favorites = DB::table('favorites')->where('user_id', Auth::user()->id)->get();
        return response()->json([
            "status" => "Success",
            "favorites" => $favorites,
            "user" => getUser()
        ]);
    }

    function addToBlocks(Request $request)
    {
        DB::table('blocks')->insert([
            'blocker_id' => Auth::user()->id,
            'blocked_id' => $request->blocked_id,
        ]);
        return response()->json([
            "status" => "Success",
        ]);
    }

    function removeFromBlocks(Request $request)
    {
        DB::table('blocks')->where([
            'blocker_id' => Auth::user()->id,
            'blocked_id' => $request->blocked_id,
        ])->delete();
        return response()->json([
            "status" => "Success",
        ]);
    }



    function getBlocks()
    {
        $blocks = DB::table('blocks')->where('blocker_id', Auth::user()->id)->get();
        $blockedUsers = [];
        foreach ($blocks as $block) {
            $blockedUsers[] = User::find($block->blocked_id);
        }
        return response()->json([
            "status" => "Success",
            "blocks" => $blockedUsers
        ]);
    }






    function getBlocksTable()
    {
        $blocks = DB::table('blocks')->where('blocker_id', Auth::user()->id)->get();
        return response()->json([
            "status" => "Success",
            "blocks" => $blocks
        ]);
    }

    function changeStatus()
    {
        $user = User::find(Auth::user()->id);
        if ($user->status == 0) {
            $user->status = 1;
        } else {
            $user->status = 0;
        }
        $user->save();
        return response()->json([
            "status" => "Success",
            "user" => $user
        ]);
    }

    function getMessages(Request $request)
    {
        $messages = DB::table('messages')
            ->where([
                'sender_id' => Auth::user()->id,
                'recipient_id' => $request->recipient_id,
            ])->orWhere([
                'sender_id' => $request->recipient_id,
                'recipient_id' => Auth::user()->id,
            ])->orderBy('id')
            ->get();
        return response()->json([
            "status" => "Success",
            "messages" => $messages
        ]);
    }

    function sendMessage(Request $request)
    {
        DB::table('messages')->insert([
            'sender_id' => Auth::user()->id,
            'recipient_id' => $request->recipient_id,
            'message' => $request->message,
        ]);
        return response()->json([
            "status" => "Success",
        ]);
    }

    function getMatches()
    {
        $user = User::find(Auth::user()->id);
        $matches = DB::table('users')
            ->where('id', '!=', Auth::user()->id)
            ->where('status', 1)
            ->where('gender', Auth::user()->interests)
            ->get();
        return response()->json([
            "status" => "Success",
            "matches" => $matches
        ]);
    }

    function getAllUsers()
    {
        $users = DB::table('users')
            ->where('id', '!=', Auth::user()->id)
            ->where('status', 1)
            ->get();
        return response()->json([
            "status" => "Success",
            "users" => $users
        ]);
    }
}
