import { GatsbyNode } from 'gatsby';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type HomePageQuery {
      homePage: WpPageConnection
    }
    
    type WpPageConnection {
      nodes: [WpPage]
    }
    
    type WpPage {
      template: WpTemplate_PageBuilder
    }
    
    type WpTemplate_PageBuilder {
      templateName: String
      pageBuilder: WpTemplate_PageBuilder_Pagebuilder
    }
    
    type WpTemplate_PageBuilder_Pagebuilder {
      hero: WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Hero
      capabilities: WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites
      project: WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Project
      testimonials: WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonials
    }
    
    type WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Hero {
      fieldGroupName: String
      text: String
      cta: WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CTA
      title: String
    }
    
    type WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
      description: String
      fieldGroupName: String
      cta: WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CTA
      items: [WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CapabilitiesItem]
      title: String
    }
    
    type WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Project {
      fieldGroupName: String
      cta: WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CTA
      projectList: [WpTemplate_PageBuilder_Pagebuilder_PageBuilder_ProjectItem]
    }
    
    type WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonials {
      fieldGroupName: String
      title: String
      testimonialsList: [WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonial]
    }
    
    type WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CTA {
      target: String
      title: String
      url: String
    }
    
    type WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CapabilitiesItem {
      fieldGroupName: String
      text: String
      title: String
    }
    
    type WpTemplate_PageBuilder_Pagebuilder_PageBuilder_ProjectItem {
      title: String
      cta: WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CTA
      description: String
      fieldGroupName: String
    }
    
    type WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonial {
      fieldGroupName: String
      logo: String
      name: String
      position: String
      text: String
    }  
  `;

  createTypes(typeDefs);
};
