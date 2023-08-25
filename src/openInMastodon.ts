if (
  document.querySelectorAll(
    "a[href='https://joinmastodon.org'], a[href='https://joinfirefish.org/']"
  ).length > 0
) {
  location.href = `https://mastodon.social/authorize_interaction?uri=${encodeURIComponent(
    location.href
  )}`;
}
