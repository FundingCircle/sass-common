/* ---------------------------------------------------------------------- *\
  ICON FONT DEFINITIONS
\* ---------------------------------------------------------------------- */

$fontPath: 'fonts/' !default;

@font-face {
  font-family: "<%= fontName %>";
  src: url('#{$fontPath}<%= fontName %>.eot');
  src: url('#{$fontPath}<%= fontName %>.eot?#iefix') format('eot'),
    url('#{$fontPath}<%= fontName %>.woff') format('woff'),
    url('#{$fontPath}<%= fontName %>.ttf') format('truetype'),
    url('#{$fontPath}<%= fontName %>.svg#<%= fontName %>') format('svg');
  font-weight: normal;
  font-style: normal;
}

.fci-icon:before {
  font-family: "<%= fontName %>" !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-variant: normal !important;
  text-transform: none !important;
  speak: none;
  line-height: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[class^="<%= className %>-"]:before,
[class*=" <%= className %>-"]:before {
  @extend .fci-icon;
}

<% _.each(glyphs, function(glyph) { %>.<%= className %>-<%= glyph.name %>:before { content: "\<%= glyph.codepoint.toString(16).toUpperCase() %>"; }
<% }); %>



/* ---------------------------------------------------------------------- *\
  SOURCE SANS
\* ---------------------------------------------------------------------- */



$sourceSans: (
  (
    name: black,
    folder: black,
    file: Black
  ),(
    name: black_italic,
    folder: black-italic,
    file: BlackItalic
  )
);


@each $item in $sourceSans {
  @font-face {
      font-family: 'source_sans_pro#{map-get($item, name)}';
      src: url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.eot');
      src: url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.eot?#iefix') format('embedded-opentype'),
           url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.woff2') format('woff2'),
           url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.woff') format('woff'),
           url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.ttf') format('truetype'),
           url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.svg#source_sans_problack_italic') format('svg');
      font-weight: normal;
      font-style: normal;

  }
}
