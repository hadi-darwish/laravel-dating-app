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
    Route::post('/remove_from_favorites', [UserController::class, 'removeFromFavorites']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
