# Personal Website

### Project Structure

The idea is to create styled [html elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element). Then, create individual components based on them which will be used site wide.

A glimpse into the `src` folder :
- layouts :
  - BaseLayout.astro contains [main root](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#main_root), [doc metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#document_metadata) and [sectioning root](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#sectioning_root).
- components :
  - ContentSectioning has styled [content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning).
  - TextContent has styled [text content elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#text_content).
