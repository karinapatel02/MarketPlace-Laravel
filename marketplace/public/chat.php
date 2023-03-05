<html>

<head>

  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" type="text/css" rel="stylesheet" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.3/socket.io.js" integrity="sha512-Jr0UIR/Q8MUX+93zjDOhuDUKLqJZObtwpkLJQcR9qMaLgL0thet39IORuavUaZFkZ8a4ktrUsKPM9mf5LWMduA==" crossorigin="anonymous"></script>
  <!-- <link rel="stylesheet" href="../css/app.css" /> -->
  <title>Mav Market</title>
  <script>
    var server = "http://10.182.226.247:8001";
    var io = io(server);
    var myName = "";
    var otherPersonName = "";
    var auth = "";

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        console.log(results);
         return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // var myName = getParameterByName('uname');

    function enterName() {
      // myName = document.getElementById("name").value;
      myName = getParameterByName('uname');
      io.emit("user_connected", myName);

      alert("You are connected");
      return false;
    }

    function sendMessage() {
      var message = document.getElementById("message").value;
      io.emit("send_message", {
        "sender": myName,
        "receiver": otherPersonName,
        "message": message
      });

      var html = "";
      html += '<div class="outgoing_msg">';
      html += '<div class="sent_msg">';
      html += '<p>' + message + '</p>';
      html += '</div>';
      html += '</div>';
      document.getElementById("messages").innerHTML += html;

      document.getElementById("message").value = "";

      return false;
    }

    io.on("message_received", function(data) {

      if(data.receiver == myName) {
      
      var html = "";
      html += '<div class="incoming_msg">';
      html += '<div class="incoming_msg_img"> <img src="/images/usericon.webp" alt="user"> </div>';
      html += '<div class="received_msg">';
      html += '<div class="received_withd_msg">';
      html += '<p>' + data.message + '</p>';
      html += '</div>';
      html += '</div>';
      html += '</div>';

      document.getElementById("messages").innerHTML += html;
      document.getElementById("form-send-message").style.display = "";
      document.getElementById("messages").style.display = "";
      otherPersonName = data.sender; 

    }});

    function onUserSelected(self) {
      document.getElementById("form-send-message").style.display = "";
      document.getElementById("messages").style.display = "";
      document.getElementById("messages").innerHTML = "";
      otherPersonName = self.getAttribute("data-username");

      $.ajax({
        url: server + "/get_messages",
        method: "POST",
        data: {
          "sender": myName,
          "receiver": otherPersonName
        },
        success: function(response) {
          console.log(response);
          var messages = JSON.parse(response);
          var html = "";

          for (var a = 0; a < messages.length; a++) {

            if (messages[a].sender == myName) {
              html += '<div class="outgoing_msg">';
              html += '<div class="sent_msg">';
              html += '<p>' + messages[a].message + '</p>';
              html += '</div>';
              html += '</div>';
            } else {
              html += '<div class="incoming_msg">';
              html += '<div class="incoming_msg_img"> <img src="/images/usericon.webp" alt="user"> </div>';
              html += '<div class="received_msg">';
              html += '<div class="received_withd_msg">';
              html += '<p>' + messages[a].message + '</p>';
              html += '</div>';
              html += '</div>';
              html += '</div>';
            }

          }

          document.getElementById("messages").innerHTML = html;
        }
      });
    }

    io.on("user_connected", function(username) {

      var html = "";
      html += '<div class="chat_list" data-username="' + username + '" onclick="onUserSelected(this);">';
      html += '<div class="chat_people">';
      html += '<div class="chat_img"> <img src="/images/usericon.webp" alt="user"> </div>';
      html += '<div class="chat_ib">';
      html += '<h5>' + username + '</h5>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      document.getElementById("users").innerHTML += html;
    });

    function checkAuth(){
      var auth = getParameterByName('isLI');

      if (auth != "b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b") {
        window.location.replace("/login");
        // console.log(auth);

        
      }
    }
  </script>

</head>

<body onload="checkAuth();">
<div class="header">
            <a href="/" class="site-title" style="font-weight: 'bold'; color: 'white'; font-size: 30 ">Mav Market</Link>
            <div class="header-right">
                <a href="/home" style=" color: 'white' " >Home</a>
                <a href="/about" style=" color: 'white' "" >About</a>
                <a href="/service" style=" color: 'white' " >Service</a>
                <a href="http://dmp4205.uta.cloud/mavmarket/blog/" style=" color: 'white' " >Blog</a>
                <a href="/contact" style=" color: 'white' " >Contact</a>
                <a href="/login" style=" color: 'white' " >Login/Register</a>
            </div>
</div>

  <div class="container">
    <h3 class=" text-center">Chat</h3>
    <div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Online Users</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">


                <form onsubmit="return enterName();">
                  <!-- <input id="name" type="text" class="search-bar" placeholder="Enter name"> -->
                  <span class="input-group-addon">
                    <button type="submit"> <i class="fa fa-plus" aria-hidden="true"></i> </button>
                  </span>
                </form>


              </div>
            </div>
          </div>
          <div class="inbox_chat" id="users">

          </div>
        </div>
        <div class="mesgs">
          <div class="msg_history" id="messages">

          </div>
          <div class="type_msg">
            <div class="input_msg_write">

              <form onsubmit="return sendMessage();" style="display: none;" id="form-send-message">
                <input id="message" type="text" class="write_msg" placeholder="Type a message" />
                <button class="msg_send_btn" type="submit"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
              </form>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div id="footer" class="footer">
                <div class="footer-left">
                    <h2>Office Address</h2>
                    <p>701 S. Nedderman Drive <br />
                        Arlington, TX 76019 <br />
                        817-272-2090</p>
                    <address>
                        Email: <a target="popup" href="mailto:mavmarket@uta.edu">mavmarketplace@uta.edu</a><br />
                    </address>
                </div>
                <div class="footer-right">
                    <p>Copyright &copy; 2022 <a href="/">
                        Mav Market</a><br />
                        Part of CSE 5335 002 Web Data Management</p>
                </div>
            </div>

  <style>
    body {
  margin: 0;
  font-family: Optima, sans-serif;
  background-image: linear-gradient(to top, #7292b6 0%, #daf6f4fa 100%);
  background-repeat: no-repeat;
  opacity: .95;
  min-height: 100vh;
  position: relative;
}

.header {
  overflow: hidden;
  background-color: #284562;
  padding: 15px 10px;
}

.header a {
  float: left;
  color: white;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  font-family: inherit;
  line-height: 25px;
  border-radius: 4px;
}

.header a.logo {
  font-size: 25px;
  font-family: inherit;
  font-weight: bold;
}

.header a:hover {
  background-color: #ddd;
  color: black;
}

.header a.active {
  background-color: dodgerblue;
  color: white;
}

.header ul {
  padding-left: 5px;
  padding-right: 5px;
}

.header-right {
  float: right;
}

.footer {
  overflow: hidden;
  background-color: #5e5757e0;
  color: white;
  height: auto;
  padding: 15px 10px;
  height: relative;
  bottom: 0;
  width: 100%;
}

.footer-left {
  float: left;
  padding-left: 15px;
  padding-bottom: 15px;
}

.footer-right {
  float: right;
  padding-top: 125px;
  font-size: 10px;
  padding-right: 15px;
  padding-bottom: 8px;
}

    .container {
      max-width: 1170px;
      margin: auto;
      margin-top: 50px;
    }

    img {
      max-width: 100%;
    }

    .inbox_people {
      background: #f8f8f8 none repeat scroll 0 0;
      float: left;
      overflow: hidden;
      width: 40%;
      border-right: 1px solid #c4c4c4;
    }

    .inbox_msg {
      border: 1px solid #c4c4c4;
      clear: both;
      overflow: hidden;
    }

    .top_spac {
      margin: 20px 0 0;
    }


    .recent_heading {
      float: left;
      width: 40%;
    }

    .srch_bar {
      display: inline-block;
      text-align: right;
      width: 60%;
      padding: 10px
    }

    .headind_srch {
      padding: 10px 29px 10px 20px;
      overflow: hidden;
      border-bottom: 1px solid #c4c4c4;
    }

    .recent_heading h4 {
      color: #05728f;
      font-size: 21px;
      margin: auto;
    }

    .srch_bar input {
      border: 1px solid #cdcdcd;
      border-width: 0 0 1px 0;
      width: 80%;
      padding: 2px 0 4px 6px;
      background: none;
    }

    .srch_bar .input-group-addon button {
      background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
      border: medium none;
      padding: 0;
      color: #707070;
      font-size: 18px;
    }

    .srch_bar .input-group-addon {
      margin: 0 0 0 -27px;
    }

    .chat_ib h5 {
      font-size: 15px;
      color: #464646;
      margin: 0 0 8px 0;
    }

    .chat_ib h5 span {
      font-size: 13px;
      float: right;
    }

    .chat_ib p {
      font-size: 14px;
      color: #989898;
      margin: auto
    }

    .chat_img {
      float: left;
      width: 11%;
    }

    .chat_ib {
      float: left;
      padding: 0 0 0 15px;
      width: 88%;
    }

    .chat_people {
      overflow: hidden;
      clear: both;
    }

    .chat_list {
      border-bottom: 1px solid #c4c4c4;
      margin: 0;
      padding: 18px 16px 10px;
    }

    .inbox_chat {
      height: 550px;
      overflow-y: scroll;
    }

    .active_chat {
      background: #ebebeb;
    }

    .incoming_msg_img {
      display: inline-block;
      width: 6%;
    }

    .received_msg {
      display: inline-block;
      padding: 0 0 0 10px;
      vertical-align: top;
      width: 92%;
      margin: 26px 0 26px;
    }

    .received_withd_msg p {
      background: #ebebeb none repeat scroll 0 0;
      border-radius: 3px;
      color: #646464;
      font-size: 14px;
      margin: 0;
      padding: 5px 10px 5px 12px;
      width: 100%;
    }

    .time_date {
      color: #747474;
      display: block;
      font-size: 12px;
      margin: 8px 0 0;
    }

    .received_withd_msg {
      width: 57%;
    }

    .mesgs {
      float: left;
      padding: 30px 15px 0 25px;
      width: 60%;
    }

    .sent_msg p {
      background: #05728f none repeat scroll 0 0;
      border-radius: 3px;
      font-size: 14px;
      margin: 0;
      color: #fff;
      padding: 5px 10px 5px 12px;
      width: 100%;
    }

    .outgoing_msg {
      overflow: hidden;
      margin: 26px 0 26px;
    }

    .sent_msg {
      float: right;
      width: 46%;
    }

    .input_msg_write input {
      background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
      border: medium none;
      color: #4c4c4c;
      font-size: 15px;
      min-height: 48px;
      width: 100%;
    }

    .type_msg {
      border-top: 1px solid #c4c4c4;
      position: relative;
    }

    .msg_send_btn {
      background: #05728f none repeat scroll 0 0;
      border: medium none;
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      font-size: 17px;
      height: 33px;
      position: absolute;
      right: 0;
      top: 11px;
      width: 33px;
    }

    .messaging {
      padding: 0 0 50px 0;
    }

    .msg_history {
      height: 516px;
      overflow-y: auto;
    }
  </style>

</body>

</html>
