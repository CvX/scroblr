(function ($) {

	var plugin = scroblr.registerPlugin("jango");

	plugin.scrape = function () {
		return {
			artist:   $("#player_info #player_current_artist").contents().last().text(),
			duration: scroblr.utilities.calculateDuration($("#player_info #timer").text().substring(1)),
			stopped:  $("#btn-playpause").hasClass("pause"),
			title:    $("#player_info #current-song").text().replace(/^\s+/, "").replace(/\s+$/, "")
		};
	};
}(jQuery));
