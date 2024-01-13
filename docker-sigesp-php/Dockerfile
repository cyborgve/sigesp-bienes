FROM php:7.4-apache

# Instalar extensiones necesarias para PostgreSQL
RUN apt-get update \
    && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql pdo
