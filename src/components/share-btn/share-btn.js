import React, { useState } from "react";

const ShareButton = ({postUrl, postTitle, }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2000); // Hide tooltip after 2 seconds
    });
  };
  return (
    <div className="c-share is-sticky">
      <ul className="s-share">
        <li>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} aria-label="Share on linkedin" rel="noreferrer" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M5.783 4.167a1.667 1.667 0 1 1-3.334-.002 1.667 1.667 0 0 1 3.334.002Zm.05 2.9H2.499V17.5h3.334V7.067Zm5.266 0H7.783V17.5h3.283v-5.475c0-3.05 3.975-3.333 3.975 0V17.5h3.292v-6.608c0-5.142-5.884-4.95-7.267-2.425l.033-1.4Z"/></svg>
          </a>
        </li>
        <li>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=+${encodeURIComponent(postUrl)}&quote=${encodeURIComponent(postTitle)}`} aria-label="Share on facebook" rel="noreferrer" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M11.665 11.25h2.084l.833-3.333h-2.917V6.25c0-.858 0-1.667 1.667-1.667h1.25v-2.8a23.472 23.472 0 0 0-2.38-.116c-2.263 0-3.87 1.38-3.87 3.916v2.334h-2.5v3.333h2.5v7.083h3.333V11.25Z"/></svg>
          </a>
        </li>
        <li>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`} aria-label="Share on twitter" rel="noreferrer" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="m14.74 2.552-4.162 4.76-3.6-4.76H1.762l6.23 8.147-5.904 6.75h2.528l4.557-5.209 3.984 5.208h5.085l-6.495-8.586 5.52-6.31h-2.526Zm-.886 13.384L4.714 3.985h1.502l9.038 11.95h-1.4Z"/></svg>
          </a>
        </li>
        <li className="c-copy-link-container">
          <button
            type="button"
            onClick={copyToClipboard}
            aria-label="Copy Link"
            className="c-link-copy"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="m14.714 12.357-1.179-1.179L14.715 10A3.334 3.334 0 0 0 10 5.286L8.822 6.464l-1.18-1.178L8.82 4.107a5 5 0 0 1 7.07 7.071l-1.177 1.179Zm-2.357 2.357-1.178 1.178a5 5 0 0 1-7.071-7.07l1.178-1.179 1.178 1.179L5.286 10A3.333 3.333 0 1 0 10 14.714l1.178-1.178 1.179 1.178Zm0-8.25 1.179 1.18-5.893 5.89-1.179-1.177 5.893-5.893Z"/></svg>
          </button>
          {tooltipVisible && <span className="c-link-tooltip">Link copied!</span>}
        </li>
        <li>
          <a href={`mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent(postUrl)}`} aria-label="Share via email" rel="noreferrer" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M2.501 2.5h15a.833.833 0 0 1 .834.833v13.334a.834.834 0 0 1-.834.833h-15a.833.833 0 0 1-.833-.833V3.333a.833.833 0 0 1 .833-.833Zm14.167 3.532-6.607 5.916-6.726-5.935v9.82h13.333V6.032ZM3.76 4.167l6.292 5.551 6.201-5.551H3.76Z"/></svg>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ShareButton;
