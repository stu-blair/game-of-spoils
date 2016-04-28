numSpoilersBlocked = 0
@userPreferences = {}

loadUserPreferencesAndUpdate =  =>
  chrome.storage.sync.get DATA_KEY, (result) =>
    @userPreferences = JSON.parse result[DATA_KEY]

loadUserPreferencesAndUpdate()




chrome.runtime.onMessage.addListener (request, sender, sendResponse) =>

  if request.incrementBadge
    numSpoilersBlocked += 1
    chrome.browserAction.setBadgeText text: "#{numSpoilersBlocked}"
    chrome.runtime.sendMessage {newSpoilerBlocked: true}, ->
      sendResponse {result: "successfully updated"}

  else if request.fetchPopupTotal
    sendResponse {newTotal: numSpoilersBlocked}

  else if request.userPreferencesUpdated
    loadUserPreferencesAndUpdate()

  else if request.userPreferencesRequested
    sendResponse @userPreferences

  else
    sendResponse {result: "failed to update"}

  return true
