<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login</title>
    <link rel="stylesheet" href="{{ asset('css/vistas.css') }}">
</head>
<body>
    <div class="form-container">
        <h2 class="form-title">Acceso</h2>

        @if(session('error'))
            <div class="error-message">
                {{ session('error') }}
            </div>
        @endif

        <form method="POST" action="{{ route('verificar.login') }}">
            @csrf
            <div class="input-group">
                <input type="text"
                       name="usuario"
                       placeholder="Usuario"
                       required
                       autocomplete="off">
            </div>

            <div class="input-group">
                <input type="password"
                       name="password"
                       placeholder="Contraseña"
                       required>
            </div>

            <button type="submit" class="btn-login">
                Iniciar Sesión
            </button>
        </form>
        <a href="http://localhost:3000/">volver a la aplicacion</a>
    </div>

</body>
</html>
