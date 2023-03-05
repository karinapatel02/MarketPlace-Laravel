<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
