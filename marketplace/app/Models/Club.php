<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;
    protected $table = 'Club';
    protected $primaryKey = 'club_id';
    public $timestamps = false;
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'club_id', 'uid', 'name', 'date', 'description'
    ];
}

class Clubmember extends Model
{
    use HasFactory;
    protected $table = 'Club_member';
    public $timestamps = false;
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'club_id', 'uid', 'joindate'
    ];
}

class User extends Model
{
    use HasFactory;
    protected $table = 'User';
    protected $primaryKey = 'uid';
    public $timestamps = false;
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'uid', 'username', 'password', 'fname', 'lname', 'email', 'phone_number', 'role_type'
    ];
}
