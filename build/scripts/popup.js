var sessionSpoilersBlocked, updateLifetimeSpoilersBlocked, updateSessionSpoilersBlocked;

sessionSpoilersBlocked = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.newSpoilerBlocked) {
    sessionSpoilersBlocked += 1;
    return updateSessionSpoilersBlocked();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  return setTimeout((function() {
    return chrome.runtime.sendMessage({
      fetchPopupTotal: true
    }, function(response) {
      if (response.newTotal) {
        sessionSpoilersBlocked = response.newTotal;
        return updateSessionSpoilersBlocked();
      }
    });
  }), 1);
});

updateSessionSpoilersBlocked = function() {
  var newText;
  newText = sessionSpoilersBlocked + " spoilers prevented in this session.";
  return document.getElementById('num-spoilers-prevented').textContent = newText;
};

updateLifetimeSpoilersBlocked = function() {
  var _gaq, newText;
  newText = lifetimeSpoilersBlocked + " spoilers prevented since the Long Summer began.";
  document.getElementById('lifetime-spoilers-prevented').textContent = newText;
  if (lifetimeSpoilersBlocked === 0) {
    return;
  }
  chrome.storage.sync.set({
    lifetimeSpoilersBlocked: lifetimeSpoilersBlocked
  });
  _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-64072033-1']);
  _gaq.push(['_trackPageview']);
  return (function() {
    var ga, s;
    ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    s = document.getElementsByTagName('script')[0];
    return s.parentNode.insertBefore(ga, s);
  })();
};
