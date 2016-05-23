sessionSpoilersBlocked  = 0

document.addEventListener 'DOMContentLoaded', =>
  @blockingEnabledToggle  = document.getElementById 'blocking-enabled-toggle'
  @showSpecificWordToggle = document.getElementById 'show-specific-word-toggle'
  @extraWordsHolder       = document.getElementById 'extra-words-to-block'
  @blockingEnabledToggle.addEventListener  'change', storeUserPreferences
  @showSpecificWordToggle.addEventListener 'change', storeUserPreferences
  @extraWordsHolder.addEventListener 'keyup', storeUserPreferences

  $('.onoffswitch-switch').css 'background-image', 'url("assets/images/targaryen.png")'

  loadUserPreferencesAndUpdate()

  setTimeout (->
    chrome.runtime.sendMessage { fetchPopupTotal: true }, (response) ->
      if response.newTotal
        sessionSpoilersBlocked = response.newTotal
        updateSessionSpoilersBlocked()
  ), 1


loadUserPreferencesAndUpdate = =>
  loadUserPreferences =>
    @blockingEnabledToggle.checked  = @userPreferences.blockingEnabled
    @showSpecificWordToggle.checked = @userPreferences.showSpecificWordEnabled
    @extraWordsHolder.value         = @userPreferences.extraWordsToBlock

storeUserPreferences = =>
  data = {}
  data[DATA_KEY] = JSON.stringify {
    blockingEnabled: @blockingEnabledToggle.checked
    showSpecificWordEnabled: @showSpecificWordToggle.checked
    extraWordsToBlock: @extraWordsHolder.value
  }
  cl "Storing user preferences: #{data}"
  chrome.storage.sync.set data, (response) ->
    chrome.runtime.sendMessage { userPreferencesUpdated: true }, (->)

chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
  if request.newSpoilerBlocked
    sessionSpoilersBlocked += 1
    updateSessionSpoilersBlocked()
    # lifetimeSpoilersBlocked += 1
    # updateLifetimeSpoilersBlocked()

updateSessionSpoilersBlocked = ->
  newText = "#{sessionSpoilersBlocked} spoilers prevented in this session."
  document.getElementById('num-spoilers-prevented').textContent = newText



# TODO: fix this
# lifetimeSpoilersBlocked = 0
# chrome.storage.sync.get 'lifetimeSpoilersBlocked', (result) ->
#   if result.hasOwnProperty 'lifetimeSpoilersBlocked'
#     lifetimeSpoilersBlocked = parseInt(result.lifetimeSpoilersBlocked, 10) || 0
#   else
#     lifetimeSpoilersBlocked = 0
#   updateLifetimeSpoilersBlocked()



# updateLifetimeSpoilersBlocked = ->
#   newText = "#{lifetimeSpoilersBlocked} spoilers prevented since the Long Summer began."
#   document.getElementById('lifetime-spoilers-prevented').textContent = newText
#   return if lifetimeSpoilersBlocked == 0
#   chrome.storage.sync.set lifetimeSpoilersBlocked: lifetimeSpoilersBlocked


  # Googly analytics
  _gaq = _gaq or []
  _gaq.push [
    '_setAccount'
    'UA-64072033-1'
  ]
  _gaq.push [ '_trackPageview' ]
  do ->
    ga = document.createElement('script')
    ga.type = 'text/javascript'
    ga.async = true
    ga.src = 'https://ssl.google-analytics.com/ga.js'
    s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore ga, s

