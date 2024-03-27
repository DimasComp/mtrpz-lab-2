import { assert } from 'chai';
import { convertMarkdown } from './functions.js';

describe('convertMarkdown', () => {
  it('should convert Markdown to HTML', () => {
    const markdown = 'Hello\n\nThis is **Markdown**';
    const html = convertMarkdown(markdown, 'html');
    assert.include(html, '<p>Hello</p>\n<p>This is <b>Markdown</b></p>');
  });

  it('should convert Markdown to stdout', () => {
    const markdown = 'Hello\n\nThis is **Markdown**';
    const out = convertMarkdown(markdown, 'stdout');
    assert.include(out, 'Hello\n\nThis is \x1b[1mMarkdown\x1b[0m');
  });

  it('should throw an error for unknown format', () => {
    const markdown = 'Hello\n\nThis is **Markdown**';
    assert.throws(() => convertMarkdown(markdown, 'unknown'), 'Unknown format');
  });

  it('should throw an error for nested tags', () => {
    const markdown = 'Hello\n\nThis is _Mark **do** wn_ ';
    assert.throws(() => convertMarkdown(markdown, 'html'), 'Nested tags are not allowed');
  });
});