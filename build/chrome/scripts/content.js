var $document, exileTraitorousSpoiler, first_feed_elem_text, getDeathName, incrementBadgeNumber, initialize, initiateSpoilerBlocking, num_feed_elems, searchForAndBlockSpoilers, settings;

first_feed_elem_text = null;

num_feed_elems = null;

this.smaller_font_mode = false;

this.reddit_mode = false;

settings = {
  show_specific_words: true,
  spoiler_words_regex: null,
  execute_trailors: false
};

$document = $(document);

$document.ready(function() {
  return chrome.runtime.sendMessage({
    userPreferencesRequested: true
  }, (function(_this) {
    return function(response) {
      var extra_words_to_block;
      settings.show_specific_words = response.showSpecificWordEnabled;
      settings.execute_trailors = response.destroySpoilers;
      extra_words_to_block = response.extraWordsToBlock.split(',').map(function(word) {
        return word.trim().escapeRegex();
      }).filter(function(word) {
        return !!word;
      });
      settings.spoiler_words_regex = new RegExp(SPOILER_WORDS_LIST.concat(extra_words_to_block).join('|'), 'i');
      if (response.blockingEnabled) {
        return initialize();
      }
    };
  })(this));
});

incrementBadgeNumber = function() {
  return chrome.runtime.sendMessage({
    incrementBadge: true
  }, (function() {}));
};

getDeathName = function() {
  return DEATH_NAMES[Math.floor(Math.random() * DEATH_NAMES.length)];
};

initiateSpoilerBlocking = function(selector_string) {
  searchForAndBlockSpoilers(selector_string, true);
  return $document.scroll(function() {
    return debounce(function() {
      return searchForAndBlockSpoilers(selector_string);
    });
  });
};

searchForAndBlockSpoilers = (function(_this) {
  return function(feed_elements_selector, force_update) {
    var $new_feed_elems, new_first_text, new_length;
    $new_feed_elems = $(feed_elements_selector);
    if ($new_feed_elems.length === 0) {
      return;
    }
    new_length = $new_feed_elems.length;
    new_first_text = $new_feed_elems.first()[0].textContent;
    if (force_update || (new_length !== num_feed_elems) || (new_first_text !== first_feed_elem_text)) {
      cl("Updating potential spoilers, previously '" + num_feed_elems + "', now '" + new_length + "'.");
      first_feed_elem_text = new_first_text;
      num_feed_elems = new_length;
      return $new_feed_elems.each(function() {
        var matchedSpoiler;
        if (this.className.search(/true-and-leal|glamoured/) > -1) {
          return;
        }
        matchedSpoiler = this.textContent.match(settings.spoiler_words_regex);
        if (matchedSpoiler === null) {
          return addClass(this, 'true-and-leal');
        } else {
          return exileTraitorousSpoiler($(this), matchedSpoiler[0]);
        }
      });
    }
  };
})(this);

exileTraitorousSpoiler = function($traitor, dark_words_of_spoilage) {
  var $glamour, capitalized_spoiler_words, glamour_string, specific_words;
  incrementBadgeNumber();
  if (settings.execute_trailors) {
    $traitor.remove();
    return;
  }
  capitalized_spoiler_words = dark_words_of_spoilage.capitalizeFirstLetter();
  cl("A bespoiling traitor in our midst! the forbidden words hath been spake: '" + capitalized_spoiler_words + "'.");
  $traitor.addClass('glamoured');
  specific_words = settings.show_specific_words ? ", because it dared mention the phrase '" + capitalized_spoiler_words + "'" : "";
  glamour_string = "<div class='spoiler-glamour " + (this.smaller_font_mode ? 'small' : '') + " " + (this.reddit_mode ? 'redditized' : '') + "'> <h3 class='spoiler-obituary'>A potential spoiler here " + (getDeathName()) + specific_words + ".</h3> <h3 class='click-to-view-spoiler' >Click to view spoiler (!!!)</h3> </div>";
  $(glamour_string).appendTo($traitor);
  $glamour = $traitor.find('.spoiler-glamour');
  return $glamour.on('click', function(ev) {
    var specific_words_for_confirm;
    ev.stopPropagation();
    specific_words_for_confirm = settings.show_specific_words ? "mention of '" + capitalized_spoiler_words + "'" : "spoiler";
    if (!confirm("Are you sure you want to view this potentially spoiler-ific " + specific_words_for_confirm + "?")) {
      return;
    }
    $glamour.addClass('revealed');
    return setTimeout((function() {
      return $glamour.remove();
    }), 3500);
  });
};

initialize = (function(_this) {
  return function() {
    var url;
    url = window.location.href.toLowerCase();
    if (url.indexOf('facebook') > -1) {
      return initiateSpoilerBlocking(FACEBOOK_FEED_ELEMENTS_SELECTOR);
    } else if (url.indexOf('twitter') > -1) {
      _this.smaller_font_mode = true;
      return initiateSpoilerBlocking(TWITTER_FEED_ELEMENTS_SELECTOR);
    } else if (url.indexOf('news.google') > -1) {
      _this.smaller_font_mode = true;
      return initiateSpoilerBlocking(GOOGLE_NEWS_FEED_ELEMENTS_SELECTOR);
    } else if (url.indexOf('reddit.com') > -1) {
      _this.reddit_mode = true;
      if (url.search(GOT_SUBREDDITS_REGEX) === -1) {
        return initiateSpoilerBlocking(REDDIT_FEED_ELEMENTS_SELECTOR);
      }
    } else if (url.indexOf('avclub.com') > -1) {
      _this.smaller_font_mode = true;
      return initiateSpoilerBlocking(AVCLUB_FEED_ELEMENTS_SELECTOR);
    } else if (url.indexOf('slack.com') > -1) {
      _this.smaller_font_mode = true;
      return initiateSpoilerBlocking(SLACK_FEED_ELEMENTS_SELECTOR);
    } else if (url.indexOf('feedly.com') > -1) {
      _this.smaller_font_mode = true;
      return initiateSpoilerBlocking(FEEDLY_ELEMENTS_SELECTOR);
    } else if (url.indexOf('plus.google.com') > -1) {
      return initiateSpoilerBlocking(GOOGLE_PLUS_ELEMENTS_SELECTOR);
    } else if (url.indexOf('youtube.com') > -1) {
      _this.smaller_font_mode = true;
      return initiateSpoilerBlocking(YOUTUBE_ELEMENTS_SELECTOR);
    } else if (url.indexOf('buzzfeed.com') > -1) {
      _this.smaller_font_mode = true;
      return initiateSpoilerBlocking(BUZZFEED_ELEMENTS_SELECTOR);
    } else if (url.indexOf('gizmodo.co') > -1) {
      return initiateSpoilerBlocking(GIZMODO_ELEMENTS_SELECTOR);
    } else if (url.indexOf('tumblr.com') > -1) {
      return initiateSpoilerBlocking(TUMBLR_ELEMENTS_SELECTOR);
    }
  };
})(this);
