<?php

namespace App\Http\Controllers;

use App\Models\modeloJson;
use Illuminate\Http\Request;

class controladorInicioSesion extends Controller
{
    public function mostrarLogin()
    {
        return view('identificacion');
    }

    public function verificarLogin(Request $request)
    {
        $usuario = $request->input('usuario');
        $password = $request->input('password');
        $consultas = modeloJson::all();

        if ($usuario === 'admin' && $password === 'admin') {
            session(['autenticado' => true]);

            return view('todasConsultas', ['ultimasConsultas' => $consultas]);
        }else if ($usuario === 'usuario' && $password === 'usuario'){
            $totalConsultas = $consultas->count();

            $consultasPorTipo = $consultas->groupBy('tipoConsulta');

            $ultimasConsultas = $consultas->sortByDesc('fechaHora')->take(5);

            return view('estadisticas', ['totalConsultas' => $totalConsultas, 'consultasPorTipo' => $consultasPorTipo, 'ultimasConsultas' => $ultimasConsultas]);
        }

        return redirect()->route('login')
            ->with('error', 'Usuario o contraseña incorrectos');
    }
}
