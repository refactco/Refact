import { graphql } from 'gatsby';
import React from 'react';
import Seo from '../../components/seo/seo';
import ServiceHero from '../../components/service-hero/service-hero';
import ServiceLayout from '../../components/service-layout/service-layout';
import ServiceSubItemList from '../../components/service-sub-item-list/service-sub-item-list';

const ServiceProductManagementPage = () => {
  const currentService = {
    title: 'Product Management',
    desc: 'Expert in using Data Collection and Analytics to inform business strategies. Proficient in Email Marketing Automation and CRO to enhance sales and revenue. Adept at API integration, Newsletter Template Design, and User Engagement Optimization.',
    subList: [
      // Data Collection
      {
        title: 'Data Collection',
        description:
          'Data collection is where we organize, strategically gather, and utilize data to make informed decisions, improve targeting, and streamline data management for better insights that achieve high-impact results.',
        numberOfColumns: 3,
        subItems: [
          {
            title: 'Data Planning',
            description:
              'This is the process of defining what data is needed and how it will be collected. It involves setting the goals and objectives of data collection, specifying the sources of data, and planning to capture and store this information effectively.',
          },
          {
            title: 'Customer Segmentation',
            description:
              'This involves categorizing your audience into distinct groups based on shared characteristics or behaviors. It helps tailor your marketing efforts and deliver content to different customer segments for more personalized and engaging communication.',
          },
          {
            title: 'Data Warehouse Setup',
            description:
              'We create a structured and centralized repository for storing and managing data. A data warehouse allows for the efficient storage and retrieval of data, making it readily available for analysis and reporting.',
          },
        ],
      },
      // Data Analytics
      {
        title: 'Data Analytics',
        description:
          'To make sense of your data and help with decision-making we use tools and auditing methods to improve performance.',
        whiteColor: true,
        subItems: [
          {
            title: 'Data Dashboard',
            description:
              'Once your data is collected, they are made available through a dashboard showcasing key metrics clearly and concisely to monitor performance, identify trends, and make data-driven decisions.',
          },
          {
            title: 'Analytics Audit',
            description:
              'We review and assess your data and analytical practices to make sure the information and insights gain from them are accurate and helpful to your business.',
          },
        ],
      },
      // Revenue Optimization
      {
        title: 'Revenue Optimization',
        description:
          'The focus here is to maximize your ROI by reducing churn and improving the management of your revenue models.',
        subItems: [
          {
            title: 'Involuntary Churn and Payment Optimization',
            description:
              'We can help reduce the loss of users due to issues like payment failures or expired credit cards. This includes using preventative measures and tools to recover failed payments, update payment information, and minimize subscription cancellations.',
          },
          {
            title: 'Subscription management',
            description:
              'Involves optimizing your subscription cycle by attracting and retaining subscribers, managing pricing, offering upsell opportunities, and ensuring subscribers have a smooth and satisfying experience.',
          },
        ],
      },
      // Discover More
      {
        title: 'Discovery More',
        description: 'More services through product management.',
        whiteColor: true,
        subItems: [
          {
            title: 'Email Marketing Automation',
            description:
              'We help you streamline and enhance your email marketing efforts by using tools and services to set up automated email campaigns to deliver personalized content to your subscribers and users based on their behavioral patterns.',
          },
          {
            title: 'Conversion Rate Optimization (CRO)',
            description: `We help you in improving your product's ability to convert a higher percentage of visitors into active users or achieve a specific goal. We analyze your user's behavior and use data-driven insights to make design adjustments to achieve the desired results.`,
          },
          {
            title: 'Newsletter Template Design & Development',
            description:
              'We design and develop customized and reusable newsletter templates that reflect your brand identity in all your email communications.',
          },
          {
            title: 'User Engagement Optimization',
            description:
              'We research and analyze user patterns, implementing strategies to optimize your product for better engagement that leads to user retention and loyalty. This may involve improving features, user interface, and subscriber journey.',
          },
        ],
      },
    ],
  };

  return (
    <ServiceLayout>
      <ServiceHero
        title={currentService.title}
        description={currentService.desc}
      />
      {currentService.subList.map((subService) => {
        const { title, description, subItems, numberOfColumns, whiteColor } =
          subService;
        return (
          <ServiceSubItemList
            title={title}
            description={description}
            subList={subItems}
            numberOfColumns={numberOfColumns}
            whiteColor={whiteColor}
          />
        );
      })}
    </ServiceLayout>
  );
};

export default ServiceProductManagementPage;

export function Head({ data }) {
  const post = data.wpPage;
  // console.log({ post });
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} />
    </>
  );
}

export const pageQuery = graphql`
  query {
    wpPage(slug: { eq: "services" }) {
      seo {
        title
        metaDesc
      }
      template {
        ... on WpTemplate_PageBuilder {
          pageBuilder {
            fieldGroupName
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Services {
                fieldGroupName
                services {
                  desc
                  fieldGroupName
                  title
                  slug
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
`;
