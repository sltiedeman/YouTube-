
var queryTerm;
var videosBySamePoster = [];
var otherVideos = [];
var apiKey = 'AIzaSyB4cvmIQgRWdLIHTUm_L3-KB4p3O62mTKY';
var baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=';
var youTubeUrl = 'https://www.youtube.com/watch?v=';


angular.module('myApp', []).controller('myController', function($scope, $sce, $http){
	$scope.mainUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/RUz_EXSmp9w');
	var videosBySamePoster = [];

	// var singleVideoUrl = 'https://www.googleapis.com/youtube/v3/videos?id='+videoId+'&part=snippet,statistics&key='+apiKey;
	$scope.videos = "";

	moreVideosUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=8&key=';
	moreVideosUrl += 'AIzaSyB4cvmIQgRWdLIHTUm_L3-KB4p3O62mTKY';
	$http.get(moreVideosUrl).success(function(data){
		$scope.popularVideos = data.items;
		console.log($scope.popularVideos);
		$scope.videoList = [];
		for(i=0; i < 8; i++){
			var videoTitle = $scope.popularVideos[i].snippet.title;
			if(videoTitle.length > 55){
					var newTitle = videoTitle.slice(0, 54) + "...";	
				}else{
					var newTitle = videoTitle;
				}
			var videos = {
				vidtitle: newTitle,
				thumb: $scope.popularVideos[i].snippet.thumbnails.default.url,
				url: youTubeUrl + $scope.popularVideos[i].id,
				postedBy: $scope.popularVideos[i].snippet.channelTitle,
			}
			$scope.videoList.push(videos);
		}
		console.log($scope.videoList);

	})



	$scope.addVideo = function(){
		//building the url to get the data object
		queryTerm = $scope.videoSearch;
		var searchUrl = queryTerm;
		var endUrl = '&key=';
		var totalUrl = baseUrl + searchUrl + endUrl + apiKey;
		videosBySamePoster = [];

		//run this function when user submits a search
		$http.get(totalUrl).success(function(data) {
			var videohtml = "";
	      	$scope.videos = data.items;
	      	//this is the main video to go on the page
	      	var makeMainUrl = "https://www.youtube.com/embed/" + $scope.videos[0].id.videoId;
	      	var mainVideoHtml = '<iframe width="100%" height="300px" src="' + makeMainUrl + '" ';
	      	mainVideoHtml += 'frameborder="0" allowfullscreen></iframe>';
	      	mainVideoHtml += '<p></p><span>' + $scope.videos[0].snippet.title + '</span>';
	      	mainVideoHtml += '<p>by ' + $scope.videos[0].snippet.channelTitle + '</p';
	      	$('#video').html(mainVideoHtml);

	      	console.log($scope.videos);
	      	for(i=1; i<4; i++){	      		
				var videos = {
					vidtitle: $scope.videos[i].snippet.title,
					thumb: $scope.videos[i].snippet.thumbnails.default.url,
					url: youTubeUrl + $scope.videos[i].id.videoId,
					duration: "2:43:58",
					postedBy: $scope.videos[i].snippet.channelTitle,
					totalViews: 100000
				}
				console.log(videos.url);
				videosBySamePoster.push(videos);
			}
			console.log(videosBySamePoster);
			for(i=0; i<videosBySamePoster.length; i++){
			var videoTitle = videosBySamePoster[i].vidtitle;
			if(videoTitle.length > 50){
				var newTitle = videoTitle.slice(0, 49) + "...";	
			}else{
				var newTitle = videoTitle;
			}
			videohtml +='<div class="thumbnail"><a href=' + videosBySamePoster[i].url + '><img src=' + videosBySamePoster[i].thumb + '></a></div>';
			videohtml +='<div class="feature-minis"' + ' id="feature-minis-"' + i + '><span class="video-title">' + newTitle + '</span>';
			videohtml += '<p>by ' + videosBySamePoster[i].postedBy + '</p>';
			videohtml += '<p>Duration: ' + videosBySamePoster[i].duration + '</p>';
			videohtml += '<p>Views: ' + videosBySamePoster[i].totalViews + '<p></div>';
	}
	$('#featured-previews').html(videohtml);
    	});

	}

});
	





	

	




	$('#form-submit').submit(function(){
		
		var newObject = {
			vidtitle: $('#vidtitle').val(),
			postedBy: $('#postedBy').val(),
			thumb: $('#thumb').val(),
			url: $('#url').val()		

		}
		otherVideos.unshift(newObject);
		otherVideos.pop();
		addVideos();
		event.preventDefault();
		$('#myModal2').modal('hide');

	})












