<?php
/**
 * Routes for the web application.
 * This file defines the routes for handling GET and POST requests related to consultations.
 */
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\getConsultas;
use App\Http\Controllers\controladorInicioSesion;
use App\Http\Controllers\postController;

//GET FUNCTIONALITY
Route::get('/consultas', [getConsultas::class, 'getAllConsultas']);

//LOGIN VERIFICATION
Route::get('/', [controladorInicioSesion::class, 'mostrarLogin']) ->name('login');
Route::post('/verificar-login', [controladorInicioSesion::class, 'verificarLogin'])->name('verificar.login');


//POST FUNCTIONALITY
Route::post('/api/consultas', [postController::class, 'postConsulta']);
