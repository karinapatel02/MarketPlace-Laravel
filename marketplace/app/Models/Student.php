<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $table = 'Student';
    protected $primaryKey = 'uid';
    public $timestamps = false;
    public $incrementing = false;

    protected $keyType = 'string';
    protected $fillable = [
        'uid', 'city', 'state', 'major', 'school_id'
    ];
}
