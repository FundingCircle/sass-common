/* ---------------------------------------------------------------------- *\
  ICON FONT DEFINITIONS
\* ---------------------------------------------------------------------- */

@font-face {
  font-family: "fc-icons";
  src: url('../fonts/fc-icons.eot');
  src: url('../fonts/fc-icons.eot?#iefix') format('eot'),
    url('../fonts/fc-icons.woff') format('woff'),
    url('../fonts/fc-icons.ttf') format('truetype'),
    url('../fonts/fc-icons.svg#fc-icons') format('svg');
  font-weight: normal;
  font-style: normal;
}

.fci-icon {
  font-family: "fc-icons" !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-variant: normal !important;
  text-transform: none !important;
  speak: none;
  line-height: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[class^="fci-"]:before,
[class*=" fci-"]:before{
  @extend .fci-icon;
}

.fci-go-to-arrow:before { content: "\E001" }
.fci-menu-icon:before { content: "\E002" }
.fci-tick:before { content: "\E003" }
.fci-user-icon:before { content: "\E004" }


.list-checked > *:before,
.list-checked--reversed > *:before {
  @extend .fci-icon;
  @extend .fci-tick;
} 
