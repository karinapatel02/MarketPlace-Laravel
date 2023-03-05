<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordReset extends Mailable
{
    use Queueable, SerializesModels;
    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        $address = 'marketplace@rxr8071.uta.cloud';
        $subject = 'MavMarke Passsword!';
        $name = 'Marketplace';
        return $this->view('reset_password')
            ->from($address, $name)
            ->replyTo($address, $name)
            ->subject($subject)
            ->with(['name' => $this->data['name'], 'email' => $this->data['email']]);
    }
}
