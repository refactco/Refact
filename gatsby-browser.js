// gatsby-browser.js

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  // Get the current path
  const { pathname } = location;

  // Scroll to top for all paths
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);

  // Restore scroll position for specific paths
  const shouldRestoreScrollPosition = ['/category/blog/', '/insight/']; // Add other paths here if needed

  if (shouldRestoreScrollPosition.some((path) => pathname.startsWith(path))) {
    const currentPosition = getSavedScrollPosition(location);
    setTimeout(() => {
      window.scrollTo(...(currentPosition || [0, 0]));
    }, 0);
  }

  return false;
};
