<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1" user-scalable=no”>
    <title>Vision</title>
    <link rel="stylesheet" type="text/css" href="/dist/css/app.css">
    <link rel="stylesheet" href="https://cdn.plyr.io/2.0.11/plyr.css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
</head>
<body>
<div class="container">

    <h2>Recommendations for user {{$user}}</h2>

    <div class="row">

        @foreach($programmes as $programme)
            <div class="col-md-3 text-center center-block">
                <img src="@if($programme->poster == "N/A" || preg_match("/imdb/g", $programme->poster))/no_poster.jpg
               @else
                {{$programme->poster}}
                @endif"
                     class="img-responsive center-block"
                     style="width:
               50px;
               height: 100px;">
                <p>
                    {{$programme->programme_name}}
                </p>
            </div>
        @endforeach

    </div>
</div>

</body>
</html>