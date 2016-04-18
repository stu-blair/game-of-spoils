sessionSpoilersBlocked  = 0

# TODO: fix this
# lifetimeSpoilersBlocked = 0
# chrome.storage.sync.get 'lifetimeSpoilersBlocked', (result) ->
#   if result.hasOwnProperty 'lifetimeSpoilersBlocked'
#     lifetimeSpoilersBlocked = parseInt(result.lifetimeSpoilersBlocked, 10) || 0
#   else
#     lifetimeSpoilersBlocked = 0
#   updateLifetimeSpoilersBlocked()



chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
  if request.newSpoilerBlocked
    sessionSpoilersBlocked += 1
    updateSessionSpoilersBlocked()
    # lifetimeSpoilersBlocked += 1
    # updateLifetimeSpoilersBlocked()


document.addEventListener 'DOMContentLoaded', ->
  setTimeout (->
    chrome.runtime.sendMessage { fetchPopupTotal: true }, (response) ->
      if response.newTotal
        sessionSpoilersBlocked = response.newTotal
        updateSessionSpoilersBlocked()
  ), 1


updateSessionSpoilersBlocked = ->
  newText = "#{sessionSpoilersBlocked} spoilers prevented in this session."
  document.getElementById('num-spoilers-prevented').textContent = newText

updateLifetimeSpoilersBlocked = ->
  newText = "#{lifetimeSpoilersBlocked} spoilers prevented since the Long Summer began."
  document.getElementById('lifetime-spoilers-prevented').textContent = newText
  return if lifetimeSpoilersBlocked == 0
  chrome.storage.sync.set lifetimeSpoilersBlocked: lifetimeSpoilersBlocked


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

