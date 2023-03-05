<?php

namespace App\Models;
  
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
  
class MavUser extends Authenticatable implements JWTSubject
{
    use  HasFactory, Notifiable;

    public $timestamps = false;
    protected $table = 'User';
    protected $primaryKey = 'uid';
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'uid', 'username', 'password', 'fname', 'lname', 'email', 'phone_number', 'role_type'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return $this->rememberTokenName;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
