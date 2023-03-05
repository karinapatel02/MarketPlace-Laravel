<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;
    protected $table = 'Advertisement';
    protected $primaryKey = 'ad_id';
    public $timestamps = false;
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'ad_id', 'uid', 'name', 'content', 'image', 'date'
    ];
}
