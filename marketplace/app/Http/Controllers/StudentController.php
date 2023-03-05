<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\School;

class StudentController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getStudentProfile(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|max:255'
        ]);
        $uid = $request['uid'];

        // "SELECT * from User, Student WHERE User.uid = '" . $id . "' AND User.uid=Student.uid;"
        $profile = DB::table('User')
            ->join('Student', 'User.uid', '=', 'Student.uid')
            ->where('User.uid', $uid)->get();
        if ($profile) {
            // echo $profile;
            return $this->sendResponse($profile, 'Student Profile!');
        } else {
            return $this->sendError("Profile not Found", [], 404);
        }
    }

    public function getAllSchools(Request $request)
    {
        $schools = School::all(['*']);
        return $this->sendResponse($schools, '');
    }

    public function getSchoolById(Request $request)
    {
        $request->validate([
            'school_id' => 'required|string|max:255'
        ]);
        // $user = Auth::user();
        $schoolID = $request['school_id'];
        $schID = School::where('school_id', $schoolID)->get();
        if ($schID) {
            return $this->sendResponse($schID, 'School');
        } else {
            return $this->sendError("School ID", [], 404);
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
        $major = $request['major'];
        $school_id = $request['school'];
        DB::table('User')
            ->join('Student', 'User.uid', '=', 'Student.uid')
            ->where('User.uid', $uid)
            ->update(['User.username' => $uname, 'User.fname' => $fname, 'User.lname' => $lname, 'User.email' => $email, 'User.phone_number' => $phone_number, 'Student.city' => $city, 'Student.state' => $state, 'Student.major' => $major, 'Student.school_id' => $school_id]);
        return $this->sendResponse("Profile updated", [], 200);
    }

}
