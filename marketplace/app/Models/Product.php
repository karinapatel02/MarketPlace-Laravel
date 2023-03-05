<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'Product';
    protected $primaryKey = 'pid';
    public $timestamps = false;
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'pid', 'uid', 'name', 'category', 'price', 'description', 'stock', 'image'
    ];
}
