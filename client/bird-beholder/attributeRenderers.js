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

/** Create element for tweet text
 * @param  {string} text
 * @returns {HTMLParagraphElement} Paragraph
 */
const generateTextElement = (text) => {
  const tweetText = document.createElement('p');
  tweetText.innerText = text;
  return tweetText;
};

/** Choose and build the media element for a single media item
 * @param {Media} tweet The tweet attributes
 * @returns {HTMLElement} Created element
 */
const determineMediaElement = ({ type, video_info, media_url_https }) => {
  switch (type) {
    case 'video':
      const video = document.createElement('video');
      const srcOptions = video_info.variants
        .map(
          ({ content_type, url }) =>
            `<source src="${url}" type="${content_type}">`,
        )
        .join('\n');
      video.innerHTML = srcOptions;
      video.controls = true;
      return video;

    case 'photo':
      const img = document.createElement('img');
      img.src = media_url_https;
      return img;

    default:
      console.warn('Unknown media type:', type);
      break;
  }
};

/** Generate the media components
 * @param  {Array<Media>} media
 * @returns {HTMLDivElement} Media elements in a container
 */
const generateTweetMedia = (media) => {
  const mediaElements = media.map((mediaItem) =>
    determineMediaElement(mediaItem),
  );
  console.log('mediaElements: ', mediaElements);
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('imageContainer');

  if (mediaElements.length > 1) {
    imageContainer.classList.add('multipleImages');
  }

  mediaElements.forEach((mediaElement) => {
    imageContainer.appendChild(mediaElement);
  });

  return imageContainer;
};

/** Convert tweet object to a list of elements
 * @param  {Tweet} tweet
 * @returns {Array<HTMLElement>} Tweet as HTML elements
 */
export const generateTweetMarkUp = ({ text, extended_entities }) => {
  const elements = [];

  if (extended_entities && extended_entities.media) {
    elements.push(generateTweetMedia(extended_entities.media));
  }

  if (text) {
    elements.push(generateTextElement(text));
  }

  return elements;
};
