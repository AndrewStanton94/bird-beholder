/** Search the twitter user and gets their recent tweets
 * @param  {string} user The user to search for
 * @param  {Array<string>} filters Search operators to add to the query
 * @param  {number} count=20 How many results to return
 * @returns {Promise<JSON>} Tweet data
 */
const search = (user, filters, count = 20) => {
  const processedFilters = encodeURIComponent(JSON.stringify(filters));
  return fetch(`/search/user/${user}/${processedFilters}/${count}`).then(res =>
    res.json(),
  );
};

/** Builds the tweet elements
 * @param  {Array<object>} data List of tweets
 * @param  {HTMLElement} container The element to add the tweet to
 * @param {boolean} emptyContainer=false Should the container be cleared first?
 */
const renderTweets = (data, container, emptyContainer = false) => {
  if (emptyContainer) {
    container.innerHTML = '';
  }
  data.forEach(({ text, entities, extended_entities }) => {
    if (
      (entities && entities.media) ||
      (extended_entities && extended_entities.media)
    ) {
      const media = extended_entities.media[0] || entities.media[0];
      const { media_url_https, video_info } = media;

      const tweetElem = document.createElement('article');
      const tweetText = document.createElement('p');
      const tweetImage = document.createElement('img');

      tweetText.innerText = text;
      tweetImage.src = media_url_https;

      if (video_info) {
        console.log(video_info);

        const tweetVideo = document.createElement('video');
        tweetVideo.src = video_info.variants[0].url;
        tweetVideo.controls = true;
        tweetElem.appendChild(tweetVideo);
      } else {
        tweetElem.appendChild(tweetImage);
      }

      tweetElem.appendChild(tweetText);
      container.appendChild(tweetElem);
    } else {
      console.info("Doesn't have an image");
    }
  });
};

const run = e => {
  e.preventDefault();
  const searchUser = document.getElementById('twitterUser').value;
  const user = searchUser || 'CarlBovisNature';

  const filters = ['-filter:retweets'];

  const mediaType = document.getElementById('mediaSelection').value;
  console.log(mediaType);
  filters.push(`filter:${mediaType}`);

  search(user, filters).then(({ statuses }) => {
    const target = document.querySelector('#tweets');
    console.log(statuses);
    // truncated tweets don't have the media attribute
    const curatedStatuses = statuses.filter(({ truncated }) => !truncated);
    console.log(curatedStatuses);

    renderTweets(curatedStatuses, target);
  });
};

document.getElementById('searchOptions').addEventListener('submit', run);
