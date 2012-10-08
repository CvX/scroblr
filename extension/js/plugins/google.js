(function ($) {

	var plugin = scroblr.registerPlugin("google");

	plugin.scrape = function () {
		return {
			artist:   $("#playerArtist .fade-out-content").attr("title"),
			duration: scroblr.utilities.calculateDuration($("#duration").text()),
			stopped:  $("#playPause").attr("title") === "Play",
			title:    $("#playerSongTitle .fade-out-content").attr("title")
		};
	};
}(jQuery));
