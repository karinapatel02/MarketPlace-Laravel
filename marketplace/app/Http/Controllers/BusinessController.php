<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Business;
use App\Models\School;

class BusinessController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getBusinessProfile(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];

        $profile = DB::table('User')
            ->join('Business_owner', 'User.uid', '=', 'Business_owner.uid')
            ->where('User.uid', $uid)->get();
        if ($profile) {
            return $this->sendResponse($profile, 'Business Profile!');
        } else {
            return $this->sendError("Profile not Found", [], 404);
        }
    }

    public function editProfile(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];
        $uname = $request['uname'];
        $fname = $request['fname'];
        $lname = $request['lname'];
        $email = $request['email'];
        $phone_number = $request['phone'];
        $city = $request['city'];
        $state = $request['state'];
        DB::table('User')
            ->join('Business_owner', 'User.uid', '=', 'Business_owner.uid')
            ->where('User.uid', $uid)
            ->update(['User.username' => $uname, 'User.fname' => $fname, 'User.lname' => $lname, 'User.email' => $email, 'User.phone_number' => $phone_number, 'Business_owner.city' => $city, 'Business_owner.state' => $state]);
        return $this->sendResponse("Profile updated", [], 200);
    }

}
