var DEATH_NAMES, FACEBOOK_FEED_ELEMENTS_SELECTOR, GOOGLE_NEWS_FEED_ELEMENTS_SELECTOR, GOT_RELATED_SUBREDDITS, GOT_SUBREDDITS_REGEX, REDDIT_FEED_ELEMENTS_SELECTOR, SPOILER_WORDS_LIST, SPOILER_WORDS_REGEX, TWITTER_FEED_ELEMENTS_SELECTOR;

FACEBOOK_FEED_ELEMENTS_SELECTOR = '.userContentWrapper';

TWITTER_FEED_ELEMENTS_SELECTOR = "[data-item-type='tweet']";

GOOGLE_NEWS_FEED_ELEMENTS_SELECTOR = '.blended-wrapper';

REDDIT_FEED_ELEMENTS_SELECTOR = '.sitetable > .thing.link:visible';

SPOILER_WORDS_LIST = ['#got', 'asoiaf', 'baelish', 'baratheon', 'bolton', 'braavos', 'brienne', 'bronn', 'cersei', 'clegane', 'daenerys', 'game of thrones', 'gameofthrone', 'greyjoy', 'jon snow', 'khaleesi', 'lannister', 'littlefinger', 'melisandre', 'ned stark', 'sansa', 'stannis', 'targaryen', 'tarly', 'the hound', 'tyrell', 'tyrion', 'varys', 'viserys', 'westeros', 'wildling', 'winterfell'];

SPOILER_WORDS_REGEX = new RegExp(SPOILER_WORDS_LIST.join('|'), 'i');

DEATH_NAMES = ['was grimly beheaded for desertion', "was burned at the stake to appease R'hllor", 'was slowly poisoned over a period of many fortnights', 'was torn asunder by six direwolves', 'was incinerated by hot dragon breath', 'was slain by a shadow', 'was defeated during a trial by combat', 'was infected with greyscale and quarantined permanently', 'warged into a dead cat', 'was too far north when winter came', 'did not live through the Long Night', 'is dark and full of terrors', 'caught toxoplasmosis from Ser Pounce', 'was murdered by its very own nuncle', 'was impaled by a lance at a tournament by a lowly hedge knight'];

GOT_RELATED_SUBREDDITS = ['gameofthrones', 'asoiaf', 'iceandfire', 'agotboardgame', 'gamesofthrones', 'westeros', 'thronescomics', 'asongofmemesandrage', 'earthoficeandfire'];

GOT_SUBREDDITS_REGEX = new RegExp('(\/r\/)' + GOT_RELATED_SUBREDDITS.join('|'), 'i');
