<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyAuthentication
{
    public function handle(Request $request, Closure $next)
    {
        if (!session('authenticated')) {
            return redirect()->route('login')
                ->with('error', 'You must be logged in to access this page.');
        }

        return $next($request);
    }
}
