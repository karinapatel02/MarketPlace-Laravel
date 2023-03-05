<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    use HasFactory;
    protected $table = 'Business_owner';
    protected $primaryKey = 'uid';
    public $timestamps = false;
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'uid', 'city', 'state', 'school_id'
    ];
}
