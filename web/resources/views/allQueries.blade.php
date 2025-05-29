<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Estadísticas de Consultas</title>
    <link rel="stylesheet" href="{{ asset('css/views.css') }}">
</head>
<body>
<div class="container">
    <h1>API QUERIES</h1>

    <div class="queries-grid">
        <table class="table">
            <thead>
            <tr>
                <th>Query Type</th>
                <th>Used Parameter</th>
                <th>Query Date and Time</th>
                <th>User IP</th>
            </tr>
            </thead>
            <tbody>
            @forelse ($latestQueries ?? [] as $query)
            <tr>
                <td>{{ $query->queryType }}</td>
                <td>{{ $query->paramUsed }}</td>
                <td>{{ \Carbon\Carbon::parse($query->dateTime)->format('d/m/Y H:i:s') }}</td>
                <td>{{ $query->ip }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="4">No queries registered</td>
            </tr>
            @endforelse
            </tbody>
        </table>
    </div><br>
    <a href="/" >Back to Login</a>
    <a href="http://localhost:3000/">Back to Home</a>
</div>
</body>
</html>
