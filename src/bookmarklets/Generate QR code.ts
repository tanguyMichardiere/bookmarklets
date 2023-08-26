// credit: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/

window.open(
  `http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(location.href)}`,
  "qr",
  "location=no,status=yes,menubar=no,scrollbars=no,resizable=yes,width=500,height=500,modal=yes,dependent=yes",
);
