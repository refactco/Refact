import React from "react";
import { useSiteMetadata } from "../../hooks/use-site-metadata";
import sanitizeHtml from "sanitize-html";

const Seo = ({ title, description, pathname, featuredImage, children }) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl } = useSiteMetadata()

  const sanitizedDescription = sanitizeHtml(description || defaultDescription, {
    allowedTags: [], // Remove all tags
    allowedAttributes: {} // Remove all attributes
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
      {children}
    </>
  )
}

export default Seo;
