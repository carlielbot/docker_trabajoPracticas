# Dockerfile for Apache with Laravel
# Based on PHP 8.3 with Apache


FROM php:8.3-apache
# Install necessary PHP extensions and tools
RUN apt-get update && apt-get install -y \
    zip unzip curl git libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Enable Apache modules
RUN a2enmod rewrite headers

# Copy the Apache configuration file
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

# Enable the new site configuration
WORKDIR /var/www/html

# Copy the Laravel application files
COPY . /var/www/html

# Set permissions for Laravel directories
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

# Install Laravel dependencies using Composer
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Install additional PHP extensions required by Laravel
RUN docker-php-ext-install opcache

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Run the entrypoint script to set up permissions and other configurations
RUN chmod +x /entrypoint.sh

# Expose port 80 for the web server
EXPOSE 80

# Set the entrypoint script
CMD ["/entrypoint.sh"]