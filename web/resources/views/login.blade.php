<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login</title>
    <link rel="stylesheet" href="{{ asset('css/views.css') }}">
</head>
<body>
    <div class="form-container">
        <h2 class="form-title">Access</h2>

        @if(session('error'))
            <div class="error-message">
                {{ session('error') }}
            </div>
        @endif

        <form method="POST" action="{{ route('verify.login') }}">
            @csrf
            <div class="input-group">
                <input type="text"
                       name="username"
                       placeholder="Username"
                       required
                       autocomplete="off">
            </div>

            <div class="input-group">
                <input type="password"
                       name="password"
                       placeholder="Password"
                       required>
            </div>

            <button type="submit" class="btn-login">
                Login
            </button>
        </form>
        <a href="http://localhost:3000/">Back to Application</a>
    </div>

</body>
</html>
