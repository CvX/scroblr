(function ($) {

	var plugin = scroblr.registerPlugin("grooveshark");

	plugin.scrape = function () {
		return {
			album:    $("#playerDetails_nowPlaying .album").attr("title"),
			artist:   $("#playerDetails_nowPlaying .artist").attr("title"),
			duration: scroblr.utilities.calculateDuration($("#player #player_duration").text()),
			stopped:  $("#player #player_play_pause").hasClass("play"),
			title:    $("#playerDetails_nowPlaying .currentSongLink").attr("title")
		};
	};
}(jQuery));
