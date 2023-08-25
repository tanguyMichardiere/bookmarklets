// credit: https://alanhogan.com/code/text-selection-bookmarklet

// create a style tag that sets 'user-select: text !important'
const styleElement = document.createElement("style");
styleElement.type = "text/css";
styleElement.innerHTML =
  "*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}";
document.head.appendChild(styleElement);

// disable select and mouse events on all elements in case selection was disabled via javascript
for (const element of document.body.getElementsByTagName("*")) {
  if (element instanceof HTMLElement) {
    element.onselectstart =
      element.ondragstart =
      element.ondrag =
      element.oncontextmenu =
      element.onmousedown =
      element.onmouseup =
        () => true;
  }

  // remove 'disabled' on input elements
  if (
    element instanceof HTMLInputElement &&
    ["text", "password", "email", "number", "tel", "url"].includes(element.type.toLowerCase())
  ) {
    element.removeAttribute("disabled");
    element.onkeydown = element.onkeyup = () => true;
  }
}
