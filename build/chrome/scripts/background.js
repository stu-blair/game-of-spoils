var numSpoilersBlocked;

numSpoilersBlocked = 0;

this.userPreferences = {};

loadUserPreferences();

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
      return true;
    } else if (request.fetchPopupTotal) {
      sendResponse({
        newTotal: numSpoilersBlocked
      });
      return false;
    } else if (request.userPreferencesUpdated) {
      loadUserPreferences();
      return false;
    } else if (request.userPreferencesRequested) {
      loadUserPreferences(function() {
        return sendResponse(_this.userPreferences);
      });
      return true;
    } else {
      sendResponse({
        result: "failed to update"
      });
      return false;
    }
  };
})(this));
