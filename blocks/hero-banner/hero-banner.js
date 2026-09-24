import { createOptimizedPicture } from '../../scripts/aem.js';
import { loadPlaceholders, moveInstrumentation } from '../../scripts/scripts.js';

function replacePlaceholderTokens(element, placeholders) {
  const tokenPattern = /{{([^}]+)}}/g;
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let textNode = walker.nextNode();
  while (textNode) {
    textNode.textContent = textNode.textContent.replace(tokenPattern, (token, key) => (
      placeholders[key.trim()] || token
    ));
    textNode = walker.nextNode();
  }
}

/**
 * Decorates the authored image, title, and description within a hero banner.
 * @param {Element} block The hero banner block element
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const imageRow = rows.find((row) => row.querySelector('picture'));
  const contentRow = rows.find((row) => row !== imageRow);
  const content = contentRow?.firstElementChild;
  if (!content) return;

  contentRow.classList.add('hero-banner-content-row');
  content.classList.add('hero-banner-content');

  const heading = content.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) heading.classList.add('hero-banner-title');

  const description = content.querySelector('p');
  if (description) description.classList.add('hero-banner-description');

  const placeholders = await loadPlaceholders();
  replacePlaceholderTokens(content, placeholders);

  const image = imageRow?.querySelector('picture > img');
  if (!image) return;

  imageRow.classList.add('hero-banner-image-row');
  const picture = createOptimizedPicture(image.src, image.alt, true, [
    { media: '(min-width: 900px)', width: '2000' },
    { width: '750' },
  ]);
  moveInstrumentation(image, picture.querySelector('img'));
  image.closest('picture').replaceWith(picture);
}
