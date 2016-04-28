numSpoilersBlocked = 0
@userPreferences = {}
loadUserPreferences()




chrome.runtime.onMessage.addListener (request, sender, sendResponse) =>

  if request.incrementBadge
    numSpoilersBlocked += 1
    chrome.browserAction.setBadgeText text: "#{numSpoilersBlocked}"
    chrome.runtime.sendMessage {newSpoilerBlocked: true}, ->
      sendResponse {result: "successfully updated"}
    return true

  else if request.fetchPopupTotal
    sendResponse {newTotal: numSpoilersBlocked}
    return false

  else if request.userPreferencesUpdated
    loadUserPreferences()
    return false

  else if request.userPreferencesRequested
    loadUserPreferences =>
      sendResponse @userPreferences
    return true

  else
    sendResponse {result: "failed to update"}
    return false


