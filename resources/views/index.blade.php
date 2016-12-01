<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1" user-scalable=no”>
	<title>Vision</title>
	<link rel="stylesheet" type="text/css" href="dist/css/app.css">
    <link rel="stylesheet" href="https://cdn.plyr.io/2.0.11/plyr.css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
</head>
<body>
<div class="container"></div>
<script type="text/javascript">

	window.App = {
	    user: {
	        id: '{{ $userId }}'
	    },

	    api: '{{ $apiKey }}'
	};


</script>
<script src="https://cdn.plyr.io/2.0.11/plyr.js"></script>
<script src="https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js"></script>
<script src="dist/js/app.js"></script>
</body>
</html>