(function ($) {

	var plugin = scroblr.registerPlugin("amazon");

	plugin.scrape = function () {
		return {
			artist:   $("#nowPlayingSection .currentSongDetails .title").next().text().substring(3),
			duration: scroblr.utilities.calculateDuration($("#nowPlayingSection .currentSongStatus #currentTime").next().next().text()),
			stopped:  $("#mp3Player .mp3Player-MasterControl .mp3MasterPlayGroup").hasClass("paused"),
			title:    $("#nowPlayingSection .currentSongDetails .title").text()
		};
	};
}(jQuery));
