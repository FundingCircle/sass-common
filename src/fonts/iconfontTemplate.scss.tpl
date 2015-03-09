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
  ( folder: black,                file: Black,              weight: 800,  style: normal ),
  ( folder: black-italic,         file: BlackItalic,        weight: 800,  style: italic ),
  ( folder: bold,                 file: Bold,               weight: 700,  style: normal ),
  ( folder: bold-italic,          file: BoldItalic,         weight: 700,  style: italic ),
  ( folder: extra-light,          file: ExtraLight,         weight: 200,  style: normal ),
  ( folder: extra-light-italic,   file: ExtraLightItalic,   weight: 200,  style: italic ),
  ( folder: italic,               file: Italic,             weight: 400,  style: italic ),
  ( folder: light,                file: Light,              weight: 300,  style: normal ),
  ( folder: light-italic,         file: LightItalic,        weight: 300,  style: italic ),
  ( folder: regular,              file: Regular,            weight: 400,  style: normal ),
  ( folder: semi-bold,            file: Semibold,           weight: 600,  style: normal ),
  ( folder: semi-bold-italic,     file: SemiboldItalic,     weight: 600,  style: italic )
);


@each $item in $sourceSans {
  @font-face {
      font-family: 'Source Sans Pro';
      src: url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.eot');
      src: url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.eot?#iefix') format('embedded-opentype'),
           url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.woff2') format('woff2'),
           url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.woff') format('woff'),
           url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.ttf') format('truetype'),
           url('#{$fontPath}fonts/#{map-get($item, folder)}/SourceSansPro-#{map-get($item, file)}-webfont.svg#source_sans_problack_italic') format('svg');
      font-weight: map-get($item, weight);
      font-style: map-get($item, style);

  }
}
