<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ad;
use Illuminate\Support\Str;

class AdController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getAllAds(Request $request)
    {
        $ads = Ad::all(['*']);
        return $this->sendResponse($ads, '');
    }

    public function deleteAd(Request $request)
    {
        $request->validate([
            'ad_id' => 'required|string|max:255'
        ]);
        $ad_id = $request['ad_id'];
        $del = Ad::where('ad_id', $ad_id)->delete();
        return $this->sendResponse($del, 'Ad Deleted Successfully');
    }

    public function getAdById(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        // $user = Auth::user();
        $uid = $request['uid'];
        $adsid = Ad::where('uid', $uid)->get();
        if ($adsid) {
            return $this->sendResponse($adsid, 'By User');
        } else {
            return $this->sendError("No Ads", [], 404);
        }
    }
}
