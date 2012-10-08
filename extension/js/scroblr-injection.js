var scroblr = (function ($, moment) {

	var currentTrack, activePlugin, Plugin, plugins, poller, Track, sendMessage;

	plugins = {};

	/**
	 * @constructor
	 * @private
	 */
	Plugin = function (name) {
		this.hostre = new RegExp(name + "\\.com", "i");
		this.name   = name;

		// Init method should return true or false depending on whether this
		// plugin matches the hostname
		this.init = function () {
			return this.hostre.test(document.location.hostname);
		};
	};

	/**
	 * @constructor
	 * @private
	 */
	Track = function (params) {
		$.extend(this, params);

		this.host     = activePlugin.name;
		this.hostid   = activePlugin.id;
		this.dateTime = moment().valueOf();

		if (this.hasOwnProperty("album")) {
			this.album = $.trim(this.album);
		}

		if (this.hasOwnProperty("artist")) {
			this.artist = $.trim(this.artist);
		}

		if (this.hasOwnProperty("title")) {
			this.title = $.trim(this.title);
		}
	};

	/**
	 * Calculates the duration of a track in milliseconds based on a time string
	 * (i.e. "01:24" or "-2:32")
	 *
	 * @param {string} timestring
	 */
	function calculateDuration(timestring) {
		var i, j, max, pow, seconds, timeSegments;

		seconds = 0;

		for (i = 0, max = arguments.length; i < max; i += 1) {
			if (arguments[i].toString()) {
				timeSegments = arguments[i].split(":");

				for (j = timeSegments.length - 1, pow = 0;
						 j >= 0 && j >= (timeSegments.length - 3);
						 j -= 1, pow += 1) {
					seconds += parseFloat(timeSegments[j].replace("-", "")) *
							Math.pow(60, pow);
				}
			}
		}

		return seconds * 1000;
	}

	/**
	 * @private
	 */
	function pollTrackInfo() {
		currentTrack = new Track(activePlugin.scrape());

		if (currentTrack.artist && currentTrack.title) {
			sendMessage("updateCurrentTrack", currentTrack);
		}
	}

	/**
	 * @private
	 */
	function registerPlugin(name) {
		plugins[name] = new Plugin(name);
		return plugins[name];
	}

	/**
	 * @param {string} name
	 * @param {object} message
	 * @private
	 */
	if (typeof chrome != "undefined") {
		sendMessage = function (name, message) {
			chrome.extension.sendMessage({
				name: name,
				message: message
			});
		};
	} else if (typeof safari != "undefined") {
		sendMessage = safari.self.tab.dispatchMessage;
	}

	/*
	 * Initialization on document ready
	 */
	$(function () {
		for (var key in plugins) {
			if (plugins.hasOwnProperty(key) && plugins[key].init()) {
				activePlugin    = plugins[key];
				activePlugin.id = activePlugin.name.toUpperCase() + moment().valueOf();
				poller  				= window.setInterval(pollTrackInfo, 5000);
				break;
			}
		}

		plugins = null;
	});

	return {
		registerPlugin: registerPlugin,
		utilities: {
			calculateDuration: calculateDuration
		}
	};
}(jQuery, moment));
