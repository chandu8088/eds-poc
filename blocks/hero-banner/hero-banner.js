import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Decorates the authored image, title, and description within a hero banner.
 * @param {Element} block The hero banner block element
 */
export default function decorate(block) {
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
