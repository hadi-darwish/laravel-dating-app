<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:api')->group(function () {
    Route::post('/update', [UserController::class, 'update']);
    Route::post('/add_to_favorites', [UserController::class, 'addToFavorites']);
    Route::post('/toggle_favorites', [UserController::class, 'changeFavorite']);
    Route::post('/remove_from_favorites', [UserController::class, 'removeFromFavorites']);
    Route::post('/get_favorites', [UserController::class, 'getFavorites']);
    Route::post('/add_to_blocks', [UserController::class, 'addToBlocks']);
    Route::post('/remove_from_blocks', [UserController::class, 'removeFromBlocks']);
    Route::post('/get_blocks', [UserController::class, 'getBlocks']);
    Route::post('/change_status', [UserController::class, 'changeStatus']);
    Route::post('/get_messages', [UserController::class, 'getMessages']);
    Route::post('/send_message', [UserController::class, 'sendMessage']);
    Route::post('/getMatches', [UserController::class, 'getMatches']);
    Route::post('/get_all_users', [UserController::class, 'getAllUsers']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
