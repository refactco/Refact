import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import { graphql } from 'gatsby';
import React, { useState, useEffect } from 'react';
import Layout from "../components/layout/layout";
import ContainerBox from '../components/container-box/container-box';
import Seo from '../components/seo/seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import "slick-carousel/slick/slick.css";
import PatternBg from '../components/patterns/pattern-bg';
import SpinnerIcon from '../components/spinner/spinner';
// import Button, {BgMode, BtnType} from '../components/button/button';


// Add these functions to manage UTM cookies
function getUTMCookies() {
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

const BackToBasics = ({ data }) => {
  const { wpGfForm } = data;
  
  const initialFieldValues = wpGfForm.formFields.nodes.reduce((acc, field) => {
    if (field.type === 'SELECT' && field.choices.length > 0) {
      acc[field.databaseId] = field.placeholder;
    } else {
      acc[field.databaseId] = field.defaultValue ?? '';
    }
    return acc;
  }, {});

  const [fieldValues, setFieldValues] = useState(initialFieldValues);

  const formId = 13;



  const { submitButton, formFields } = wpGfForm;


  const client = new ApolloClient({
    uri: process.env.WPGRAPHQL_URL,
    cache: new InMemoryCache(),
  });

  const convertInputType = (type) => {
    if (type === 'WEBSITE') {
      return 'url';
    }

    return type.toLowerCase();
  };

  const [submitForm, { data: mutationData, loading }] = useMutation(
    gql`
      mutation WelcomeOnBoardingMutation(
        $fieldValues: [FormFieldValuesInput]!
      ) {
        submitGfForm(
          input: {
            id: 13
            fieldValues: $fieldValues
            saveAsDraft: false
            sourcePage: 1
            targetPage: 0
          }
        ) {
          confirmation {
            type
            message
            url
          }
          errors {
            id
            message
          }
        }
      }
    `,
    { client }
  );

  useEffect(() => {
    const utmCookies = getUTMCookies();
    // console.log('utmCookies', utmCookies);
    setFieldValues(prevValues => ({
      ...prevValues,
      9: utmCookies.utm_campaign,
      10: utmCookies.utm_medium,
      11: utmCookies.utm_source,
      12: utmCookies.utm_term,
    }));
    if (mutationData?.submitGfForm?.confirmation) {
      const downloadLink = document.getElementById('download-link');
      if (downloadLink) {
        downloadLink.click(); // Automatically trigger the download
      }
    }
  }, [mutationData?.submitGfForm?.confirmation], []);

  const renderSection = (section, index) => {
    switch (section.fieldGroupName) {
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Spacer':
        return (
          <ContainerBox key={index} className={`c-section--spacer c-section--spacer-${index}`}>
            <div className="c-spacer"></div>
            <style>
              {`
                .c-section--spacer-${index} .c-spacer {
                  height: ${section.mobile}rem;
                }
                @media (min-width: 992px) {
                  .c-section--spacer-${index} .c-spacer {
                    height: ${section.desktop}rem;
                  }
                }
              `}
            </style>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader':
        return (
          <ContainerBox key={index} className={`c-section--herobasic`}>
            <div className='c-herobasic'>
              <div className='c-herobasic__col'>
                <div className='c-herobasic__content'>
                {section.title && (
                  <h1 className="c-herobasic__title">
                    {section.subtitle && (
                      <div>{section.subtitle}</div>
                    )}
                    {section.title}
                  </h1>
                )}
                {section.text && (
                  <div className="c-section__desc has-herobasic" dangerouslySetInnerHTML={{__html:section.text}} />
                )}
                </div>
              </div>
              <div className="c-herobasic__col">
                <div className='c-basic-form'>
                  <div className='c-basic-form__title'>Boost your content-based business without straining your budget.</div>
                  <div className='c-basic-form__desc'>Get the guide for free!</div>
                  <div className="gform_wrapper gravity-theme">
                  <form
                    noValidate
                    className={`c-form ${
                      mutationData?.submitGfForm?.confirmation ? 'is-hidden' : ''
                    }`}
                    onSubmit={(event) => {
                      event.stopPropagation();
                      event.preventDefault();

                      // const errors = {};
                      // formFields.nodes.forEach((field) => {
                      //   if (field.isRequired && field.type === 'CHECKBOX') {
                      //     if (!fieldValues[field.databaseId] || fieldValues[field.databaseId].length === 0) {
                      //       errors[field.databaseId] = 'This field is required';
                      //     }
                      //   }
                      // });

                      // console.log(errors)
                      // if (Object.keys(errors).length > 0) {
                      //   setValidationErrors(errors);
                      //   return;
                      // }

                      const values = Object.entries(fieldValues).map(
                        ([key, value]) => {
                          let inputObject = { id: Number(key), value };

                          if (key === '6') {
                            inputObject = {
                              ...inputObject,
                              emailValues: {
                                confirmationValue: '',
                                value,
                              },
                            };
                          }
                          

                          return inputObject;
                        }
                      );

                      submitForm({
                        variables: {
                          fieldValues: values,
                        },
                      }).then(() => {
                        // Trigger download event on successful form submission
                        dataLayer.push({'event': 'download_ebook'});
                      });
                    }}
                  >
                    <div className="gform-body gform_body">
                      <div className="gform_fields top_label form_sublabel_below description_below">
                      {formFields.nodes.map((field, index) => {
                        const {
                          type,
                          inputName,
                          isRequired,
                          label,
                          placeholder,
                          databaseId,
                          visibility,
                          cssClass,
                        } = field;
                        const error = mutationData?.submitGfForm?.errors?.find(
                          (e) => e.id === databaseId
                        );

                        return (
                          <div
                            className={[
                              'gfield',
                              `gfield--type-${type.toLowerCase()}`,
                              ['textarea', 'checkbox'].includes(type.toLowerCase()) || (cssClass && cssClass.includes('has-full-width')) 
                                ? 'gfield--width-full' 
                                : 'gfield--width-half',
                              error ? 'gfield_error' : '',
                              cssClass ? cssClass : '',
                              visibility === 'HIDDEN' ? 'gfield_visibility_hidden' : 'gfield_visibility_visible',
                            ].join(' ')}
                            key={index}
                          >
                            <label
                              className="gfield_label gform-field-label"
                              htmlFor={`input_${formId}_${databaseId}`}
                            >
                              {label}{' '}
                              {isRequired ? (
                                <span className="gfield_required gfield_required_asterisk">*</span>
                              ) : (
                                ''
                              )}
                            </label>
                            <div className={`ginput_container ginput_container_${type.toLowerCase()}`}>
                              {type === 'TEXTAREA' ? (
                                <textarea
                                  placeholder={placeholder}
                                  name={inputName}
                                  value={fieldValues[databaseId]}
                                  id={`input_${formId}_${databaseId}`}
                                  className="c-textarea"
                                  aria-required={isRequired}
                                  onChange={(event) => {
                                    setFieldValues({
                                      ...fieldValues,
                                      [databaseId]: event.target.value,
                                    });
                                  }}
                                />
                              ) : (
                                <input
                                  placeholder={placeholder}
                                  name={inputName}
                                  type={convertInputType(type)}
                                  value={fieldValues[databaseId]}
                                  id={`input_${formId}_${databaseId}`}
                                  aria-required={isRequired}
                                  onChange={(event) => {
                                    setFieldValues({
                                      ...fieldValues,
                                      [databaseId]: event.target.value,
                                    });
                                  }}
                                />
                              )}
                            </div>
                            {error ? (
                              <div
                                id={`validation_message_${formId}_${databaseId}`}
                                className="gfield_description validation_message gfield_validation_message"
                              >
                                {error.message}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}

                      </div>
                    </div>
                    <div className="gform_footer top_label">
                      <button
                        type="submit"
                        disabled={loading}
                        className="c-btn c-btn--primary is-btn-dark gform_button button"
                      >
                        {loading ? <SpinnerIcon /> : 
                          ( 
                          <>
                            <span>{submitButton.text}</span>
                            <div className="c-btn__icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                  <path d="M6 18 18 6M8.25 6H18v9.75"/>
                                </g>
                              </svg>
                            </div>
                          </>
                          )
                        }
                      </button>
                    </div>
                  </form>
                  {mutationData?.submitGfForm?.confirmation ? (
                    <div className="gform_confirmation_message">
                      <p className="c-confirmation__text">
                      Thanks! Your download will start in a few seconds
                      </p>
                      <p className='c-confirmation__text has-dl-link'>
                        Download not starting? Try this <a id="download-link" href="https://refact.co/downloads/website-maintenance-guide.pdf" target="_blank" rel="noreferrer">direct download Link</a>
                      </p>
                    </div>
                  ) : null}
                </div>
                </div>
              </div>
            </div>
            <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
            <PatternBg pattern="heroPatternBig" className='is-hero-pattern' />
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextSection':
        return (
          <ContainerBox key={index} className={`c-section--basictext`}>
            <div className='c-basictext'>
              <div className='c-basictext__content'>
                {section.title && (
                  <h2 className="c-section__title">{section.title}</h2>
                )}
                {section.description && (
                  <div className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}} />
                )}
              </div>
              {section.images && (
                <div className="c-basictext__images">
                  {section.images.map((image, index) => (
                    <div className="c-basictext__image" key={index}>
                      <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ContainerBox>
        )
      // case 'Template_PageBuilder_Pagebuilder_PageBuilder_Hero':
      //   return (
      //     <ContainerBox key={index} className={`c-section--basichero`}>
      //       <div className='c-basichero'>
      //         <div className='c-basichero__content'>
      //           {section.title && (
      //             <h1 className="c-hero__title">{section.title}</h1>
      //           )}
      //           {section.text && (
      //             <div className="c-section__desc" dangerouslySetInnerHTML={{__html:section.text}} />
      //           )}
      //         </div>
      //         {section.image && (
      //           <div className="c-basichero__images">
      //             <div className='c-basichero-p is-left'>
      //               <svg xmlns="http://www.w3.org/2000/svg" width="488" height="488" fill="none" viewBox="0 0 488 488"><g filter="url(#a-1)"><circle cx="244" cy="244" r="127" fill="url(#b-1)"/></g><defs><radialGradient id="b-1" cx="0" cy="0" r="1" gradientTransform="rotate(90 0 244) scale(127)" gradientUnits="userSpaceOnUse"><stop stopColor="#09726E"/><stop offset="1" stopColor="#12CBC4" stopOpacity="0"/></radialGradient><filter id="a-1" width="487" height="487" x=".5" y=".5" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_831_36" stdDeviation="58.25"/></filter></defs></svg>
      //             </div>
      //             <div className='c-basichero-p is-right'>
      //               <svg xmlns="http://www.w3.org/2000/svg" width="488" height="488" fill="none" viewBox="0 0 488 488"><g filter="url(#a-2)"><circle cx="244" cy="244" r="127" fill="url(#b-2)"/></g><defs><radialGradient id="b-2" cx="0" cy="0" r="1" gradientTransform="rotate(90 0 244) scale(127)" gradientUnits="userSpaceOnUse"><stop stopColor="#09726E"/><stop offset="1" stopColor="#12CBC4" stopOpacity="0"/></radialGradient><filter id="a-2" width="487" height="487" x=".5" y=".5" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_831_36" stdDeviation="58.25"/></filter></defs></svg>
      //             </div>
      //             <GatsbyImage image={section.image.localFile.childrenImageSharp[0].gatsbyImageData} alt={section.image.altText} />
      //           </div>
      //         )}
      //       </div>
      //       <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
      //       <PatternBg pattern="heroPatternBig" className='is-hero-pattern' />
      //     </ContainerBox>
      //   )
      // case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextButton':
      //   return (
      //     <ContainerBox key={index} className={`c-section--basictext has-form`}>
      //      <div className='c-basictext'>
      //        <div className='c-basictext__content'>
      //          {section.title && (
      //            <h2 className="c-section__title" dangerouslySetInnerHTML={{__html:section.title}} />
      //          )}
      //          {section.description && (
      //            <div className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}} />
      //          )}
      //        </div>
      //         <div className="c-basictext__form">
      //         <div className='c-basic-form'>
      //             <div className="gform_wrapper gravity-theme">
      //             <form
      //               noValidate
      //               className={`c-form ${
      //                 mutationData?.submitGfForm?.confirmation ? 'is-hidden' : ''
      //               }`}
      //               onSubmit={(event) => {
      //                 event.stopPropagation();
      //                 event.preventDefault();

      //                 // const errors = {};
      //                 // formFields.nodes.forEach((field) => {
      //                 //   if (field.isRequired && field.type === 'CHECKBOX') {
      //                 //     if (!fieldValues[field.databaseId] || fieldValues[field.databaseId].length === 0) {
      //                 //       errors[field.databaseId] = 'This field is required';
      //                 //     }
      //                 //   }
      //                 // });

      //                 // console.log(errors)
      //                 // if (Object.keys(errors).length > 0) {
      //                 //   setValidationErrors(errors);
      //                 //   return;
      //                 // }

      //                 const values = Object.entries(fieldValues).map(
      //                   ([key, value]) => {
      //                     let inputObject = { id: Number(key), value };

      //                     if (key === '6') {
      //                       inputObject = {
      //                         ...inputObject,
      //                         emailValues: {
      //                           confirmationValue: '',
      //                           value,
      //                         },
      //                       };
      //                     }
                          

      //                     return inputObject;
      //                   }
      //                 );

      //                 submitForm({
      //                   variables: {
      //                     fieldValues: values,
      //                   },
      //                 });
      //               }}
      //             >
      //               <div className="gform-body gform_body">
      //                 <div className="gform_fields top_label form_sublabel_below description_below">
      //                 {formFields.nodes.map((field, index) => {
      //                   const {
      //                     type,
      //                     inputName,
      //                     isRequired,
      //                     label,
      //                     placeholder,
      //                     databaseId,
      //                     visibility,
      //                     cssClass,
      //                   } = field;
      //                   const error = mutationData?.submitGfForm?.errors?.find(
      //                     (e) => e.id === databaseId
      //                   );

      //                   return (
      //                     <div
      //                       className={[
      //                         'gfield',
      //                         `gfield--type-${type.toLowerCase()}`,
      //                         ['textarea', 'checkbox'].includes(type.toLowerCase()) || (cssClass && cssClass.includes('has-full-width')) 
      //                           ? 'gfield--width-full' 
      //                           : 'gfield--width-full',
      //                         error ? 'gfield_error' : '',
      //                         cssClass ? cssClass : '',
      //                         visibility === 'HIDDEN' ? 'gfield_visibility_hidden' : 'gfield_visibility_visible',
      //                       ].join(' ')}
      //                       key={index}
      //                     >
      //                       <label
      //                         className="gfield_label gform-field-label"
      //                         htmlFor={`input_${formId}_${databaseId}`}
      //                       >
      //                         {label}{' '}
      //                         {isRequired ? (
      //                           <span className="gfield_required gfield_required_asterisk">*</span>
      //                         ) : (
      //                           ''
      //                         )}
      //                       </label>
      //                       <div className={`ginput_container ginput_container_${type.toLowerCase()}`}>
      //                         {type === 'TEXTAREA' ? (
      //                           <textarea
      //                             placeholder={placeholder}
      //                             name={inputName}
      //                             value={fieldValues[databaseId]}
      //                             id={`input_${formId}_${databaseId}`}
      //                             className="c-textarea"
      //                             aria-required={isRequired}
      //                             onChange={(event) => {
      //                               setFieldValues({
      //                                 ...fieldValues,
      //                                 [databaseId]: event.target.value,
      //                               });
      //                             }}
      //                           />
      //                         ) : (
      //                           <input
      //                             placeholder={placeholder}
      //                             name={inputName}
      //                             type={convertInputType(type)}
      //                             value={fieldValues[databaseId]}
      //                             id={`input_${formId}_${databaseId}`}
      //                             aria-required={isRequired}
      //                             onChange={(event) => {
      //                               setFieldValues({
      //                                 ...fieldValues,
      //                                 [databaseId]: event.target.value,
      //                               });
      //                             }}
      //                           />
      //                         )}
      //                       </div>
      //                       {error ? (
      //                         <div
      //                           id={`validation_message_${formId}_${databaseId}`}
      //                           className="gfield_description validation_message gfield_validation_message"
      //                         >
      //                           {error.message}
      //                         </div>
      //                       ) : null}
      //                     </div>
      //                   );
      //                 })}

      //                 </div>
      //               </div>
      //               <div className="gform_footer top_label">
      //                 <button
      //                   type="submit"
      //                   disabled={loading}
      //                   className="c-btn c-btn--primary is-btn-light gform_button button"
      //                 >
      //                   {loading ? <SpinnerIcon /> : 
      //                     ( 
      //                     <>
      //                       <span>{submitButton.text}</span>
      //                       <div className="c-btn__icon">
      //                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      //                           <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      //                             <path d="M6 18 18 6M8.25 6H18v9.75"/>
      //                           </g>
      //                         </svg>
      //                       </div>
      //                     </>
      //                     )
      //                   }
      //                 </button>
      //               </div>
      //             </form>
      //             {mutationData?.submitGfForm?.confirmation ? (
      //               <div className="gform_confirmation_message">
      //                 <p className="c-confirmation__text">
      //                 Thanks! Your download will start in a few seconds
      //                 </p>
      //                 <p className='c-confirmation__text has-dl-link'>
      //                   Download not starting? Try this <a id="download-link" href="https://refact.co/downloads/website-maintenance-guide.pdf" target="_blank" rel="noreferrer">direct download Link</a>
      //                 </p>
      //               </div>
      //             ) : null}
      //           </div>
      //           </div>
      //         </div>
      //      </div>
      //     </ContainerBox>
      //   )
      default:
        return null
    }
  }
  const backtobasicContent = data.wpPage.template.pageBuilder.pageBuilder;
  return (
    <Layout>
      {backtobasicContent.map((section, index) => (
          renderSection(section, index)
      ))}
    </Layout>
  );
};

export default BackToBasics;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} featuredImage={post.seo.opengraphImage.localFile.url} />
    </>
  );
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "publisher-website-solutions"}) {
      id
      seo {
        title
        metaDesc
        opengraphImage {
          localFile {
            url
          }
        }
      }
      template {
        ... on WpTemplate_PageBuilder {
          templateName
          pageBuilder {
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                fieldGroupName
                subtitle
                text
                title
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                description
                fieldGroupName
                images {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                title
                subHeading
                moreFeatures
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                desktop
                fieldGroupName
                mobile
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Hero {
                fieldGroupName
                text
                title
                image {
                  altText
                  localFile {
                    childrenImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextButton {
                description
                fieldGroupName
                title
              }
            }
          }
        }
      }
    }
    wpGfForm(databaseId: { eq: 13 }) {
      submitButton {
        text
        type
        location
      }
      formFields {
        nodes {
          type
          layoutGridColumnSpan
          pageNumber
          databaseId
          ... on WpTextField {
            inputName
            isRequired
            label
            placeholder
            cssClass
            visibility
          }
          ... on WpEmailField {
            inputName
            isRequired
            label
            placeholder
          }
          ... on WpPhoneField {
            adminLabel
            autocompleteAttribute
            label
            isRequired
            inputName
          }
        }
      }
    }
  }
`;
