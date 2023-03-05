<?php

namespace App\Http\Controllers;

use App\Models\MavUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getAllCountsAdmin(Request $request)
    {
        $usercounts = DB::table('User')
            ->select(DB::raw('role_type AS role'), DB::raw('count(role_type) as count'))
            ->whereIn('role_Type', ['student', 'business_owner'])
            ->groupBy('role_type')
            ->get();
        $clubbar = DB::table(DB::raw('Club as t1'))
            ->select(DB::raw('t1.name'), DB::raw('t2.value'), DB::raw('t2.pct'))
            ->join(
                DB::raw('(SELECT club_id, COUNT(*) AS value , (COUNT(*) / (SELECT COUNT(*) FROM Club_member LIMIT 5)) * 100 as pct FROM Club_member GROUP BY club_id LIMIT 5) as t2 '),
                function ($join) {
                    $join->on('t1.club_id', '=', 't2.club_id');
                }
            )
            ->orderBy(DB::raw('t2.value'), 'desc')
            ->get();
        $schoolcounts = DB::table('School')
            ->select(DB::raw('count(*) as count'))
            ->get();
        $clubcounts = DB::table('Club')
            ->select(DB::raw('count(*) as count'))
            ->get();
        $piecounts = DB::table('Student')
            ->select(DB::raw('COALESCE(`state`, "Others") as name'), DB::raw('count(*) as value'))
            ->groupBy('state')
            ->get();
        $counts = ['res' => $usercounts, 'cchart' => $clubbar, 'school' => $schoolcounts, 'pie' => $piecounts, 'club' => $clubcounts];
        return $this->sendResponse($counts, '');
    }

    public function getAllCountsSchool(Request $request)
    {
        $usercounts = DB::table('User')
            ->select(DB::raw('role_type AS role'), DB::raw('count(role_type) as count'))
            ->whereIn('role_Type', ['student', 'business_owner'])
            ->groupBy('role_type')
            ->get();
        $clubbar = DB::table(DB::raw('Club as t1'))
            ->select(DB::raw('t1.name'), DB::raw('t2.value'), DB::raw('t2.pct'))
            ->join(
                DB::raw('(SELECT club_id, COUNT(*) AS value , (COUNT(*) / (SELECT COUNT(*) FROM Club_member LIMIT 5)) * 100 as pct FROM Club_member GROUP BY club_id LIMIT 5) as t2 '),
                function ($join) {
                    $join->on('t1.club_id', '=', 't2.club_id');
                }
            )
            ->orderBy(DB::raw('t2.value'), 'desc')
            ->get();
        $schoolcounts = DB::table('School')
            ->select(DB::raw('count(*) as count'))
            ->get();
        $clubcounts = DB::table('Club')
            ->select(DB::raw('count(*) as count'))
            ->get();
        $piecounts = DB::table('Student')
            ->select(DB::raw('COALESCE(`major`, "Others") as name'), DB::raw('count(*) as value'))
            ->groupBy('major')
            ->get();
        $counts = ['res' => $usercounts, 'cchart' => $clubbar, 'school' => $schoolcounts, 'pie' => $piecounts, 'club' => $clubcounts];
        return $this->sendResponse($counts, '');
    }

    public function getBusinessUsers(Request $request)
    {
        // SELECT u.uid, CONCAT(u.fname, ',', u.lname) AS name, u.email, 
        // u.phone_number, b.city, b.state FROM User as u, Business_owner as b where u.uid = b.uid
        $bussUsers = DB::table(DB::raw('User as u'))
            ->select(DB::raw('u.uid'), DB::raw('CONCAT(u.fname, ",", u.lname) as name'), DB::raw('u.email'), DB::raw('u.phone_number'), DB::raw('b.city'), DB::raw('b.state'))
            ->join(DB::raw('Business_owner as b'), function ($join) {
                $join->on('u.uid', '=', 'b.uid');
            })
            ->get();
        return $this->sendResponse($bussUsers, '');
    }

    public function getStudentUsers(Request $request)
    {
        // SELECT u.uid, CONCAT(u.fname, ',', u.lname) AS name, u.email, 
        // u.phone_number, b.city, b.state FROM User as u, Business_owner as b where u.uid = b.uid
        $stuUsers = DB::table(DB::raw('User as u'))
            ->select(DB::raw('u.uid'), DB::raw('CONCAT(u.fname, ",", u.lname) as name'), DB::raw('u.email'), DB::raw('u.phone_number'), DB::raw('s.city'), DB::raw('s.state'), DB::raw('s.major'), DB::raw('sc.name as school'))
            ->join(DB::raw('Student as s'), function ($join) {
                $join->on('u.uid', '=', 's.uid');
            })
            ->join(DB::raw('School as sc'), function ($join) {
                $join->on('s.school_id', '=', 'sc.school_id');
            })
            ->get();
        return $this->sendResponse($stuUsers, '');
    }

    public function deleteUser(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];
        $del = MavUser::where('uid', $uid)->delete();
        return $this->sendResponse($del, 'User Deleted Successfully');
    }
}
