(function ($) {

	var plugin = scroblr.registerPlugin("pandora");

	plugin.scrape = function () {
		return {
			album:    $("#playerBar .playerBarAlbum").text(),
			artist:   cleanseArtist($("#playerBar .playerBarArtist").text()),
			duration: scroblr.utilities.calculateDuration($("#playbackControl .elapsedTime").text(), $("#playbackControl .remainingTime").text()),
			elapsed:  scroblr.utilities.calculateDuration($("#playbackControl .elapsedTime").text()),
			stopped:  $("#playerBar .playButton").is(":visible"),
			title:    $("#playerBar .playerBarSong").text()
		};
	};

	function cleanseArtist (string) {
		var artist = stripChildrensLabel(string);
		return stripHolidayLabel(artist);
	}

	function stripChildrensLabel (string) {
		return string.replace(/\s+\(Children's\)$/i, "");
	}

	function stripHolidayLabel (string) {
		return string.replace(/\s+\(Holiday\)$/i, "");
	}
}(jQuery));
