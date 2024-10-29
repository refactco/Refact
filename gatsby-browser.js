import React from 'react';
import { setUTMCookies } from './src/utils/utm';

export const onClientEntry = () => {
  setUTMCookies();
};


export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      key="branch-context"
      dangerouslySetInnerHTML={{
        __html: `window.branch = "${process.env.BRANCH_NAME || 'main'}";`,
      }}
    />,
  ]);
};