<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Estadisticas de consultas</title>
    <link rel="stylesheet" href="{{ asset('css/vistas.css') }}">
</head>
<body>
<div class="container">
    <h1>ESTADISTICAS DE LA API</h1>

    <div class="estadisticas-grid">
        <div class="card">
            <h2>Consultas Totales</h2>
            <p>Total de consultas realizadas: {{ $totalConsultas ?? 0 }}</p>
        </div>

        <div class="card">
            <h2>Consultas por Tipo</h2>
            <table>
                <thead>
                <tr>
                    <th>Tipo de Consulta</th>
                    <th>Cantidad</th>
                </tr>
                </thead>
                <tbody>
                @forelse ($consultasPorTipo ?? [] as $tipo => $cantidad)
                <tr>
                    <td>{{ $tipo }}</td>
                    <td>{{ $cantidad->count() }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="2">No hay datos disponibles</td>
                </tr>
                @endforelse
                </tbody>
            </table>
        </div>

        <div class="card">
            <h2>Últimas Consultas</h2>
            <table>
                <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Parámetro</th>
                    <th>Fecha y Hora</th>
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
                    <td colspan="3">No hay consultas registradas</td>
                </tr>
                @endforelse
                </tbody>
            </table>
        </div>
    </div>
    <a href="/" >Volver al login</a>
    <a href="http://localhost:3000/">Volver al inicio</a>
</div>
</body>
</html>
