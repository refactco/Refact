import React from "react";
import { useSiteMetadata } from "../../hooks/use-site-metadata";

const Seo = ({ title, description, pathname, children }) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
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

export default Seo