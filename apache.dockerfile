FROM php:8.3-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    zip unzip curl git libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql zip


# Enable Apache modules
RUN a2enmod rewrite headers

COPY ./config/000-default.conf /etc/apache2/sites-available/000-default.conf

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php &&  mv composer.phar /usr/local/bin/composer 

#Directory for the application
WORKDIR /var/www/html

EXPOSE 80
CMD ["apache2-foreground"]
