<?php

namespace App\Http\Controllers;

use App\Models\JsonModel;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function showLogin()
    {
        return view('login');
    }

    public function verifyLogin(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');
        $queries = JsonModel::all();

        if ($username === 'admin' && $password === 'admin') {
            session(['authenticated' => true]);

            return view('allQueries', ['latestQueries' => $queries]);
        } else if ($username === 'user' && $password === 'user') {
            $totalQueries = $queries->count();

            $queriesByType = $queries->groupBy('queryType');

            $latestQueries = $queries->sortByDesc('dateTime')->take(5);

            return view('statistics', [
                'totalQueries' => $totalQueries,
                'queriesByType' => $queriesByType,
                'latestQueries' => $latestQueries
            ]);
        }

        return redirect()->route('login')
            ->with('error', 'Incorrect username or password');
    }
}
