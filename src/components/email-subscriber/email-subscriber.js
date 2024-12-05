import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import { useStaticQuery, graphql } from 'gatsby';
import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import SpinnerIcon from '../spinner/spinner';
import PatternBg from '../patterns/pattern-bg';

const EmailSubscriber = () => {
  const data = useStaticQuery(graphql`
    query SubscribeInsightQuery {
      subscribeInsight: wpGfForm(databaseId: {eq: 12}) {
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
            ... on WpEmailField {
              inputName
              isRequired
              label
              placeholder
            }
          }
        }
      }
    }
  `);

  const [showBox, setShowBox] = useState(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);



  const initialFieldValues = data.subscribeInsight.formFields.nodes.reduce((acc, field) => {
    if (field.type === 'SELECT' && field.choices.length > 0) {
      acc[field.databaseId] = field.placeholder;
    } else {
      acc[field.databaseId] = field.defaultValue ?? '';
    }
    return acc;
  }, {});

  const [fieldValues, setFieldValues] = useState(initialFieldValues);
  const formId = 12;

  const { submitButton, formFields } = data.subscribeInsight;

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
            id: 12
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
    const subscriptionStatus = Cookie.get('subscription-status');

    // Hide the box if the user has already subscribed or dismissed it
    if (subscriptionStatus === 'subscribed' || subscriptionStatus === 'dismissed') {
      setShowBox(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const subscriptionStatus = Cookie.get('subscription-status');

      // Prevent showing the box if the user has already dismissed or subscribed
      if (subscriptionStatus === 'subscribed' || subscriptionStatus === 'dismissed') {
        setShowBox(false);
        return;
      }
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const pageHeight = document.body.clientHeight;
      const contentElement = document.querySelector('.c-article__content-wrapper');
      const scrollPercentage =
        (scrollPosition / (pageHeight - windowHeight)) * 100;

      if (!successfulSubmit && scrollPercentage >= 10) {
        setShowBox(true);
      } 
      else {
        setShowBox(false);
      }
      const contentBottomPosition = contentElement
        ? contentElement.offsetTop + contentElement.offsetHeight
        : 0;

      if (scrollPosition + windowHeight >= contentBottomPosition) {
        setShowBox(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [successfulSubmit]);

  // CSS class to add a fade-in transition
  const emailSubscriberClass = [
    'c-email-subscriber c-newsletter-form',
    showBox ? 'c-email-subscriber--show' : '',
    `c-email-subscriber--sticky`,
  ].join(' ');

  return (
    <div className={emailSubscriberClass}>
      <button 
        className="c-email-subscriber__close" 
        aria-label='Close' 
        onClick={() => {
          setShowBox(false);
          Cookie.set('subscription-status', 'dismissed', { expires: 7 });
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Zm3.53 12.22a.75.75 0 1 1-1.06 1.06L12 13.06l-2.47 2.47a.75.75 0 1 1-1.06-1.06L10.94 12 8.47 9.53a.75.75 0 0 1 1.06-1.06L12 10.94l2.47-2.47a.751.751 0 0 1 1.06 1.06L13.06 12l2.47 2.47Z"/></svg>
      </button>
      {successfulSubmit ? (
         <>
         {mutationData?.submitGfForm?.confirmation ? (
          <p className="c-email-subscriber__success-message" dangerouslySetInnerHTML={{ __html: mutationData.submitGfForm.confirmation.message }} />
        ) : null}
         </>
      ) : (
        <>
          <div className="c-email-subscriber__info">
            <h4 className="c-email-subscriber__title">Enjoying this post?</h4>
            <p className="c-email-subscriber__text">
              Subscribe and receive more along with updates from us.
            </p>
          </div>
          <div className="c-email-subscriber-form__wrap">
            <div className="gform_wrapper gravity-theme">
              <form
                noValidate
                className={`c-form c-newsletter-form__box ${
                  mutationData?.submitGfForm?.confirmation ? 'is-hidden' : ''
                }`}
                onSubmit={(event) => {
                  event.stopPropagation();
                  event.preventDefault();

                  // Prepare field values for the Gravity Forms mutation
                  const values = Object.entries(fieldValues).map(([key, value]) => {
                    let inputObject = { id: Number(key), value };

                    // Special handling for email field with key '1'
                    if (key === '1') {
                      inputObject = {
                        ...inputObject,
                        emailValues: {
                          confirmationValue: '', // If you require email confirmation
                          value,
                        },
                      };
                    }

                    return inputObject;
                  });

                  // Trigger the Gravity Forms mutation using Apollo's useMutation hook
                  submitForm({
                    variables: {
                      fieldValues: values, // Pass the prepared field values
                    },
                  })
                    .then((response) => {
                      const confirmation = response?.data?.submitGfForm?.confirmation;
                  
                      if (confirmation) {
                        // On successful submission
                        setSuccessfulSubmit(true);
                  
                        // Set a cookie to remember the subscription status
                        Cookie.set('subscription-status', 'subscribed', { expires: 7 });
                  
                        // Optionally hide the subscription box after a few seconds
                        setTimeout(() => {
                          setShowBox(false);
                        }, 10000);
                      }
                    })
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
                          'gfield--width-full',
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
                    className="c-btn c-btn--primary is-btn-dark c-btn--newsletter"
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
                <div className="c-newsletter-form__success-message" dangerouslySetInnerHTML={{ __html: mutationData.submitGfForm.confirmation.message }} />
              ) : null}
            </div>
          </div>
        </>
      )}
      <PatternBg pattern='subScribeBox' className='is-highlight-sub' />
    </div>
  );
};

export default EmailSubscriber;
