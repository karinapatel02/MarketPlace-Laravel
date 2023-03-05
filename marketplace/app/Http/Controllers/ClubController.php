<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\Clubmember;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ClubController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getAllClubs(Request $request)
    {
        $clubs = Club::all(['*']);
        return $this->sendResponse($clubs, '');
    }

    public function createClub(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $cid = Str::uuid()->toString();
        $date = Carbon::now();
        $input = $request->all();
        $input['club_id'] = Str::substr($cid, 0, 27);
        $input['date'] = Str::substr($date, 0, 27);
        $club = Club::create($input);
        return $this->sendResponse($club, 'Club Created Successfully!');
    }

    public function getClub(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255',
            'clubId' => 'required|string|max:255'
        ]);
        // $user = Auth::user();
        // $uid = $request['uid'];
        $clubid = $request['clubId'];
        $clublis = DB::table('Club')
        ->join('Club_member','Club_member.club_id','=','Club.club_id')
        ->join('User','User.uid','=','Club_member.uid')
        ->select('Club.name','User.fname as fname','User.lname as lname')
        ->where('Club.club_id', $clubid)
        ->get();
        return $this->sendResponse($clublis, 'Club data');
    }

    public function joinClub(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255',
            'clubId' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];
        $clubid = $request['clubId'];
        $clubmember = Clubmember::where('uid', $uid)
        ->where('club_id',$clubid)->first();
        if ($clubmember === null) {
            $date = Carbon::now();
            
            $input['club_id'] = Str::substr($clubid, 0, 27);
            $input['uid'] = Str::substr($uid, 0, 27);
            $input['joindate'] = Str::substr($date, 0, 27);
            $club = Clubmember::create($input);
            return $this->sendResponse($club, 'Successfully joined the club!');
        }
    }

    public function leaveClub(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255',
            'clubId' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];
        $clubid = $request['clubId'];
        $clubmember = Clubmember::where('uid', $uid)
        ->where('club_id', $clubid)
        ->first();
        if ($clubmember) {
            $uid = $request['uid'];
            $del = Clubmember::where('uid', $uid)->delete();
            return $this->sendResponse($del, 'Successfully removed from the Club!');
        }
    }

    public function deleteClub(Request $request)
    {
        $request->validate([
            'club_id' => 'required|string|max:255'
        ]);
        $club_id = $request['club_id'];
        $del = Club::where('club_id', $club_id)->delete();
        return $this->sendResponse($del, 'Club Deleted Successfully');
    }

    public function getClubById(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        // $user = Auth::user();
        $uid = $request['uid'];
        $clubsid = Club::where('uid', $uid)->get();
        if ($clubsid) {
            return $this->sendResponse($clubsid, 'By User');
        } else {
            return $this->sendError("No Clubs", [], 404);
        }
    }
}
