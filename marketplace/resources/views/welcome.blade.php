<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mav Market</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <!-- React root DOM -->
    <div id="root">
    </div>
    <!-- React JS -->
    <script type="text/javascript" src="{{mix('/js/app.js')}}"></script>
</body>
</html>