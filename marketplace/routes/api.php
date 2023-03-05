<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\AdController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdvertisementController;
use Illuminate\Support\Facades\Route;

header('Access-Control-Allow-Origin: *');
//Access-Control-Allow-Origin: *
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::group(['middleware' => 'auth:api'], function () {
Route::group(['middleware' => 'api', 'prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('getUser', [AuthController::class, 'getUser']);
    Route::post('updatePassword', [AuthController::class, 'updatePassword']);
});
Route::group(['middleware' => 'api'], function () {
    Route::post('getStudentProfile', [StudentController::class, 'getStudentProfile']);
    Route::post('getBusinessProfile', [BusinessController::class, 'getBusinessProfile']);
    Route::post('getSchoolById', [StudentController::class, 'getSchoolById']);
    Route::post('editProfile', [StudentController::class, 'editProfile']);
    Route::post('editBusinessProfile', [BusinessController::class, 'editProfile']);
    Route::post('deleteProfile', [AdminController::class, 'deleteUser']);
    Route::get('getAllSchools', [StudentController::class, 'getAllSchools']);
    Route::get('getAllClubs', [ClubController::class, 'getAllClubs']);
    Route::get('getAllAds', [AdController::class, 'getAllAds']);
    Route::post('getClubById', [ClubController::class, 'getClubById']);
    Route::post('deleteClub', [ClubController::class, 'deleteClub']);
    Route::post('getAdById', [AdController::class, 'getAdById']);
    Route::post('deleteAd', [AdController::class, 'deleteAd']);
    Route::post('getProdById', [ProductController::class, 'getProductsById']);
    Route::post('deleteProduct', [ProductController::class, 'deleteProduct']);
    Route::post('addProduct', [ProductController::class, 'addProduct']);
    Route::get('getAllProducts', [ProductController::class, 'getAllProducts']);
    Route::get('getAdminCounts', [AdminController::class, 'getAllCountsAdmin']);
    Route::get('getSchoolCounts', [AdminController::class, 'getAllCountsSchool']);
    Route::get('getBussUsers', [AdminController::class, 'getBusinessUsers']);
    Route::get('getStuUsers', [AdminController::class, 'getStudentUsers']);
    Route::post('delUser', [AdminController::class, 'deleteUser']);
    Route::post('addToCart', [OrderController::class, 'addToCart']);
    Route::post('createClub', [ClubController::class, 'createClub']);
    Route::post('getClub', [ClubController::class, 'getClub']);
    Route::get('getClub', [ClubController::class, 'getClub']);
    Route::post('joinClub', [ClubController::class, 'joinClub']);
    Route::post('leaveClub', [ClubController::class, 'leaveClub']);
    Route::post('getOrder', [OrderController::class, 'getOrder']);
    Route::post('orderTotal', [OrderController::class, 'orderTotal']);
    Route::post('deleteProductCart', [OrderController::class, 'deleteProductCart']);
    Route::post('createadd', [AdvertisementController::class, 'createadd']);
    Route::post('getOrderhistory', [OrderController::class, 'getOrderhistory']);
    Route::post('getOrderhistorydetail', [OrderController::class, 'getOrderhistorydetail']);
    Route::post('getAddByUser', [AdvertisementController::class, 'getAddByUser']);
    Route::post('getAds', [AdvertisementController::class, 'getAds']);
    Route::post('returnProduct', [OrderController::class, 'returnProduct']);
});
