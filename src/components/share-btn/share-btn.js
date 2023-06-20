import React from "react";

const ShareButton = ({postUrl, postTitle, }) => {
  return (
    <div className="c-share is-sticky">
      <ul className="s-share">
        <li>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`} aria-label="Share on twitter" rel="noreferrer" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 21" fill="none"><path fill="currentColor" d="M18.717 5.77a7.14 7.14 0 0 1-2.05.575 3.582 3.582 0 0 0 1.566-1.983 7.2 7.2 0 0 1-2.266.875c-.659-.717-1.584-1.133-2.634-1.133a3.57 3.57 0 0 0-3.558 3.575c0 .283.033.558.092.816A10.162 10.162 0 0 1 2.5 4.762a3.537 3.537 0 0 0-.483 1.792c0 1.241.625 2.341 1.591 2.966a3.536 3.536 0 0 1-1.625-.416v.025a3.578 3.578 0 0 0 2.867 3.508 3.516 3.516 0 0 1-1.608.058 3.567 3.567 0 0 0 3.333 2.484 7.101 7.101 0 0 1-4.442 1.533c-.283 0-.566-.017-.85-.05a10.12 10.12 0 0 0 5.484 1.608c6.566 0 10.175-5.45 10.175-10.175 0-.158 0-.308-.009-.466.7-.5 1.3-1.134 1.784-1.859Z"/></svg>
          </a>
        </li>
        <li>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} aria-label="Share on linkedin" rel="noreferrer" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 21" fill="none"><path fill="currentColor" d="M15.833 3.27A1.666 1.666 0 0 1 17.5 4.937v11.666a1.666 1.666 0 0 1-1.667 1.667H4.167A1.667 1.667 0 0 1 2.5 16.603V4.937A1.667 1.667 0 0 1 4.167 3.27h11.666Zm-.416 12.917V11.77A2.717 2.717 0 0 0 12.7 9.053c-.708 0-1.533.434-1.933 1.084v-.925H8.442v6.975h2.325v-4.109a1.163 1.163 0 1 1 2.325 0v4.109h2.325ZM5.733 7.903a1.4 1.4 0 0 0 1.4-1.4 1.405 1.405 0 1 0-1.4 1.4Zm1.159 8.284V9.212H4.583v6.975h2.309Z"/></svg>
          </a>
        </li>
        <li>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=+${encodeURIComponent(postUrl)}&quote=${encodeURIComponent(postTitle)}`} aria-label="Share on facebook" rel="noreferrer" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 21" fill="none"><path fill="currentColor" fillRule="evenodd" d="M2 10.815c0 3.977 2.889 7.284 6.667 7.955v-5.778h-2V10.77h2V8.992c0-2 1.288-3.11 3.111-3.11.577 0 1.2.088 1.777.177v2.044h-1.022c-.978 0-1.2.489-1.2 1.112v1.555h2.134l-.356 2.222h-1.778v5.778C15.111 18.1 18 14.793 18 10.815c0-4.425-3.6-8.045-8-8.045s-8 3.62-8 8.045Z" clipRule="evenodd"/></svg>	
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ShareButton;
