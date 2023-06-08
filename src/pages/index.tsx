import { graphql } from 'gatsby';
import React, { ReactNode } from 'react';
import BaseComponent from '../components/base/base-component';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import CompanyLogo from '../components/company-logo/company-logo';
import { PopupButton } from "react-calendly";
interface IHomeProperties {
  readonly data?: any;
}

export default class Homepage extends BaseComponent<IHomeProperties> {
  public render(): ReactNode {
    const { data } = this.props;
    const { homePage } = data;
    // Access the fields within the homePage object
    const {
      template: {
        pageBuilder: {
          pageBuilder
        }
      }
    } = homePage;
    // Filter the pageBuilder array to get each section
    const heroSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Hero');
    const capabilitiesSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites');
    const projectsSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Project');
    const testimonialsSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Testimonials');
  
  return (
    <Layout>
      {/* Print data for Hero */}      
      {heroSection && (
        <ContainerBox className='c-section--hero'>
          <div className="c-hero">
            {heroSection.title && (
              <h1 className="c-hero__title" dangerouslySetInnerHTML={{__html:heroSection.title}}></h1>
            )}
            {heroSection.text && (
              <div className="c-hero__text">{heroSection.text}</div>
            )}
            <PopupButton
              url="https://calendly.com/saeedreza/30min"
              /*
              * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
              * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
              */
              rootElement={document.getElementById("___gatsby")}
              text="Work with Us"
              className='c-btn'
            />
            <CompanyLogo />
          </div>
        </ContainerBox>
      )}

      {/* Print data for Capabilities */}
      {capabilitiesSection && (
        <ContainerBox className='c-section--capabilites pb-small'>
          <div className="c-capabilites">
            {capabilitiesSection.title && (
              <h3 className="c-section__title">{capabilitiesSection.title}</h3>
            )}
            {capabilitiesSection.description && (
              <div className="c-capabilites__description">{capabilitiesSection.description}</div>
            )}
            {/* Print the items within Capabilities */}
            {capabilitiesSection.items && (
              <div className="row c-capabilites__items">
                {capabilitiesSection.items.map((item, index) => (
                  <div className="col-md-6 c-capabilites__item"  key={index}>
                    <div className="c-capabilites__number">0{index+1}</div>
                    <div className="c-capabilites__title">{item.title}</div>
                    <div className="c-capabilites__text">{item.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ContainerBox>
      )}

      {/* Print data for Projects */}
      {projectsSection && (
        <div>
          <h2>{projectsSection.title}</h2>
          {/* Print the project list */}
          {projectsSection.projectList.map((project, index) => (
            <div key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {/* Print the CTA for each project */}
              <a href={project.cta.url} target={project.cta.target}>
                {project.cta.title}
              </a>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
  }
}
export function Head() {
  return (
    <>
      <title>Refact | Technology Partner for Audience&#x2d;First Media</title>
      <meta name="description" content="We work with independent media and news organizations to design, build and scale publishing platforms and digital experiences." />
      <body className="home" />
    </>
  )
}

export const query = graphql`
  query HomePageQuery {
    homePage: wpPage(isFrontPage: {eq: true}) {
      id
      template {
        pageBuilder {
          pageBuilder {
            ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Hero {
              fieldGroupName
              text
              title
            }
            ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
              description
              fieldGroupName
              cta {
                target
                title
                url
              }
              items {
                fieldGroupName
                text
                title
              }
              title
            }
            ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Project {
              fieldGroupName
              cta {
                target
                title
                url
              }
              projectList {
                cta {
                  target
                  title
                  url
                }
                description
                fieldGroupName
                title
              }
            }
            ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonials {
              fieldGroupName
              title
              testimonialsList {
                fieldGroupName
                logo
                name
                position
                text
              }
            }
          }
        }
      }
    }
  }
`;
