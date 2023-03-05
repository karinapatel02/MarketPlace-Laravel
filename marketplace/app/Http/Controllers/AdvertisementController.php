<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Advertisement;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AdvertisementController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function createadd(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $adname = $request['name'];
        $ad = Advertisement::select('name')
            ->where('name', $adname)->first();
        if ($ad === null) {
            $input = $request->all();
            $aid = Str::uuid()->toString();
            $date = Carbon::now();
            $input['ad_id'] = Str::substr($aid, 0, 27);
            $input['date'] = Str::substr($date, 0, 27);
            $addAd = Advertisement::create($input);
            return $this->sendResponse($addAd, 'Product Added Successfully');
        }
    }

    public function getAddByUser(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];
        $getAddbyID = Advertisement::where('uid', $uid)->get();
            return $this->sendResponse($getAddbyID, 'Product Added Successfully');
    }

    public function getAds(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];
        $getAdd = Advertisement::all(['*']);
            return $this->sendResponse($getAdd, 'Product Added Successfully');
    }
}
