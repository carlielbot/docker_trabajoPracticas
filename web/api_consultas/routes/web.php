<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\getConsultas;
use App\Http\Controllers\controladorInicioSesion;
use App\Http\Controllers\postController;

//FUNCIONALIDAD GET
Route::get('/consultas', [getConsultas::class, 'getAllConsultas']);

//ESTADÍSTICAS VIEW Y VERIFICAR EL LOGIN
Route::get('/', [controladorInicioSesion::class, 'mostrarLogin']) ->name('login');
Route::post('/verificar-login', [controladorInicioSesion::class, 'verificarLogin'])->name('verificar.login');


//FUNCIONALIDAD POST
Route::post('/api/consultas', [postController::class, 'postConsulta']);
