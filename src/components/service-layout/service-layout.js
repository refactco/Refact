import React from 'react';
// import Faq from '../faq/faq';
import Layout from '../layout/layout';

const ServiceLayout = ({ children }) => {
  return (
    <Layout>
      {children}
      {/* <Faq
        items={[
          {
            question: 'What services does your design agency offer?',
            answer: '<p>This is answer</p>',
          },
          {
            question: 'How much does it cost to hire your design services?',
            answer: '<p>This is answer</p>',
          },
          {
            question: 'How long does it take to complete a design project?',
            answer: '<p>This is answer</p>',
          },
          {
            question: 'Do you work with clients remotely?',
            answer: '<p>This is answer</p>',
          },
        ]}
      /> */}
    </Layout>
  );
};

export default ServiceLayout;
