import { generateTweetMarkUp } from './attributeRenderers.js';

/**
 * @typedef {Object} VideoVariant
 * @property {string} content_type
 * @property {URL} url
 */

/**
 * @typedef {Object} VideoInfo
 * @property {Array<VideoVariant>} variants
 */

/**
 * @typedef {Object} Media
 * @property  {string} type
 * @property  {?VideoInfo} video_info
 * @property  {URL} media_url_https
 */

/**
 * @typedef {Object} Tweet The object representation of a tweet
 * @property {string} text
 * @property  {object} extended_entities
 * @property  {Array<Media>} extended_entities.media
 *
 */

const search = (user, filters, count = 20) => {
  const processedFilters = encodeURIComponent(JSON.stringify(filters));
  return fetch(`./search/user/${user}/${processedFilters}/${count}`).then((res) =>
    res.json(),
  );
};

/** Builds the tweet elements
 * @param  {Array<Tweet>} tweets List of tweets
 * @param  {HTMLElement} container The element to add the tweet to
 * @param {boolean} emptyContainer=false Should the container be cleared first?
 */
const renderTweets = (tweets, container, emptyContainer = false) => {
  if (emptyContainer) {
    container.innerHTML = '';
  }
  tweets.forEach((tweet) => {
    console.log(tweet);
    if (tweet && tweet.retweeted_status) {
      tweet = tweet.retweeted_status;
      console.log('Extracting tweet from retweet');
      console.log(tweet);
    }
    const elements = generateTweetMarkUp(tweet);
    const tweetElem = document.createElement('article');
    tweetElem.classList.add('tweet');

    console.log('Elements to append: ', elements);
    elements.forEach((elem) => {
      tweetElem.appendChild(elem);
    });
    container.appendChild(tweetElem);
  });
};

/**
 * @param  {Event} e Form Submission. Need to prevent default
 */
const run = (e) => {
  e.preventDefault();
  const searchUser = document.getElementById('twitterUser').value;
  const user = searchUser || 'CarlBovisNature';

    const filters = ['-filter:retweets'];

  const mediaType = document.getElementById('mediaSelection').value;
  console.log('media filter: ', mediaType);
  filters.push(`filter:${mediaType}`);

  const clearResults = document.getElementById('clearPreviousResults').checked;
  console.log('Will clear results: ', clearResults);

  search(user, filters).then(({ statuses }) => {
    const target = document.querySelector('#tweets');
    console.log(statuses);
    // truncated tweets don't have the media attribute
    const curatedStatuses = statuses.filter(({ truncated }) => !truncated);
    console.log(curatedStatuses);

    renderTweets(curatedStatuses, target, clearResults);
  });
};

document.getElementById('searchOptions').addEventListener('submit', run);
