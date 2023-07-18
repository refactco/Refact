import React from "react";
import { useSiteMetadata } from "../../hooks/use-site-metadata";
import sanitizeHtml from "sanitize-html";

const Seo = ({ title, description, pathname, featuredImage, children }) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl } = useSiteMetadata()

  const sanitizedDescription = sanitizeHtml(description || defaultDescription, {
    allowedTags: [],
    allowedAttributes: {}
  });

  const seo = {
    title: title || defaultTitle,
    description: sanitizedDescription,
    image: featuredImage || `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <html lang="en-US" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="2400" />
      <meta property="og:image:height" content="1260" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="Refact" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {children}
    </>
  )
}

export default Seo;
