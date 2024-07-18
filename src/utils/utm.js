export function setUTMCookies() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = ['utm_campaign', 'utm_medium', 'utm_source','utm_term'];

  utmParams.forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      document.cookie = `${param}=${value}; path=/`;
    }
  });
}

export function getUTMCookies() {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});

  return {
    utm_campaign: cookies.utm_campaign || '',
    utm_medium: cookies.utm_medium || '',
    utm_source: cookies.utm_source || '',
    utm_term: cookies.utm_term || '',
  };
}
