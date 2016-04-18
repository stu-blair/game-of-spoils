var exileTraitorousSpoiler, first_feed_elem_text, getDeathName, incrementBadgeNumber, initiateSpoilerBlocking, num_feed_elems, reddit_mode, searchForAndBlockSpoilers, smaller_font_mode, url;

first_feed_elem_text = null;

num_feed_elems = null;

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
  return $(document).scroll(function() {
    return debounce(function() {
      return searchForAndBlockSpoilers(selector_string);
    });
  });
};

searchForAndBlockSpoilers = function(feed_elements_selector, force_update) {
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
      matchedSpoiler = this.textContent.match(SPOILER_WORDS_REGEX);
      if (matchedSpoiler === null) {
        return addClass(this, 'true-and-leal');
      } else {
        return exileTraitorousSpoiler($(this), matchedSpoiler[0]);
      }
    });
  }
};

exileTraitorousSpoiler = function($traitor, dark_words_of_spoilage) {
  var $glamour, capitalized_spoiler_words, glamour_string;
  capitalized_spoiler_words = dark_words_of_spoilage.capitalizeFirstLetter();
  cl("A bespoiling traitor in our midst! the forbidden words hath been spake: '" + capitalized_spoiler_words + "'.");
  $traitor.addClass('glamoured');
  glamour_string = "<div class='spoiler-glamour " + (smaller_font_mode ? 'small' : void 0) + " " + (reddit_mode ? 'redditized' : void 0) + "'> <h3 class='spoiler-obituary'>A potential spoiler here " + (getDeathName()) + ", because it dared mention the phrase '" + capitalized_spoiler_words + "'.</h3> <h3 class='click-to-view-spoiler' >Click to view spoiler (!!!)</h3> </div>";
  $(glamour_string).appendTo($traitor);
  incrementBadgeNumber();
  $glamour = $traitor.find('.spoiler-glamour');
  return $glamour.on('click', function() {
    if (!confirm("Are you sure you want to view this potentially spoiler-ific mention of '" + capitalized_spoiler_words + "'?")) {
      return;
    }
    $glamour.addClass('revealed');
    return setTimeout((function() {
      return $glamour.remove();
    }), 3500);
  });
};

url = window.location.href.toLowerCase();

if (url.indexOf('facebook') > -1) {
  initiateSpoilerBlocking(FACEBOOK_FEED_ELEMENTS_SELECTOR);
} else if (url.indexOf('twitter') > -1) {
  smaller_font_mode = true;
  initiateSpoilerBlocking(TWITTER_FEED_ELEMENTS_SELECTOR);
} else if (url.indexOf('news.google') > -1) {
  smaller_font_mode = true;
  initiateSpoilerBlocking(GOOGLE_NEWS_FEED_ELEMENTS_SELECTOR);
} else if (url.indexOf('reddit.com') > -1) {
  reddit_mode = true;
  if (url.search(/(\/r\/)gameofthrones|asoiaf|iceandfire|agotboardgame|gamesofthrones|westeros|thronescomics/) === -1) {
    initiateSpoilerBlocking(REDDIT_FEED_ELEMENTS_SELECTOR);
  }
}
