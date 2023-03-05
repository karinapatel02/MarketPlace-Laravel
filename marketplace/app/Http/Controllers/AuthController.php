<?php

namespace App\Http\Controllers;

use App\Mail\PasswordReset;
use App\Mail\WelcomeMail;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\MavUser;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'updatePassword', 'sendMail']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised User']);
        }

        $user = Auth::user();
        $res['token'] =  $token;
        $res['user'] =  $user;

        return $this->sendResponse($res, 'User login successfully.');
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string|max:255|unique:User',
                'email' => 'required|string|email|max:255|unique:User',
                'password' => 'required|string',
            ]);
            // print(json_encode($request));
            $id = Str::uuid()->toString();
            $input = $request->all();
            $input['uid'] = Str::substr($id, 0, 27);
            $input['phone_number'] = $request['pnumber'];
            $input['role_type'] = $request['role'];
            $input['password'] = Hash::make($request->password);

            $user = MavUser::create($input);
            if ($user) {
                if ($request['role'] == 'student') {
                    // print("Student");
                    $stu = ['uid' => $input['uid']];
                    Student::create($stu);
                    $this->sendMail($request);
                    return $this->sendResponse($user, 'User register successfully.');
                } else {
                    // print("Business");
                    $buss = ['uid' => $input['uid']];
                    Business::create($buss);
                    $this->sendMail($request);
                    return $this->sendResponse($user, 'User register successfully.');
                }
            }
            return $this->sendError('User not registered.');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    private function sendMail($mailData)
    {
        $data = ([
            'name' => $mailData['fname'] . $mailData['lname'],
            'email' => $mailData['email'],
        ]);
        Mail::to($mailData['email'])->send(new WelcomeMail($data));
    }

    public function logout()
    {
        Auth::logout();
        return $this->sendResponse([], 'User logged out successfully.');
    }

    public function getUser()
    {
        return $this->sendResponse(Auth::user(), 'User');
    }

    public function updatePassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
            $user = DB::table('User')
                ->where('email', '=', $request->email)
                ->update(['password' => Hash::make($request->password)]);
            if ($user) {
                $udata = DB::table('User')
                    ->select(['fname', 'lname', 'email'])
                    ->where('email', '=', $request->email)->first();
                $data = ([
                    'name' => $udata->fname . $udata->lname,
                    'email' => $udata->email,
                ]);
                Mail::to($request['email'])->send(new PasswordReset($data));
                return $this->sendResponse($user, 'Password updated');
            }
            return $this->sendError('Please enter a valid user email.');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
