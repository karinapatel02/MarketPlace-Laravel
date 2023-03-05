<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;
    protected $table = 'School';
    protected $primaryKey = 'school_id';
    public $timestamps = false;
    public $incrementing = false;

    protected $keyType = 'string';
    protected $fillable = [
        'school_id', 'name'
    ];
}
