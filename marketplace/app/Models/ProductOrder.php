<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOrder extends Model
{
    use HasFactory;
    protected $table = 'Product_order';
    // protected $primaryKey = 'oid';
    public $timestamps = false;
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'pid', 'oid', 'quantity'
    ];
}

class Order extends Model
{
    use HasFactory;
    protected $table = 'Order';
    protected $primaryKey = 'oid';
    public $timestamps = false;
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'oid', 'uid', 'date', 'total', 'isComplete'
    ];
}
