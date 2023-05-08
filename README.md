# Personal Website

### Project Structure

The idea is to create styled [html elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element). Then, create individual components based on them which will be used site wide.

A glimpse into the `src` folder :
- layouts :
  - BaseLayout.astro contains [main root](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#main_root), [doc metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#document_metadata) and [sectioning root](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#sectioning_root).
- components :
  - Content has styled [content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning).
  - Text has styled [text content elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#text_content).
  - InlineText has styled [inline text elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#inline_text_semantics).
  - Multimedia has styled [multimedia resources](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#image_and_multimedia).
  - Embedded has styed [Embedded content](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#embedded_content).
  - Misc contains [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg). [table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) and [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details).

[scripting](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#scripting), [demarcating edits](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#demarcating_edits) and [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms) elements are not included yet.


