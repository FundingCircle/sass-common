/* ---------------------------------------------------------------------- *\
  ICON FONT DEFINITIONS
\* ---------------------------------------------------------------------- */

@font-face {
  font-family: "<%= fontName %>";
  src: url('<%= fontPath %><%= fontName %>.eot');
  src: url('<%= fontPath %><%= fontName %>.eot?#iefix') format('eot'),
    url('<%= fontPath %><%= fontName %>.woff') format('woff'),
    url('<%= fontPath %><%= fontName %>.ttf') format('truetype'),
    url('<%= fontPath %><%= fontName %>.svg#<%= fontName %>') format('svg');
  font-weight: normal;
  font-style: normal;
}

.fci-icon {
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
[class*=" <%= className %>-"]:before{
  @extend .fci-icon;
}

<% _.each(glyphs, function(glyph) { %>.<%= className %>-<%= glyph.name %>:before { content: "\<%= glyph.codepoint.toString(16).toUpperCase() %>" }
<% }); %>

.list-checked > *:before,
.list-checked--reversed > *:before,
.form-checkbox tt {
  @extend .fci-icon;
  @extend .fci-tick;
} 

.tooltip_close {
  @extend .fci-icon;
  @extend .fci-close;
}
