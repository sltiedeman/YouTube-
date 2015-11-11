
var queryTerm;
var videosBySamePoster = [];
angular.module('myApp', []).controller('myController', function($scope, $http){
	var videosBySamePoster = [];

	// var singleVideoUrl = 'https://www.googleapis.com/youtube/v3/videos?id='+videoId+'&part=snippet,statistics&key='+apiKey;
	$scope.videos = ""
	$scope.addVideo = function(){
		queryTerm = $scope.videoSearch;
		var apiKey = 'AIzaSyB4cvmIQgRWdLIHTUm_L3-KB4p3O62mTKY';
		var baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=';
		var searchUrl = queryTerm;
		var endUrl = '&key=';
		var totalUrl = baseUrl + searchUrl + endUrl + apiKey;
		$http.get(totalUrl).success(function(data) {
	      	$scope.videos = data.items;
	      	for(i=0; i<3; i++){
				var youTubeUrl = 'https://www.youtube.com/watch?v=';
				var videos = {
					vidtitle: $scope.videos[i].snippet.title,
					thumb: $scope.videos[i].snippet.thumbnails.url,
					url: youTubeUrl + $scope.videos[i].id.videoId,
					duration: "2:43:58",
					postedBy: "Stephen Tiedemann",
					totalViews: 100000
				}
				videosBySamePoster.push(videos);
			}
			populatePage();

    	});

	}

});
	


var otherVideos = [
	{
	    vidtitle: "The Best of Rachmaninoff",
	    thumb: "https://i.ytimg.com/vi/vpaPWuDQUcc/default.jpg",
	    url: "https://www.youtube.com/watch?v=vpaPWuDQUcc",
	    duration: "2:43:58",
	    postedBy: "Classical Music11",
	    totalViews: 857721
	}
];


// var videosBySamePoster = [
// 	{
// 	    vidtitle: "StarCraft II: Legacy of the Void Opening Cinematic",
// 	    thumb: "https://i.ytimg.com/vi_webp/M_XwzBMTJaM/default.webp",
// 	    url: "https://www.youtube.com/watch?v=M_XwzBMTJaM",
// 	    duration: "29:51",
// 	    postedBy: "StarCraft",
// 	    totalViews: 3927195
// 	}
// ];

var videohtml="";

$(document).ready(function(){
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

	addVideos();

function addVideos(){
	videohtml="";
	for(i=0; i<otherVideos.length; i++){
		var videoTitle = otherVideos[i].vidtitle;
		if(videoTitle.length > 55){
			var newTitle = videoTitle.slice(0, 54) + "...";	
		}else{
			var newTitle = videoTitle;
		}
		videohtml += '<div class = "more-videos-previews"><div class ="more-thumbnails"><a href=' + otherVideos[i].url + '><img src=';
		videohtml += otherVideos[i].thumb + '></a></div><div class="thumbnail-text">';
		videohtml += '<p class="video-title">' + newTitle + '</p><p>' + otherVideos[i].postedBy + '</p></div></div>';

	}
	$('#more-videos').html(videohtml);
}


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



})









