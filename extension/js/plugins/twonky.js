(function ($) {

	var plugin = scroblr.registerPlugin("twonky");

	plugin.scrape = function () {
		if ($(".meta_title").text()) {
			return {
				album:    $(".meta_album").text(),
				artist:   $(".meta_artist").text(),
				duration: scroblr.utilities.calculateDuration($(".meta_duration").text()),
				stopped:  $(".trackPlayerButtonIcon").hasClass("play"),
				title:    $(".meta_title").text()
			};
		}
	};
}(jQuery));
