debounce_timeout = null
debounce = (fn_to_debounce) ->
  return unless debounce_timeout == null
  debounce_timeout = setTimeout (->
    fn_to_debounce()
    debounce_timeout = null
  ), 150

String::capitalizeFirstLetter = ->
  @charAt(0).toUpperCase() + @slice(1)

hasClass = (element, className) ->
  if element.classList
    element.classList.contains className
  else
    !!element.className.match(new RegExp("(\\s|^)#{className}(\\s|$)"))

addClass = (element, className) ->
  if element.classList
    element.classList.add className
  else unless hasClass(element, className)
    element.className += " #{className}"




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


