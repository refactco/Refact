import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import { useStaticQuery, graphql } from 'gatsby';
import React, { useState } from 'react';
import SpinnerIcon from '../spinner/spinner';

const NewsletterForm = () => {
  const data = useStaticQuery(graphql`
    query SubscribeFormQuery {
      subscribeForm: wpGfForm(databaseId: {eq: 11}) {
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


    const initialFieldValues = data.subscribeForm.formFields.nodes.reduce((acc, field) => {
      if (field.type === 'SELECT' && field.choices.length > 0) {
        acc[field.databaseId] = field.placeholder;
      } else {
        acc[field.databaseId] = field.defaultValue ?? '';
      }
      return acc;
    }, {});
  
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    const formId = 11;

    const { submitButton, formFields } = data.subscribeForm;

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
              id: 11
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
  

  // CSS class to add a fade-in transition
  const emailSubscriberClass = [
    'c-newsletter-form',
  ].join(' ');

  return (
    <div className={emailSubscriberClass}>
      <div className="gform_wrapper gravity-theme">
        <form
          noValidate
          className={`c-form c-newsletter-form__box ${
            mutationData?.submitGfForm?.confirmation ? 'is-hidden' : ''
          }`}
          onSubmit={(event) => {
            event.stopPropagation();
            event.preventDefault();

            const values = Object.entries(fieldValues).map(
              ([key, value]) => {
                let inputObject = { id: Number(key), value };

                if (key === '1') {
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
      <div className={`c-newsletter-form__wrap ${
            mutationData?.submitGfForm?.confirmation ? 'is-hidden' : ''
          }`}>
        <p>No Spam. Unsubscribe any time.</p>
      </div>
    </div>
  );
};

export default NewsletterForm;
