#!/bin/bash
set -e

# Espera a que la base de datos esté disponible
until php artisan migrate --force; do
  echo "Esperando a la base de datos..."
  sleep 3
done

# Inicia Apache
apache2-foreground