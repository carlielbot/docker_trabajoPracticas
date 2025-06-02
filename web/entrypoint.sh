#!/bin/bash
set -e
# Instala dependencias si no existe vendor
if [ ! -d "vendor" ]; then
  composer install
fi

# Ajusta el archivo para que lleguen las peticiones a la API
CSRF_FILE="vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/VerifyCsrfToken.php"
if [ -f "$CSRF_FILE" ]; then
  sed -i 's/protected \$except.*/protected \$except = ["api\/*"];/' "$CSRF_FILE"
fi

# Copia .env si no existe
if [ ! -f ".env" ]; then
  cp .env.example .env
fi

# Espera a que la base de datos esté disponible
until php artisan migrate --force; do
  echo "Esperando a la base de datos..."
  sleep 3
done

# Inicia Apache
apache2-foreground