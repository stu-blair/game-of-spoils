var loadUserPreferencesAndUpdate, numSpoilersBlocked;

numSpoilersBlocked = 0;

this.userPreferences = {};

loadUserPreferencesAndUpdate = (function(_this) {
  return function() {
    return chrome.storage.sync.get(DATA_KEY, function(result) {
      return _this.userPreferences = JSON.parse(result[DATA_KEY]);
    });
  };
})(this);

loadUserPreferencesAndUpdate();

chrome.runtime.onMessage.addListener((function(_this) {
  return function(request, sender, sendResponse) {
    if (request.incrementBadge) {
      numSpoilersBlocked += 1;
      chrome.browserAction.setBadgeText({
        text: "" + numSpoilersBlocked
      });
      chrome.runtime.sendMessage({
        newSpoilerBlocked: true
      }, function() {
        return sendResponse({
          result: "successfully updated"
        });
      });
    } else if (request.fetchPopupTotal) {
      sendResponse({
        newTotal: numSpoilersBlocked
      });
    } else if (request.userPreferencesUpdated) {
      loadUserPreferencesAndUpdate();
    } else if (request.userPreferencesRequested) {
      sendResponse(_this.userPreferences);
    } else {
      sendResponse({
        result: "failed to update"
      });
    }
    return true;
  };
})(this));
