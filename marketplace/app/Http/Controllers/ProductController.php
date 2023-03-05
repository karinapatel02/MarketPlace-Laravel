<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function addProduct(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $pid = Str::uuid()->toString();
        $input = $request->all();
        $input['pid'] = Str::substr($pid, 0, 27);
        $pro = Product::create($input);
        return $this->sendResponse($pro, 'Product Added Successfully');
    }

    public function getAllProducts(Request $request)
    {
        $prods = Product::all(['*']);
        return $this->sendResponse($prods, '');
    }

    public function deleteProduct(Request $request)
    {
        $request->validate([
            'pid' => 'required|string|max:255'
        ]);
        $pid = $request['pid'];
        $del = Product::where('pid', $pid)->delete();
        return $this->sendResponse($del, 'Product Deleted Successfully');
    }

    public function getProductsById(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        // $user = Auth::user();
        $uid = $request['uid'];
        $prodsid = Product::where('uid', $uid)->get();
        if ($prodsid) {
            return $this->sendResponse($prodsid, 'By User');
        } else {
            return $this->sendError("No Products", [], 404);
        }
    }
}
