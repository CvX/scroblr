(function ($) {

	var plugin = scroblr.registerHost("bandcamp");

	plugin.init = function () {
		return this.hostre.test(document.location.hostname) ||
			document.body.innerHTML.match(/src="http:\/\/bandcamp.com\/cd_ui"/);
	};

	plugin.scrape = function () {
		var discover, info, isTrack, pageTitle;

		info = {
			stopped: !$(".inline_player .playbutton").hasClass("playing")
		}

		if (!info.stopped) {
			discover = window.location.pathname.slice(1) === "discover";

			if (discover) {
				info.artist = $("#detail_body_container .itemsubtext a").text();
			} else {
				info.artist = $("span[itemprop=byArtist]").text();
			}
			info.title    = $(".track_info .title").first().text();
			info.duration = scroblr.utilities.calculateDuration($(".inline_player .track_info .time_total").text());
			info.elapsed  = scroblr.utilities.calculateDuration($(".inline_player .track_info .time_elapsed").text());

			if (!info.title) {
				info.title = $(".trackTitle").first().text();
			}
		}

		return info;
	};
}(jQuery));
