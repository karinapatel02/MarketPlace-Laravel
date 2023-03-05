<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductOrder;
use Illuminate\Support\Str;

class OrderController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function addToCart(Request $request)
    {
        try {
            // $request->validate([
            //     'pid' => 'required|string|max:255',
            //     'uid' => 'required|string|max:255'
            // ]);
            $pid = $request['pid'];
            $uid = $request['uid'];
            $quantity = $request['quantity'];
            $id = Str::uuid()->toString();
            $oid = Str::substr($id, 0, 27);
            // echo $oid;
            $date = date('Y-m-d H:i:s');
            $isComplete = 0;
            $total = '0';
            $orderExists = DB::table('Order')
                ->where('uid', $uid)
                ->where('isComplete', '=', $isComplete)->first();
            if ($orderExists) {
                $oid = $orderExists->oid;
                $prodInCart = DB::table('Product_order')
                    ->where('pid', $pid)
                    ->where('oid', $oid)->first();
                if ($prodInCart) {
                    $quantity = (int)$prodInCart->quantity + 1;
                    $updateProdInCart = DB::table('Product_order')
                        ->where('pid', $pid)
                        ->where('oid', $oid)
                        ->update(['quantity' => $quantity]);
                    return $this->sendResponse("Cart updated", [], 200);
                } else {
                    $insertProdInCart = DB::table('Product_order')
                        ->insert(['pid' => $pid, 'oid' => $oid, 'quantity' => $quantity]);
                    return $this->sendResponse("Product Added to Cart", [], 200);
                }
            } else {
                // echo "else insert";
                $createOrderAdd = DB::table('Order')
                    ->insert(['oid' => $oid, 'uid' => $uid, 'date' => $date, 'total' => $total, 'isComplete' => $isComplete]);
                // echo "else insert add";
                $insertProdInCart = DB::table('Product_order')
                    ->insert(['pid' => $pid, 'oid' => $oid, 'quantity' => $quantity]);
                return $this->sendResponse("Product Added to Cart", [], 200);
            }
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    public function getOrder(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];
        $isComplete = '0';
        $prods = DB::table('Order')
            ->join('Product_order', 'Product_order.oid', '=', 'Order.oid')
            ->join('Product', 'Product.pid', '=', 'Product_order.pid')
            ->select('Order.oid', 'Order.uid', 'Order.date', 'Product.pid', 'Order.total as total', 'Order.isComplete', 'Product_order.quantity as quantity', 'Product.name as productname', 'Product.category', 'Product.price as productprice', 'Product.description', 'Product.stock', 'Product.image')
            ->where('Order.isComplete', $isComplete)
            ->where('Order.uid', $uid)
            ->get();
        return $this->sendResponse($prods, '');
    }

    public function getOrderhistorydetail(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255',
            'oid' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];
        $oid = $request['oid'];
        $isComplete = '1';
        $orderhistorydata = DB::table('Order')
            ->join('Product_order', 'Product_order.oid', '=', 'Order.oid')
            ->join('Product', 'Product.pid', '=', 'Product_order.pid')
            ->select('Order.oid', 'Order.uid', 'Order.date', 'Product.pid', 'Order.total as total', 'Order.isComplete', 'Product_order.quantity as quantity', 'Product.name as productname', 'Product.category', 'Product.price as productprice', 'Product.description', 'Product.stock', 'Product.image')
            ->where('Order.isComplete', $isComplete)
            ->where('Order.uid', $uid)
            ->where('isComplete', $isComplete)
            ->get();
        return $this->sendResponse($orderhistorydata, 'Orderrrrr');
    }


    public function getOrderhistory(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];
        $isComplete = '1';
        $order = Order::where('uid', $uid)
            ->where('isComplete', $isComplete)
            ->get();
        return $this->sendResponse($order, '');
    }

    // public function returnProduct(Request $request)
    // {
    //     $request->validate([
    //         'pid' => 'required|string|max:255'
    //     ]);
    //     $pid = $request['pid'];
    //     $del = Product::where('pid', $pid)->delete();
    //     return $this->sendResponse($del, 'Product Deleted Successfully');
    // }



    public function orderTotal(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255',
            'total' => 'required|max:255'
        ]);
        $uid = $request['uid'];
        $isComplete = '0';
        $tot = $request['total'];
        $total = strval($tot);
        $Order = Order::select('isComplete')
            ->where('uid', $uid)
            ->where('isComplete', $isComplete)->first();
        if ($Order === null) {
            $OrderComp = Order::where('uid', $uid)
                ->update(['total' => $total, 'isComplete' => $isComplete]);
            return $this->sendResponse($OrderComp, 'Order Successfully Placed!');
        }
    }

    public function deleteProductCart(Request $request)
    {
        $request->validate([
            'pid' => 'required|string|max:255',
            'uid' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];
        $pid = $request['pid'];
        $isComplete = '0';
        $deleteProCart = DB::table('Product_order')
            ->join('Order', 'Order.oid', '=', 'Product_order.oid')
            ->where('Order.uid', $uid)
            ->where('Product_order.pid', $pid)
            ->where('Order.isComplete', $isComplete)
            ->delete();
        return $this->sendResponse($deleteProCart, 'Product sccessfully Removed!');
    }

    public function returnProduct(Request $request)
    {
        $request->validate([
            'pid' => 'required|string|max:255',
            'oid' => 'required|string|max:255'
        ]);
        $pid = $request['pid'];
        $oid = $request['oid'];
        $returnProduct = DB::table('Product_order')
            ->join('Order', 'Order.oid', '=', 'Product_order.oid')
            ->join('Product', 'Product.pid', '=', 'Product_order.pid')
            ->select(DB::raw('Product_order.quantity * Product.price as price'), 'Order.total')
            ->where('Order.oid', $oid)
            ->where('Product_order.pid', $pid)->first();
        if ($returnProduct) {
            $total = $returnProduct->total;
            $price = $returnProduct->price;
            $newtotal = $total - $price;
            $returnPro = ProductOrder::where('oid', $oid)
                ->where('pid', $pid)
                ->delete();
            if ($returnPro)
                $updatereturnpro = Order::where('oid', $oid)
                    ->update(['total' => $newtotal]);
        }
        return $this->sendResponse($returnPro, 'Product returned sccessfully!');
    }
}
