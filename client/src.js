const user = 'CarlBovisNature';

// const filters = ['filter:images', '-filter:retweets'];
const filters = ['filter:media', '-filter:retweets'];
// const filters = ['filter:native_video', '-filter:retweets'];
const processedFilters = encodeURIComponent(JSON.stringify(filters));
fetch(`/search/user/${user}/${processedFilters}/20`)
  .then(res => res.json())
  .then(({ statuses }) => {
    const target = document.querySelector('#tweets');
    console.log(statuses);
    statuses.forEach(({ text, entities, extended_entities }) => {
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
        target.appendChild(tweetElem);
      } else {
        console.info("Doesn't have an image");
      }
    });
  });
