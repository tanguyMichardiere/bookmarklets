const styleElement = document.createElement("style");
styleElement.type = "text/css";
styleElement.innerHTML =
  "*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}";
document.head.appendChild(styleElement);
for (const element of document.body.getElementsByTagName("*")) {
  element.onselectstart =
    element.ondragstart =
    element.ondrag =
    element.oncontextmenu =
    element.onmousedown =
    element.onmouseup =
      () => true;
  if (
    element instanceof HTMLInputElement &&
    ["text", "password", "email", "number", "tel", "url"].includes(
      element.type.toLowerCase()
    )
  ) {
    element.removeAttribute("disabled");
    element.onkeydown = element.onkeyup = () => true;
  }
}
