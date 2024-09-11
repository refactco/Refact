import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from "../components/layout/layout";
import ContainerBox from '../components/container-box/container-box';
import Seo from '../components/seo/seo';
import PatternBg from '../components/patterns/pattern-bg';

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
  return (
    <Layout>
      <ContainerBox className="c-section--work c-section--pagehead">
        <div className="c-pagehead">
          {privacyItem.title && (
            <h1 className="c-page-header__title">
              {privacyItem.title}
            </h1>
          )}
        </div>
        <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
        <PatternBg pattern="pagePattern" className='is-page-pattern' />
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


export function Head() {
  return (
    <>
      <Seo title="Privacy Policy | Refact" description="Refact's commitment to your privacy: Detailed information on how we protect, use, and manage your data responsibly." />
    </>
  )
}