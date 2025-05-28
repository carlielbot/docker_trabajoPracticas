<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerificarAutenticacion
{
    public function handle(Request $request, Closure $next)
    {
        if (!session('autenticado')) {
            return redirect()->route('login')
                ->with('error', 'Por favor inicia sesión primero');
        }

        return $next($request);
    }
}
