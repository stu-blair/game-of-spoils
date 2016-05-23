# Ensures that a function called repeatedly only occurs a max of every 150 milliseconds
# (Used for checking for spoilers as the user scrolls)
debounce_timeout = null
debounce = (fn_to_debounce) ->
  return unless debounce_timeout == null
  debounce_timeout = setTimeout (->
    fn_to_debounce()
    debounce_timeout = null
  ), 150

# Pure-javascript (no jQuery) method of detecting if an element has a certain class
hasClass = (element, className) ->
  if element.classList
    element.classList.contains className
  else
    !!element.className.match(new RegExp("(\\s|^)#{className}(\\s|$)"))

# Pure-javascript (no jQuery) method of add a class to an element
addClass = (element, className) ->
  if element.classList
    element.classList.add className
  else unless hasClass(element, className)
    element.className += " #{className}"

String::capitalizeFirstLetter = ->
  @charAt(0).toUpperCase() + @slice(1)

String::escapeRegex = ->
  @.replace /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"

# Loads user preferences from chrome storage, setting default values
# if any preferences are undefined
loadUserPreferences = (callback) =>
   chrome.storage.sync.get DATA_KEY, (result) =>
    userPreferencesJSONString = result[DATA_KEY]
    if !userPreferencesJSONString
      @userPreferences = {
        blockingEnabled: true
        showSpecificWordEnabled: true
        extraWordsToBlock: ''
      }
    else
      @userPreferences = JSON.parse userPreferencesJSONString
      @userPreferences.blockingEnabled         = true unless @userPreferences.hasOwnProperty 'blockingEnabled'
      @userPreferences.showSpecificWordEnabled = true unless @userPreferences.hasOwnProperty 'showSpecificWordEnabled'
      @userPreferences.extraWordsToBlock       = ''   unless @userPreferences.hasOwnProperty 'extraWordsToBlock'
    callback() if callback



# --------------------------------------- #
# Debugging
# --------------------------------------- #

# Change this to 'true' to enable debugging output
GAME_O_SPOILERS_DEBUG_MODE = false

if GAME_O_SPOILERS_DEBUG_MODE
  log_timeout = undefined
  $('body').append '<div class="debug-floaty-thingy" ></div>'
  $log = $('body > .debug-floaty-thingy')

cl = (log_line) ->
  return unless GAME_O_SPOILERS_DEBUG_MODE
  console.log log_line
  $log.text log_line
  $log.addClass 'show'
  clearTimeout log_timeout
  log_timeout = setTimeout((->
    $log.removeClass 'show'
  ), 2000)


