<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Estadisticas de consultas</title>
    <link rel="stylesheet" href="{{ asset('css/views.css') }}">
</head>
<body>
<div class="container">
    <h1>API STATISTICS</h1>

    <div class="statistics-grid">
        <div class="card">
            <h2>Total Queries</h2>
            <p>Total queries made: {{ $totalQueries ?? 0 }}</p>
        </div>

        <div class="card">
            <h2>Queries by Type</h2>
            <table>
                <thead>
                <tr>
                    <th>Query Type</th>
                    <th>Count</th>
                </tr>
                </thead>
                <tbody>
                @forelse ($queriesByType ?? [] as $type => $count)
                <tr>
                    <td>{{ $type }}</td>
                    <td>{{ $count->count() }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="2">No data available</td>
                </tr>
                @endforelse
                </tbody>
            </table>
        </div>

        <div class="card">
            <h2>Latest Queries</h2>
            <table>
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Parameter</th>
                    <th>Date and Time</th>
                    <th>User IP</th>
                </tr>
                </thead>
                <tbody>
                @forelse ($latestQueries ?? [] as $query)
                <tr>
                    <td>{{ $query->type }}</td>
                    <td>{{ $query->parameter }}</td>
                    <td>{{ \Carbon\Carbon::parse($query->date_time)->format('d/m/Y H:i:s') }}</td>
                    <td>{{ $query->user_ip }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="4">No queries registered</td>
                </tr>
                @endforelse
                </tbody>
            </table>
        </div>
    </div>
    <a href="/" >Back to Login</a>
    <a href="http://localhost:3000/">Back to Home</a>
</div>
</body>
</html>
