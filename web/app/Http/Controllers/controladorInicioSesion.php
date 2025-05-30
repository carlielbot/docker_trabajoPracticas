<?php

namespace App\Http\Controllers;

use App\Models\modeloJson;
use Illuminate\Http\Request;
/**
 * Controller for handling user login and session management.
 */
class controladorInicioSesion extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function mostrarLogin()
    {
        return view('identificacion');
    }
    
    /**
     * Handle the login request and redirect based on user role.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
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
