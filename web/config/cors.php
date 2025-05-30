<?php
// CORS configuration for the web application
// This configuration allows cross-origin requests from specified origins if the paths config is set to '' it wont let the client do any post consultation to the database.
// THE SAME IS FOR THE C:\Users\Tarde\Documents\GitHub\docker_trabajoPracticas\web\vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken.php FILE,
// IF YOU DONT SET THE PATHS TO 'api/*' IT WONT LET THE CLIENT DO ANY POST CONSULTATION TO THE DATABASE.
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000', 'http://localhost/'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];