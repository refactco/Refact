import React, { useState, useEffect } from 'react';

const SharePage = ({postUrl, postTitle, }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const linkToCopy = postUrl; // Replace with your actual link

    // Use the Clipboard API to copy the link
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        setIsCopied(true);
      })
      .catch(error => {
        console.error('Failed to copy:', error);
        setIsCopied(false);
      });
  };

  useEffect(() => {
    let hideTextTimer;

    if (isCopied) {
      hideTextTimer = setTimeout(() => {
        setIsCopied(false);
      }, 8000); // 8 seconds in milliseconds
    }

    return () => {
      // Clear the timer when the component unmounts or when isCopied changes
      clearTimeout(hideTextTimer);
    };
  }, [isCopied]);
  return (
    <ul className="s-share">
      <li>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`} aria-label="Share on twitter" rel="noreferrer" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24"><path fill="#2E9E62" d="M24 4.6c-.9.4-1.8.7-2.8.8 1-.6 1.8-1.6 2.2-2.7-1 .6-2 1-3.1 1.2-.9-1-2.2-1.6-3.6-1.6-2.7 0-4.9 2.2-4.9 4.9 0 .4 0 .8.1 1.1-4.2-.2-7.8-2.2-10.2-5.2-.5.8-.7 1.6-.7 2.5 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.2-.6v.1c0 2.4 1.7 4.4 3.9 4.8-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 2 2.4 3.4 4.6 3.4-1.7 1.3-3.8 2.1-6.1 2.1-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.2 7.5 2.2 9.1 0 14-7.5 14-14v-.6c1-.7 1.8-1.6 2.5-2.5Z"/></svg>
        </a>
      </li>
      <li>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=+${encodeURIComponent(postUrl)}&quote=${encodeURIComponent(postTitle)}`} aria-label="Share on facebook" rel="noreferrer" target="_blank">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24"><path fill="#2E9E62" d="M9.032 23 9 13H5V9h4V6.5C9 2.789 11.298 1 14.61 1c1.585 0 2.948.118 3.345.17v3.88H15.66c-1.8 0-2.15.856-2.15 2.112V9h5.241l-2 4h-3.24v10H9.032Z"/></svg>
        </a>
      </li>
      <li>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} aria-label="Share on linkedin" rel="noreferrer" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24"><g clip-path="url(#share-page-a)"><path fill="#2E9E62" d="M23 0H1C.4 0 0 .4 0 1v22c0 .6.4 1 1 1h22c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1ZM7.1 20.5H3.6V9h3.6v11.5h-.1ZM5.3 7.4c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.2-.9 2.1-2.1 2.1Zm15.2 13.1h-3.6v-5.6c0-1.3 0-3-1.8-3-1.9 0-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2Z"/></g><defs><clipPath id="share-page-a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>
        </a>
      </li>
      <li>
        <button className='c-link-copy' aria-label="Copy Link" onClick={copyToClipboard}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24"><path fill="#2E9E62" d="M14.242 9.758a6.01 6.01 0 0 0-1.659-1.169A1.99 1.99 0 0 0 12 10c0 .213.04.415.102.608.259.161.505.343.726.564A3.977 3.977 0 0 1 14 14a3.978 3.978 0 0 1-1.171 2.829l-3 2.999c-1.512 1.512-4.146 1.512-5.657 0A3.973 3.973 0 0 1 3 17c0-1.068.416-2.072 1.171-2.828l2.104-2.104A8.05 8.05 0 0 1 6 10c0-.162.013-.323.023-.483-.089.079-.18.156-.266.241l-3 3A5.959 5.959 0 0 0 1 17c0 1.603.624 3.109 1.757 4.242A5.96 5.96 0 0 0 7 23a5.96 5.96 0 0 0 4.243-1.758l3-2.999A5.967 5.967 0 0 0 16 14a5.96 5.96 0 0 0-1.758-4.242Z"/><path fill="#2E9E62" d="M21.243 2.758A5.96 5.96 0 0 0 17 1a5.96 5.96 0 0 0-4.243 1.758l-3 2.999A5.967 5.967 0 0 0 8 10c0 1.603.624 3.109 1.757 4.242a6.01 6.01 0 0 0 1.659 1.169c.376-.377.584-.879.584-1.411 0-.218-.041-.425-.106-.622a3.7 3.7 0 0 1-.721-.55A3.974 3.974 0 0 1 10 10c0-1.068.416-2.073 1.171-2.829l3-2.999A3.975 3.975 0 0 1 17 3c1.068 0 2.073.416 2.829 1.172A3.976 3.976 0 0 1 21 7a3.976 3.976 0 0 1-1.171 2.828l-2.107 2.107C17.9 12.601 18 13.292 18 14c0 .162-.012.322-.021.482.089-.079.18-.155.265-.24l3-3A5.962 5.962 0 0 0 23 7a5.959 5.959 0 0 0-1.757-4.242Z"/></svg>
        </button>
      </li>
      {isCopied ? (
        <p className='c-share-text'>Link copied to clipboard!</p>
      ) : null}
    </ul>
  );
};

export default SharePage;
