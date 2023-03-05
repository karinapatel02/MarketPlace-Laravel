# MarketPlace-laravel

## Download php here
### For Mac OS
-php: https://www.ergonis.com/products/tips/install-php-on-macos.php 

### For Windows
-php: https://windows.php.net/download/

### If database hosted on cloud.
-Needs to give access to host(eg. wireless% or whatever)

To Run application in local:

-Install composer globally

-cd filename

-composer install

-npm install

-composer require php-open-source-saver/jwt-auth

-php artisan jwt:secret

-This will update our .env file with a jwt secret.

-npm run dev

-php artisan serve

-remember to check ports

### For Sending mail update local environment file

MAIL_MAILER=smtp

MAIL_HOST=

MAIL_PORT=465

MAIL_USERNAME=

MAIL_PASSWORD=

MAIL_ENCRYPTION=ssl

MAIL_FROM_ADDRESS=

MAIL_FROM_NAME="${APP_NAME}"
