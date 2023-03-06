# MarketPlace-laravel

This is a full stack laravel web application using RESTful APIs that enables users to communicate through a blog and conduct online buying and selling of products.
Created 4 role-based profiles (Student, Business Owner, School Admin, and Super Admin) with specific access control.


## Install Laravel here
https://laravel.com/docs/4.2

## Download php here
### For Mac OS
php: https://www.ergonis.com/products/tips/install-php-on-macos.php 

### For Windows
php: https://windows.php.net/download/

### If database hosted on cloud.
Needs to give access to host(eg. wireless% or whatever)

To Run application in local:

Install composer globally

cd filename

composer install

npm install

composer require php-open-source-saver/jwt-auth

php artisan jwt:secret

This will update our .env file with a jwt secret.

npm run dev

php artisan serve

remember to check ports

#### You need to add your database credentials as well as Mail credentials, and hosted link for the blog.

#### If you get 500 | Server Error  you can try this

composer install 
mv .env.example .env 
php artisan cache:clear 
composer dump-autoload 
php artisan key:generate


##### Other Contributors to the project
rachanamaria, Divya6696
