# Bookmarklets

## allowTextSelection

```javascript
javascript:{var e=document.createElement("style");e.type="text/css",e.innerHTML="*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}",document.head.appendChild(e);var t=!0,n=!1,o=void 0;try{for(var r,a=document.body.getElementsByTagName("*")[Symbol.iterator]();!(t=(r=a.next()).done);t=!0){var l,u=r.value;u.onselectstart=u.ondragstart=u.ondrag=u.oncontextmenu=u.onmousedown=u.onmouseup=function(){return!0},l=HTMLInputElement,(null!=l&&"undefined"!=typeof Symbol&&l[Symbol.hasInstance]?!!l[Symbol.hasInstance](u):u instanceof l)&&["text","password","email","number","tel","url"].includes(u.type.toLowerCase())&&(u.removeAttribute("disabled"),u.onkeydown=u.onkeyup=function(){return!0})}}catch(e){n=!0,o=e}finally{try{t||null==a.return||a.return()}finally{if(n)throw o}}}
```

## openInMastodon

```javascript
javascript:{document.querySelectorAll("a[href='https://joinmastodon.org'], a[href='https://joinfirefish.org/']").length>0&&(location.href="https://mastodon.social/authorize_interaction?uri=".concat(encodeURIComponent(location.href)));}
```
