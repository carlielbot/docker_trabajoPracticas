<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\getQueriesController;
use App\Http\Controllers\loginController;
use App\Http\Controllers\postQueriesController;

// GET FUNCTIONALITY
Route::get('/queries', [GetQueriesController::class, 'getAllQueries']);

// STATISTICS VIEW AND LOGIN VERIFICATION
Route::get('/', [LoginController::class, 'showLogin'])->name('login');
Route::post('/verify-login', [LoginController::class, 'verifyLogin'])->name('verify.login');

// POST FUNCTIONALITY
Route::post('/api/queries', [PostQueriesController::class, 'postQuery']);
