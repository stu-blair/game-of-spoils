var $log, GAME_O_SPOILERS_DEBUG_MODE, addClass, cl, debounce, debounce_timeout, hasClass, loadUserPreferences, log_timeout;

debounce_timeout = null;

debounce = function(fn_to_debounce) {
  if (debounce_timeout !== null) {
    return;
  }
  return debounce_timeout = setTimeout((function() {
    fn_to_debounce();
    return debounce_timeout = null;
  }), 150);
};

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

hasClass = function(element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  } else {
    return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
  }
};

addClass = function(element, className) {
  if (element.classList) {
    return element.classList.add(className);
  } else if (!hasClass(element, className)) {
    return element.className += " " + className;
  }
};

loadUserPreferences = (function(_this) {
  return function(callback) {
    return chrome.storage.sync.get(DATA_KEY, function(result) {
      var userPreferencesJSONString;
      userPreferencesJSONString = result[DATA_KEY];
      if (!userPreferencesJSONString) {
        _this.userPreferences = {
          blockingEnabled: true,
          showSpecificWordEnabled: true
        };
      } else {
        _this.userPreferences = JSON.parse(userPreferencesJSONString);
        if (!_this.userPreferences.hasOwnProperty('blockingEnabled')) {
          _this.userPreferences.blockingEnabled = true;
        }
        if (!_this.userPreferences.hasOwnProperty('showSpecificWordEnabled')) {
          _this.userPreferences.showSpecificWordEnabled = true;
        }
      }
      if (callback) {
        return callback();
      }
    });
  };
})(this);

GAME_O_SPOILERS_DEBUG_MODE = false;

if (GAME_O_SPOILERS_DEBUG_MODE) {
  log_timeout = void 0;
  $('body').append('<div class="debug-floaty-thingy" ></div>');
  $log = $('body > .debug-floaty-thingy');
}

cl = function(log_line) {
  if (!GAME_O_SPOILERS_DEBUG_MODE) {
    return;
  }
  console.log(log_line);
  $log.text(log_line);
  $log.addClass('show');
  clearTimeout(log_timeout);
  return log_timeout = setTimeout((function() {
    return $log.removeClass('show');
  }), 2000);
};
