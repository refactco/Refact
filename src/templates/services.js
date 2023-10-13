import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"

const ServicesPage = ({data}) => {
  const [activeItemId, setActiveItemId] = useState(null);
  const servicesContent = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = servicesContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader');
  const serviceSection = servicesContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Services');
  const handleScrollToService = (targetId) => {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = 10; // Adjust this value to set your desired offset
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = window.scrollY + elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  
  const handleClick = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').slice(1); // Remove the "#" from the href
    handleScrollToService(targetId);
    setActiveItemId(targetId); // Set the active item when a link is clicked
  };
  
  // Add a scroll event listener to update the active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = serviceSection.services.map((service) =>
        document.getElementById(service.title.replace(/\s+/g, '-').toLowerCase())
      );

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        if (
          sectionElements[i].getBoundingClientRect().top <= 100
          || (i === 0 && sectionElements[i].getBoundingClientRect().top > 0)
        ) {
          setActiveItemId(serviceSection.services[i].title.replace(/\s+/g, '-').toLowerCase());
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [serviceSection.services]); // Run this effect only once on component mount
  
  return (
    <Layout>
      {heroSection && (
        <ContainerBox className="o-section c-section--page-header">
        <div className="c-page-header is-full">
          <div className="c-page-header__sub-title">
            {heroSection.subtitle}
          </div>
          <h1 className="c-page-header__title">
            {heroSection.title}
          </h1>
          <div className="c-page-header__text" dangerouslySetInnerHTML={{__html:heroSection.text}}></div>
        </div>
      </ContainerBox>
      )}
      {serviceSection && (
        <ContainerBox className="o-section c-section--services">
          <div className="c-services__wrap">
            <div className="c-services">
              {serviceSection.services.map((service, index) => (
                <div className="c-services__item" key={index}>
                  {service.title && (
                    <h3 className="c-services__title" id={service.title.replace(/\s+/g, '-').toLowerCase()}>{service.title}</h3>
                  )}
                  {service.desc && (
                    <div className="c-services__desc" dangerouslySetInnerHTML={{__html:service.desc}}></div>
                  )}
                  {service.subList && (
                    <ul className="c-services__sub-list">
                      {service.subList.map((item, index) => (
                        <li className="c-services__sub-list-item" key={index}>
                          <div className="c-services-sub-list__headline">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="c-services-sub-list__desc" dangerouslySetInnerHTML={{__html:item.description}}></div>
                          )}
                          {item.activateSubitem && (
                            <ul className="c-services__subitems-list">
                              {item.subItem.map((subItem, index) => (
                                <li className="c-services-subitems__item" key={index} dangerouslySetInnerHTML={{__html:subItem.title}}></li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="c-services__sidebar">
              <div className="c-services-sidebar__title">Our services</div>
              <div className="c-services-sidebar__list">
                {serviceSection.services.map((service, index) => (
                  <div className={`c-services-sidebar__item ${activeItemId === service.title.replace(/\s+/g, '-').toLowerCase() ? 'is-active' : ''}`} key={index}>
                    <a href={`#${service.title.replace(/\s+/g, '-').toLowerCase()}`} className="c-services-sidebar__link" onClick={handleClick}>
                      <div className="c-service-sidebar__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" fill="none" viewBox="0 0 10 10"><path fill="#59CC51" d="M9 9.796c.44 0 .796-.356.796-.796V1.838a.796.796 0 1 0-1.591 0v6.366H1.838a.796.796 0 1 0 0 1.592H9ZM.437 1.562l8 8 1.126-1.125-8-8L.437 1.562Z"/></svg>
                      </div>
                      {service.title}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContainerBox>
      )}
    </Layout>
  )
}

export default ServicesPage

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title="Services | Refact" description={post.content} />
    </>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "services"}) {
      id
      content
      template {
        ... on WpTemplate_PageBuilder {
          templateName
          pageBuilder {
            fieldGroupName
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                fieldGroupName
                fullWidth
                subtitle
                text
                title
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Services {
                fieldGroupName
                services {
                  desc
                  fieldGroupName
                  title
                  subList {
                    ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Services_services_SubList_Item {
                      activateSubitem
                      fieldGroupName
                      subItem {
                        fieldGroupName
                        title
                      }
                      title
                      description
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`