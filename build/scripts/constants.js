var AVCLUB_FEED_ELEMENTS_SELECTOR, DATA_KEY, DEATH_NAMES, FACEBOOK_FEED_ELEMENTS_SELECTOR, GOOGLE_NEWS_FEED_ELEMENTS_SELECTOR, GOT_RELATED_SUBREDDITS, GOT_SUBREDDITS_REGEX, REDDIT_FEED_ELEMENTS_SELECTOR, SLACK_FEED_ELEMENTS_SELECTOR, SPOILER_WORDS_LIST, SPOILER_WORDS_REGEX, TWITTER_FEED_ELEMENTS_SELECTOR;

DATA_KEY = 'game-of-spoils';

FACEBOOK_FEED_ELEMENTS_SELECTOR = '.userContentWrapper';

TWITTER_FEED_ELEMENTS_SELECTOR = "[data-item-type='tweet']";

GOOGLE_NEWS_FEED_ELEMENTS_SELECTOR = '.blended-wrapper';

REDDIT_FEED_ELEMENTS_SELECTOR = '.sitetable > .thing.link:visible';

AVCLUB_FEED_ELEMENTS_SELECTOR = '.item, article.short';

SLACK_FEED_ELEMENTS_SELECTOR = 'ts-message';

SPOILER_WORDS_LIST = ['#got', 'arya stark', 'asoiaf', 'azor ahai', 'baelish', 'baratheon', 'bloodraven', 'braavos', 'brienne of tarth', 'bran stark', 'casterly rock', 'cersei', 'd.b. weiss', 'sandor clegane', 'daenerys', 'david benioff', 'davos seaworth', 'dornish', 'dothraki', 'dreadfort', 'game of thrones', 'gameofthrone', 'greyjoy', 'highgarden', 'house bolton', 'house stark', 'house tyrell', 'howland reed', 'jojen reed', 'jon snow', 'khaleesi', "king's landing", 'ady stonehea', 'lannisport', 'lannister', 'littlefinger', 'meereen', 'melisandre', 'myrcella', 'olenna tyrell', 'podrick payne', 'queen of thorns', 'ramsay bolton', 'roose bolton', 'ned stark', 'sansa stark', 'sothoryos', 'targaryen', 'tower of joy', 'tyrion', 'vaes dothrak', 'viserys', 'westeros', 'walder frey', 'wildling', 'winterfell', 'white walker', 'whitewalker'];

SPOILER_WORDS_REGEX = new RegExp(SPOILER_WORDS_LIST.join('|'), 'i');

DEATH_NAMES = ['was grimly beheaded for desertion', "was burned at the stake to appease R'hllor", 'was slowly poisoned over a period of many fortnights', 'was torn asunder by six direwolves', 'was incinerated by hot dragon breath', 'was slain by a shadow', 'was defeated during a trial by combat', 'was infected with greyscale and quarantined permanently', 'warged into a dead cat', 'was too far north when winter came', 'did not live through the Long Night', 'is dark and full of terrors', 'caught toxoplasmosis from Ser Pounce', 'was murdered by its very own nuncle', 'was impaled by a lance at a tournament by a lowly hedge knight'];

GOT_RELATED_SUBREDDITS = ['gameofthrones', 'asoiaf', 'iceandfire', 'agotboardgame', 'gamesofthrones', 'westeros', 'thronescomics', 'asongofmemesandrage', 'earthoficeandfire'];

GOT_SUBREDDITS_REGEX = new RegExp('(\/r\/)' + GOT_RELATED_SUBREDDITS.join('|'), 'i');
