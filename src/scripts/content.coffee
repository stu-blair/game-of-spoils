first_feed_elem_text = null
num_feed_elems       = null

incrementBadgeNumber = ->
  chrome.runtime.sendMessage { incrementBadge: true }, (->)


getDeathName = ->
  DEATH_NAMES[Math.floor(Math.random() * DEATH_NAMES.length)]


initiateSpoilerBlocking = (selector_string) ->
  searchForAndBlockSpoilers selector_string, true
  $(document).scroll ->
    debounce -> searchForAndBlockSpoilers(selector_string)


searchForAndBlockSpoilers = (feed_elements_selector, force_update) ->
  $new_feed_elems = $(feed_elements_selector)
  return if $new_feed_elems.length == 0
  new_length      = $new_feed_elems.length
  new_first_text  = $new_feed_elems.first()[0].textContent
  if force_update || (new_length != num_feed_elems) || (new_first_text != first_feed_elem_text)
    cl "Updating potential spoilers, previously '#{num_feed_elems}', now '#{new_length}'."
    first_feed_elem_text = new_first_text
    num_feed_elems       = new_length
    $new_feed_elems.each ->
      # Ignore elements that are already glamoured or already designated safe
      return if @className.search(/true-and-leal|glamoured/) > -1
      # Search textContent of the element to see if it contains any spoilers
      matchedSpoiler = @textContent.match SPOILER_WORDS_REGEX
      if matchedSpoiler == null
        addClass this, 'true-and-leal'
      else
        exileTraitorousSpoiler $(this), matchedSpoiler[0]


exileTraitorousSpoiler = ($traitor, dark_words_of_spoilage) ->
  capitalized_spoiler_words = dark_words_of_spoilage.capitalizeFirstLetter()
  cl "A bespoiling traitor in our midst! the forbidden words hath been spake: '#{capitalized_spoiler_words}'."
  $traitor.addClass 'glamoured'
  glamour_string = "<div class='spoiler-glamour #{if smaller_font_mode then 'small'} #{if reddit_mode then 'redditized'}'>
                      <h3 class='spoiler-obituary'>A potential spoiler here #{getDeathName()}, because it dared mention the phrase '#{capitalized_spoiler_words}'.</h3>
                      <h3 class='click-to-view-spoiler' >Click to view spoiler (!!!)</h3>
                    </div>"
  $(glamour_string).appendTo $traitor
  incrementBadgeNumber()
  $glamour = $traitor.find '.spoiler-glamour'
  $glamour.on 'click', ->
    return unless confirm "Are you sure you want to view this potentially spoiler-ific mention of '#{capitalized_spoiler_words}'?"
    $glamour.addClass 'revealed'
    setTimeout (-> $glamour.remove()), 3500


# Initialize page-specific spoiler-blocking, if page is supported
url = window.location.href.toLowerCase()
if url.indexOf('facebook') > -1
  initiateSpoilerBlocking FACEBOOK_FEED_ELEMENTS_SELECTOR

else if url.indexOf('twitter') > -1
  smaller_font_mode = true
  initiateSpoilerBlocking TWITTER_FEED_ELEMENTS_SELECTOR

else if url.indexOf('news.google') > -1
  smaller_font_mode = true
  initiateSpoilerBlocking GOOGLE_NEWS_FEED_ELEMENTS_SELECTOR

else if url.indexOf('reddit.com') > -1
  reddit_mode = true
  if url.search(GOT_SUBREDDITS_REGEX) == -1
    initiateSpoilerBlocking REDDIT_FEED_ELEMENTS_SELECTOR
