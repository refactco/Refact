import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from "../components/layout/layout";
import ContainerBox from '../components/container-box/container-box';
import Seo from '../components/seo/seo';

const PrivacyPage = () => {
  const data = useStaticQuery(graphql`
    query PrivacyPageQuery {
      privacyPage: wpPage(slug: {eq: "privacy-policy"}) {
        id
        seo {
          title
          metaDesc
        }
        template {
          ... on WpDefaultTemplate {
            templateName
            defaultPages {
              fieldGroupName
              headline
              title
            }
          }
        }
        content
      }
    }
  `);
const privacyItem = data.privacyPage.template.defaultPages;
const privacyContent = data.privacyPage.content;
const seoData = data.privacyPage.seo;
  return (
    <Layout>
      <Seo title={seoData.title} description={seoData.metaDesc} />
      <ContainerBox className="c-section--pagehead">
        <div className="c-pagehead">
          {privacyItem.headline && (
            <div className="c-pagehead__headline">
              <svg width="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#59CC51"/></svg>
              {privacyItem.headline}
            </div>
          )}
          {privacyItem.title && (
            <h1 className="c-pagehead__title">
              {privacyItem.title}
            </h1>
          )}
        </div>
      </ContainerBox>
      <ContainerBox className="c-section--page">
        <div className="row c-page">
          <div className="col-lg-8 c-page__col">
            <article>
              <div className="s-content is-default-page" dangerouslySetInnerHTML={{__html:privacyContent}}></div>
            </article>
          </div>
        </div>
      </ContainerBox>
    </Layout>
  )
}

export default PrivacyPage