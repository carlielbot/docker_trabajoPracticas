<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
/**
 * Middleware to verify user authentication before accessing certain routes.
 */
class VerificarAutenticacion
{
    /**
     * Handle an incoming request and check if the user is authenticated.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function handle(Request $request, Closure $next)
    {
        if (!session('autenticado')) {
            return redirect()->route('login')
                ->with('error', 'Por favor inicia sesión primero');
        }

        return $next($request);
    }
}
