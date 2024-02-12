const campaignChannels = {
  direct: 'Direct',
  crossNetwork: 'Cross-network',
  paidShopping: 'Paid Shopping',
  paidSearch: 'Paid Search',
  paidSocial: 'Paid Social',
  paidVideo: 'Paid Video',
  display: 'Display',
  paidOther: 'Paid Other',
  organicShopping: 'Organic Shopping',
  organicSocial: 'Organic Social',
  organicVideo: 'Organic Video',
  organicSearch: 'Organic Search',
  referral: 'Referral',
  email: 'Email',
  affiliates: 'Affiliates',
  audio: 'Audio',
  sms: 'SMS',
  mobilePushNotifications: 'Mobile Push Notifications',
};

const shoppingSiteRegex = /^(Google Shopping|IGShopping|aax-us-east.amazon-adsystem.com|aax.amazon-adsystem.com|alibaba|alibaba.com|amazon|amazon.co.uk|amazon.com|apps.shopify.com|checkout.shopify.com|checkout.stripe.com|cr.shopping.naver.com|cr2.shopping.naver.com|ebay|ebay.co.uk|ebay.com|ebay.com.au|ebay.de|etsy|etsy.com|m.alibaba.com|m.shopping.naver.com|mercadolibre|mercadolibre.com|mercadolibre.com.ar|mercadolibre.com.mx|message.alibaba.com|msearch.shopping.naver.com|nl.shopping.net|no.shopping.net|offer.alibaba.com|one.walmart.com|order.shopping.yahoo.co.jp|partners.shopify.com|s3.amazonaws.com|se.shopping.net|shop.app|shopify|shopify.com|shopping.naver.com|shopping.yahoo.co.jp|shopping.yahoo.com|shopzilla|shopzilla.com|simplycodes.com|store.shopping.yahoo.co.jp|stripe|stripe.com|uk.shopping.net|walmart|walmart.com)$/i;
const shoppingNameRegex = /^(.*(([^a-df-z]|^)shop|shopping).*)$/i;
const searchSiteRegex = /^(360.cn|alice|aol|ar.search.yahoo.com|ask|at.search.yahoo.com|au.search.yahoo.com|auone|avg|babylon|baidu|biglobe|biglobe.co.jp|biglobe.ne.jp|bing|br.search.yahoo.com|ca.search.yahoo.com|centrum.cz|ch.search.yahoo.com|cl.search.yahoo.com|cn.bing.com|cnn|co.search.yahoo.com|comcast|conduit|daum|daum.net|de.search.yahoo.com|dk.search.yahoo.com|dogpile|dogpile.com|duckduckgo|ecosia.org|email.seznam.cz|eniro|es.search.yahoo.com|espanol.search.yahoo.com|exalead.com|excite.com|fi.search.yahoo.com|firmy.cz|fr.search.yahoo.com|globo|go.mail.ru|google|google-play|hk.search.yahoo.com|id.search.yahoo.com|in.search.yahoo.com|incredimail|it.search.yahoo.com|kvasir|lens.google.com|lite.qwant.com|lycos|m.baidu.com|m.naver.com|m.search.naver.com|m.sogou.com|mail.rambler.ru|mail.yandex.ru|malaysia.search.yahoo.com|msn|msn.com|mx.search.yahoo.com|najdi|naver|naver.com|news.google.com|nl.search.yahoo.com|no.search.yahoo.com|ntp.msn.com|nz.search.yahoo.com|onet|onet.pl|pe.search.yahoo.com|ph.search.yahoo.com|pl.search.yahoo.com|play.google.com|qwant|qwant.com|rakuten|rakuten.co.jp|rambler|rambler.ru|se.search.yahoo.com|search-results|search.aol.co.uk|search.aol.com|search.google.com|search.smt.docomo.ne.jp|search.ukr.net|secureurl.ukr.net|seznam|seznam.cz|sg.search.yahoo.com|so.com|sogou|sogou.com|sp-web.search.auone.jp|startsiden|startsiden.no|suche.aol.de|terra|th.search.yahoo.com|tr.search.yahoo.com|tut.by|tw.search.yahoo.com|uk.search.yahoo.com|ukr|us.search.yahoo.com|virgilio|vn.search.yahoo.com|wap.sogou.com|webmaster.yandex.ru|websearch.rakuten.co.jp|yahooyahoo.co.jp|yahoo.com|yandex|yandex.by|yandex.com|yandex.com.tr|yandex.fr|yandex.kz|yandex.ru|yandex.ua|yandex.uz|zen.yandex.ru)$/i;
const socialSiteRegex = /^(43things|51.com|5ch.net|43things.com|ImageShack|activerain|activerain.com|addthis|addthis.com|alumniclass|alumniclass.com|ameba.jp|ameblo.jp|americantowns|americantowns.com|amp.reddit.com|anobii.com|answerbag|aolanswers|ar.pinterest.com|askubuntu|athlinks|b.hatena.ne.jp|baby-gaga|baby-gaga.com|babyblog.ru|bebo|beforeitsnews.com|bharatstudent|biswap.org|bit.ly|blackplanet.com|blip.fm|blog.goo.ne.jp|blog.naver.com|blogg.no|bloggang.com|blogger|blogger.com|blogher|bloglines.com|blogs.com|blogspot|blogspot.com|blurtit|blurtit.com|br.pinterest.com|brizzly|brizzly.com|buzzfeed.com|buzznet|cafe.naver.com|cafemom|cafemom.com|camospace|camospace.com|care2|care2.com|catster.com|cbnt.io|centerblog.net|chicagonow.com|chiebukuro.yahoo.co.jp|classmates.com|classquest|co.pinterest.com|cocolog-nifty|cocolog-nifty.com|copainsdavant.linternaute.com|couchsurfing.org|cross.tv|crunchyroll|cyworld|d.hatena.ne.jp|dailystrength.org|deluxe.com|deviantart|deviantart.com|dianping|digg.com|diigo|dogster.com|dol2day|doostang.com|dopplr|douban.com|draft.blogger.com|drugs-forum.com|dzone|dzone.com|elftown|elftown.com|epicurious.com|everforo.com|extole|facebook.com|faceparty|fanpop|fanpop.com|fark|fark.com|fc2|fc2.com|feministing.com|flickr|flipboard.com|folkdirect|foodservice.com|forums.androidcentral.com|forums.nexopia.com|forums.webosnation.com|fotki.com|fotolog|fotolog.com|foursquare|foursquare.com|friendfeed|friendfeed.com|fubar.com|gaiaonline|gamerdna.com|gather.com|glassboard|glassboard.com|goldenline.pl|goldstar|gooblog|goodreads|goodreads.com|google+|googleplus|govloop|gowalla.com|gree.jp|gutefrage.net|habbo|hi5|hootsuite|hootsuite.com|hoverspot|hoverspot.com|hubculture|hubculture.com|hubpages.com|ibibo|ibibo.com|identi.ca|imageshack.us|imvu|instagram|instagram.com|internations.org|interpals.net|irc-galleria.net|is.gd|italki.com|jammerdirect|jappy.de|kakao|kakao.com|kaneva.com|kin.naver.com|l.instagram.com|l.messenger.com|librarything|librarything.com|line.me|linkedin|linkedin.com|listal|listal.com|livedoor.com|livejournal.com|lm.facebook.com|m.facebook.com|m.kin.naver.com|m.yelp.com|mbga.jp|medium.com|meetin.org|meetup|meneame.net|menuism.com|messages.yahoo.co.jp|messenger|mixi.jp|mobile.facebook.com|mouthshut|mouthshut.com|mubi.com|my.opera.com|myanimelist.net|mylife|mylife.com|myspace|myspace.com|netvibes.com|nexopia|ngopost.org|nightlifelink|nightlifelink.com|nl.pinterest.com|odnoklassniki.ru|odnoklassniki.ua|old.reddit.com|oneworldgroup.org|onstartups|opendiary.com|over-blog.com|overblog.com|partyflock.nl|photobucket.com|pinboard|pinboard.in|pingsta|pingsta.com|pinterest.ca|pinterest.ch|pinterest.co.uk|pinterest.com|pinterest.de|pinterest.es|pinterest.jp|pinterest.nz|pinterest.ru|pinterest.se|plurk|plurk.com|plus.google.com|plus.url.google.com|posterous.com|pro.homeadvisor.com|qapacity.com|quechup|quora.com|ravelry|ravelry.com|redux|redux.com|researchgate.net|reunion|reunion.com|reverbnation|reverbnation.com|ryze.com|scoop.it|screenrant|scribd.com|scvngr|secondlife.com|shareit|sharethis|sites.google.com|skyrock.com|slashdot.org|snapchat|snapchat.com|sociallife.com.br|socialvibe|spaces.live.com|spoke|spoke.com|ssense.com|stackapps|stackexchange.com|stackoverflow|suomi24.fi|sweeva|sweeva.com|tagged|tagged.com|taggedmail|taggedmail.com|talkbiznow|techmeme|techmeme.com|tencent|tencent.com|tiktok|tiktok.com|toolbox|toolbox.com|travellerspoint|tripadvisor.com|trombi|tudou|tudou.com|tuenti|tuenti.com|tumblr|tweetdeck|twitter|typepad|typepad.com|unblog.fr|ushareit.com|ushi.cn|vampirefreaks|vampirefreaks.com|vg.no|video.ibm.com|vk.com|wakoopa|wakoopa.com|wattpad|web.skype.com|webshots.com|wechat|weebly.com|weibo|weread|weread.com|whatsapp|whatsapp.com|wiki.answers.com|wordpress.com|wordpress.org|xing|xing.com|yelp|yelp.co.uk|yelp.com|zoo.gr|Hatena|academia.edu|activeworlds|activeworlds.com|airg.ca|allnurses.com|allrecipes.com|answerbag.com|answers.yahoo.com|artstation.com|askubuntu.com|asmallworld.com|athlinks.com|away.vk.com|awe.sm|badoo|badoo.com|bebo.com|beforeitsnews|bharatstudent.com|biip.no|blackcareernetwork.com|blackplanet|blog.com|blog.feedspot.com|blog.yahoo.co.jp|blogher.com|bloglines|blogsome|blogsome.com|blogster|blogster.com|bookmarks.yahoo.co.jp|bookmarks.yahoo.com|brightkite|brightkite.com|business.facebook.com|buzzfeed|buzznet.com|canalblog.com|care.com|caringbridge.org|catster|cellufun|cellufun.com|chat.zalo.me|chegg.com|chicagonow|classmates|classquest.com|cozycot|cozycot.com|crunchyroll.com|cyworld.com|cz.pinterest.com|diigo.com|discover.hubpages.com|disqus|disqus.com|dogster|dol2day.com|doostang|dopplr.com|douban|draugiem.lv|drugs-forum|edublogs.org|exblog.jp|extole.com|facebook|faceparty.com|fandom.com|fb|fb.com|feedspot|feministing|filmaffinity|filmaffinity.com|flickr.com|flipboard|folkdirect.com|foodservice|forums.crackberry.com|forums.imore.com|forums.wpcentral.com|fotki|free.facebook.com|fruehstueckstreff.org|fubar|gaiaonline.com|gamerdna|geni.com|getpocket.com|glassdoor|glassdoor.com|godtube|godtube.com|goldstar.com|goo.gl|googlegroups.com|groups.google.com|gulli.com|habbo.com|hi5.com|houzz|houzz.com|hr.com|hu.pinterest.com|hyves.net|hyves.nl|id.pinterest.com|ig|imageshack.com|imvu.com|in.pinterest.com|insanejournal|insanejournal.com|instapaper|instapaper.com|intherooms|intherooms.com|italki|jammerdirect.com|jappy.com|kaboodle.com|kakaocorp.com|kaneva|l.facebook.com|last.fm|lifestream.aol.com|line|listography|listography.com|livedoorblog|livejournal|lnkd.in|m.blog.naver.com|m.cafe.naver.com|m.vk.com|meetup.com|meinvz.net|messages.google.com|messenger.com|mix.com|mocospace|mocospace.com|movabletype|movabletype.com|mubi|myheritage|myheritage.com|mymodernmet|mymodernmet.com|netvibes|news.ycombinator.com|newsshowcase|niconico|nicovideo.jp|ning|ning.com|okwave.jp|onstartups.com|opendiary|oshiete.goo.ne.jp|out.reddit.com|paper.li|photobucket|pinterest|pinterest.at|pinterest.cl|pinterest.co.kr|pinterest.com.au|pinterest.com.mx|pinterest.fr|pinterest.it|pinterest.ph|pinterest.pt|pixiv.net|pl.pinterest.com|playahead.se|pocket.co|posterous|pulse.yahoo.com|qapacity|quechup.com|quora|qzone.qq.com|reddit|reddit.com|renren|renren.com|rtl.de|ryze|salespider|salespider.com|screenrant.com|scribd|scvngr.com|secondlife|serverfault|serverfault.com|sharethis.com|shvoong.com|skype|skyrock|slideshare.net|smartnews.com|social|socialvibe.com|spruz|spruz.com|stackapps.com|stackexchange|stackoverflow.com|stardoll.com|stickam|stickam.com|studivz.net|superuser|superuser.com|t.co|t.me|talkbiznow.com|taringa.net|tinyurl|tinyurl.com|touch.facebook.com|tr.pinterest.com|travellerspoint.com|tripadvisor|trombi.com|trustpilot|tumblr.com|tweetdeck.com|twitter.com|twoo.com|urbanspoon.com|vampirerave|vampirerave.com|vkontakte.ru|wattpad.com|web.facebook.com|webshots|wechat.com|weebly|weibo.com|wer-weiss-was.de|wikihow.com|wikitravel.org|woot.com|wordpress|xanga|xanga.com|yahoo-mbga.jp|yammer|yammer.com|youroom.in|za.pinterest.com|zalo|zooppa|zooppa.com)$/i;
const videoSiteRegex = /^(blog.twitch.tv|crackle|crackle.com|curiositystream|curiositystream.com|d.tub|dailymotion|dailymotion.com|dashboard.twitch.tv|disneyplus|disneyplus.com|fast.wistia.net|help.hulu.com|help.netflix.com|hulu|hulu.com|id.twitch.tv|iq.com|iqiyi|iqiyi.com|jobs.netflix.com|justin.tv|m.twitch.tv|m.youtube.com|music.youtube.com|netflix|netflix.com|player.twitch.tv|player.vimeo.com|ted|ted.com|twitch|twitch.tv|utreon|utreon.com|veoh|veoh.com|viadeo.journaldunet.com|vimeo|vimeo.com|wistia|wistia.com|youku|youku.com|youtube|youtube.com)$/i

export function CampaignURLGeneratorHelper(state, setState, setValue) {
  const getChannelFromCampaign = (source, medium, campaignName) => {
    // Helper function to check if a string matches a regex pattern
    const matchesRegex = (str, regex) => regex.test(str);

    if (source.toLowerCase() === '(direct)' && ['(not set)', '(none)'].includes(medium.toLowerCase())) {
      return campaignChannels.direct;
    }

    if (campaignName.includes('cross-network') && ['discovery', 'performance max', 'smart shopping'].some(item => campaignName.toLowerCase().includes(item))) {
      return campaignChannels.crossNetwork;
    }

    if (matchesRegex(medium, /^(.*cp.*|ppc|retargeting|paid.*)$/)) {
      // Paid Shopping Rule
      if (matchesRegex(source, shoppingSiteRegex) || matchesRegex(campaignName, shoppingNameRegex)) {
        return campaignChannels.paidShopping;
      }
    }

    if ((matchesRegex(source, searchSiteRegex) && matchesRegex(medium, /^(.*cp.*|ppc|retargeting|paid.*)$/))) {
      return campaignChannels.paidSearch;
    }

    if (matchesRegex(source, socialSiteRegex) &&
      matchesRegex(medium, /^(.*cp.*|ppc|retargeting|paid.*)$/)) {
      return campaignChannels.paidSocial;
    }

    if (matchesRegex(source, videoSiteRegex) &&
      matchesRegex(medium, /^(.*cp.*|ppc|retargeting|paid.*)$/)) {
      return campaignChannels.paidVideo;
    }

    if (matchesRegex(medium, /^(display|banner|expandable|interstitial|cpm)$/i)) {
      return campaignChannels.display;
    }

    if (matchesRegex(medium, /^(.*cp.*|ppc|retargeting|paid.*)$/)) {
      return campaignChannels.paidOther;
    }

    if ((matchesRegex(source, shoppingSiteRegex) || matchesRegex(campaignName, /^.*(shopping|shop).*$/))) {
      return campaignChannels.organicShopping;
    }

    if (matchesRegex(source, socialSiteRegex) ||
      matchesRegex(medium, /^(social|social-network|social-media|sm|social network|social media)$/i)) {
      return campaignChannels.organicSocial;
    }

    if (matchesRegex(source, videoSiteRegex) || matchesRegex(medium, /^(.*video.*)$/i)) {
      return campaignChannels.organicVideo;
    }

    if (matchesRegex(source, searchSiteRegex) || matchesRegex(medium, /^organic$/i)) {
      return campaignChannels.organicSearch;
    }

    if (matchesRegex(medium, /^(referral|app|link)$/i)) {
      return campaignChannels.referral;
    }

    if (matchesRegex(source, /^(email|e-mail|e_mail|e mail)$/i) || matchesRegex(medium, /^(email|e-mail|e_mail|e mail)$/i)) {
      return campaignChannels.email;
    }

    if (matchesRegex(medium, /^affiliate$/i)) {
      return campaignChannels.affiliates;
    }

    if (matchesRegex(medium, /^audio$/i)) {
      return campaignChannels.audio;
    }

    if (matchesRegex(source, /^sms$/i) || matchesRegex(medium, /^sms$/i)) {
      return campaignChannels.sms;
    }

    if (matchesRegex(medium, /^.*push$/i) || matchesRegex(medium, /^.*mobile.*$|^.*notification.*$/i)) {
      return campaignChannels.mobilePushNotifications;
    }

    return 'Other';
  };

  const submitHandler = (data) => {
    // Build the campaign URL
    const { websiteUrl, campaignSource, campaignMedium, campaignName, campaignID, campaignTerm, campaignContent} = data;
    const urlObject = new URL(websiteUrl.trim());
    // Extract the base URL without the query parameters
    const baseURL = `${urlObject.protocol}//${urlObject.hostname}${urlObject.pathname}`;
    const queryParameters =  urlObject.searchParams?.toString() ?? '';
    const hashParameters = urlObject.hash.substring(1) ?? '';
    let websiteUtmURL = `${baseURL}?`;
    if(queryParameters){
       websiteUtmURL = `${baseURL}?${queryParameters}&`;
    }
    let campaignURL = websiteUtmURL + `utm_source=${campaignSource.trim()}&utm_medium=${campaignMedium.trim()}`;

    if (campaignName) {
      campaignURL += `&utm_campaign=${campaignName.trim()}`;
    }

    if (campaignID) {
      campaignURL += `&utm_id=${campaignID.trim()}`;
    }
    
    if (campaignTerm) {
      campaignURL += `&utm_term=${campaignTerm.trim()}`;
    }
    if (campaignContent) {
      campaignURL += `&utm_content=${campaignContent.trim()}`;
    }
    if(hashParameters) {
      campaignURL += `#${hashParameters}`
    }

    // Get the channel based on campaign source, medium, and campaign name
    const channel = getChannelFromCampaign(data.campaignSource, data.campaignMedium, data.campaignName);

    setState({
        ...state,
        generatedChannel: channel,
        generatedURL: campaignURL
    })


  }

  const handleUTMFormSubmit = (data) =>{
    const { utmURL } = data;
      // Extract the UTM parameters from the UTM URL
      const parsedUrl = new URL(utmURL);
      const websiteUrl = `${parsedUrl.origin}${parsedUrl.pathname}`;
      const utmURLParams = parsedUrl.searchParams;
      const source = utmURLParams.get('utm_source') ?? '';
      const medium = utmURLParams.get('utm_medium') ?? '';
      const campaignName = utmURLParams.get('utm_campaign') ?? '';
      const campaignID = utmURLParams.get('utm_id') ?? '';
      const campaignTerm = utmURLParams.get('utm_term') ?? '';
      const campaignContent = utmURLParams.get('utm_content') ?? '';

      // Get the channel based on UTM parameters
      const channel = getChannelFromCampaign(source, medium, campaignName);
      // Fill the previous form fields with the extracted UTM parameters
      setValue('campaignSource', source);
      setValue('campaignMedium', medium);
      setValue('campaignName', campaignName);
      setValue('campaignID', campaignID)
      setValue('campaignTerm', campaignTerm)
      setValue('campaignContent', campaignContent)
      setValue('websiteUrl', websiteUrl)
      setState({...state, campaignSource: source, campaignID: campaignID, campaignTerm: campaignTerm, campaignContent: campaignContent, campaignMedium: medium, campaignName: campaignName, generatedChannel: channel, generatedURL: utmURL})
  }

  return {
    submitHandler,
    handleUTMFormSubmit
  }
}
