import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-7G1F92L8DB"></script>
      <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-7G1F92L8DB');
            `,
          }}
        />
        <script dangerouslySetInnerHTML={{
          __html: `
          var _ss = _ss || [];
          _ss.push(['_setDomain', 'https://koi-3RZSEK5NRO.marketingautomation.services/net']);
          _ss.push(['_setAccount', 'KOI-1FZ71YL3Y3J6HU']);
          _ss.push(['_trackPageView']);
          window._pa = window._pa || {};
          // _pa.orderId = "myOrderId"; // OPTIONAL: attach unique conversion identifier to conversions
          // _pa.revenue = "19.99"; // OPTIONAL: attach dynamic purchase values to conversions
          // _pa.productId = "myProductId"; // OPTIONAL: Include product ID for use with dynamic ads
      (function() {
          var ss = document.createElement('script');
          ss.type = 'text/javascript'; ss.async = true;
          ss.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'koi-3RZSEK5NRO.marketingautomation.services/client/ss.js?ver=2.4.0';
          var scr = document.getElementsByTagName('script')[0];
          scr.parentNode.insertBefore(ss, scr);
      })();
          `,
        }}
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
