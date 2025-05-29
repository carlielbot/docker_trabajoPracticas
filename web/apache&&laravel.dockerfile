FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    zip unzip curl git libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql zip

RUN a2enmod rewrite headers

COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

RUN composer install --no-interaction --prefer-dist --optimize-autoloader

RUN docker-php-ext-install opcache

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
CMD ["/entrypoint.sh"]