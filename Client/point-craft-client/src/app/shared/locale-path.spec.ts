import { localizePath, stripLocale } from './locale-path';
import { splitParagraphs } from './paragraphs';

describe('localizePath', () => {
  it('keeps Russian paths at the root', () => {
    expect(localizePath('/', 'ru')).toBe('/');
    expect(localizePath('/services/web-services', 'ru')).toBe('/services/web-services');
  });

  it('prefixes English paths with /en', () => {
    expect(localizePath('/', 'en')).toBe('/en');
    expect(localizePath('/projects/msys-music-workstation', 'en')).toBe('/en/projects/msys-music-workstation');
  });
});

describe('stripLocale', () => {
  it('maps both locales of a page to the same path', () => {
    expect(stripLocale('/')).toBe('/');
    expect(stripLocale('/en')).toBe('/');
    expect(stripLocale('/en/')).toBe('/');
    expect(stripLocale('/en/services/web-services')).toBe('/services/web-services');
    expect(stripLocale('/services/web-services')).toBe('/services/web-services');
  });

  it('drops the query string and fragment', () => {
    expect(stripLocale('/en#contact')).toBe('/');
    expect(stripLocale('/services/x?utm=1#faq')).toBe('/services/x');
  });

  it('does not treat paths that merely start with "en" as English', () => {
    expect(stripLocale('/engineering')).toBe('/engineering');
  });
});

describe('splitParagraphs', () => {
  it('splits on blank lines and joins wrapped lines', () => {
    expect(splitParagraphs('First line\nstill first.\n\n  Second.\r\n\r\nThird.')).toEqual([
      'First line still first.',
      'Second.',
      'Third.',
    ]);
  });

  it('returns nothing for empty text', () => {
    expect(splitParagraphs('')).toEqual([]);
  });
});
