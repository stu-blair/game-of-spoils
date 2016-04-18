var numSpoilersBlocked;

numSpoilersBlocked = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
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
  } else {
    sendResponse({
      result: "failed to update"
    });
  }
  return true;
});
