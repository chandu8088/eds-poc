/**
 * Decorates the authored title and description within a hero banner.
 * @param {Element} block The hero banner block element
 */
export default function decorate(block) {
  const content = block.querySelector(':scope > div > div');
  if (!content) return;

  content.classList.add('hero-banner-content');

  const heading = content.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) heading.classList.add('hero-banner-title');

  const description = content.querySelector('p');
  if (description) description.classList.add('hero-banner-description');
}
