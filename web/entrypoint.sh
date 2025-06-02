#!/bin/bash
set -e
# Install al dependencies
if [ ! -d "vendor" ]; then
  composer install
fi

# Adjust the permissions for request to API.
CSRF_FILE="vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/VerifyCsrfToken.php"
if [ -f "$CSRF_FILE" ]; then
  sed -i 's/protected \$except.*/protected \$except = ["api\/*"];/' "$CSRF_FILE"
fi

# Copy .env if it does not exist
if [ ! -f ".env" ]; then
  cp .env.example .env
fi

# Wait for the database to be available
until php artisan migrate --force; do
  echo "Waiting for the database..."
  sleep 3
done

# Start Apache
apache2-foreground