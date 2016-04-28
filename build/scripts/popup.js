var loadUserPreferencesAndUpdate, sessionSpoilersBlocked, storeUserPreferences, updateSessionSpoilersBlocked;

sessionSpoilersBlocked = 0;

document.addEventListener('DOMContentLoaded', (function(_this) {
  return function() {
    _this.blockingEnabledToggle = document.getElementById('blocking-enabled-toggle');
    _this.showSpecificWordToggle = document.getElementById('show-specific-word-toggle');
    _this.blockingEnabledToggle.addEventListener('change', storeUserPreferences);
    _this.showSpecificWordToggle.addEventListener('change', storeUserPreferences);
    $('.onoffswitch-switch').css('background-image', 'url("assets/images/targaryen.png")');
    loadUserPreferencesAndUpdate();
    return setTimeout((function() {
      return chrome.runtime.sendMessage({
        fetchPopupTotal: true
      }, function(response) {
        if (response.newTotal) {
          sessionSpoilersBlocked = response.newTotal;
          return updateSessionSpoilersBlocked();
        }
      });
    }), 1);
  };
})(this));

loadUserPreferencesAndUpdate = (function(_this) {
  return function() {
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
      }
      _this.blockingEnabledToggle.checked = _this.userPreferences.blockingEnabled;
      return _this.showSpecificWordToggle.checked = _this.userPreferences.showSpecificWordEnabled;
    });
  };
})(this);

storeUserPreferences = (function(_this) {
  return function() {
    var data;
    data = {};
    data[DATA_KEY] = JSON.stringify({
      blockingEnabled: _this.blockingEnabledToggle.checked,
      showSpecificWordEnabled: _this.showSpecificWordToggle.checked
    });
    return chrome.storage.sync.set(data, function(response) {
      return chrome.runtime.sendMessage({
        userPreferencesUpdated: true
      }, (function() {}));
    });
  };
})(this);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.newSpoilerBlocked) {
    sessionSpoilersBlocked += 1;
    return updateSessionSpoilersBlocked();
  }
});

updateSessionSpoilersBlocked = function() {
  var _gaq, newText;
  newText = sessionSpoilersBlocked + " spoilers prevented in this session.";
  document.getElementById('num-spoilers-prevented').textContent = newText;
  _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-64072033-1']);
  _gaq.push(['_trackPageview']);
  return (function() {
    var ga, s;
    ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    s = document.getElementsByTagName('script')[0];
    return s.parentNode.insertBefore(ga, s);
  })();
};
