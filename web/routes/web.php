<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GetQueriesController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostQueriesController;

// GET FUNCTIONALITY
Route::get('/queries', [GetQueriesController::class, 'getAllQueries']);

// STATISTICS VIEW AND LOGIN VERIFICATION
Route::get('/', [LoginController::class, 'showLogin'])->name('login');
Route::post('/verify-login', [LoginController::class, 'verifyLogin'])->name('verify.login');

// POST FUNCTIONALITY
Route::post('/api/queries', [PostQueriesController::class, 'postQuery']);
