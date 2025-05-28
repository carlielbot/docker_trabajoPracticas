<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Estadísticas de Consultas</title>
    <link rel="stylesheet" href="{{ asset('css/vistas.css') }}">
</head>
<body>
<div class="container">
    <h1>CONSULTAS DE LA API</h1>

    <div class="consultas-grid">
        <table class="table">
            <thead>
            <tr>
                <th>tipo de consulat</th>
                <th>parametro usado</th>
                <th>fecha y hora de la consulta</th>
                <th>ip del usuario</th>
            </tr>
            </thead>
            <tbody>
            @forelse ($ultimasConsultas ?? [] as $consulta)
            <tr>
                <td>{{ $consulta->tipoConsulta }}</td>
                <td>{{ $consulta->paramUsado }}</td>
                <td>{{ \Carbon\Carbon::parse($consulta->fechaHora)->format('d/m/Y H:i:s') }}</td>
                <td>{{ $consulta->ip }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="2">No hay consultas hechas</td>
            </tr>
            @endforelse
            </tbody>
        </table>
    </div><br>
    <a href="http://localhost:3000/">Volver a la página principal</a>
</div>
</body>
</html>
