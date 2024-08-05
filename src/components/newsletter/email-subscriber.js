import axios from 'axios';
import Cookie from 'js-cookie';
import React, { useState } from 'react';
import SpinnerIcon from '../spinner/spinner';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  const subscribe = () => {
    setSubmitInProgress(true);

    const formId = '5682967';
    const apiKey = 'qRD0l7FwkaZtCWkgmvuxig';

    axios
      .post(
        `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
        {
          api_key: apiKey,
          email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            charset: 'utf-8',
          },
        }
      )
      .then(() => {
        setSuccessfulSubmit(true);

        Cookie.set('already-subscribed', 'Yes', {
          expires: 7,
        });

      })
      .catch(() => {
        setErrorSubmit(true);
      })
      .finally(() => {
        setSubmitInProgress(false);
      });
  };


  // CSS class to add a fade-in transition
  const emailSubscriberClass = [
    'c-newsletter-form',
  ].join(' ');

  return (
    <div className={emailSubscriberClass}>
      {successfulSubmit ? (
        <p className="c-newsletter-form__success-message">
          Thank you for subscribing! An email is on its way to you.
        </p>
      ) : (
        <>
          <div className="c-newsletter-form__wrap">
            <div className="c-newsletter-form__box">
              <input
                value={email}
                placeholder="Enter email address"
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <button
                className="c-btn c-btn--newsletter"
                disabled={submitInProgress}
                onClick={() => {
                  subscribe();
                }}
              >
                {submitInProgress ? <SpinnerIcon /> : 'Subscribe'}
              </button>
            </div>
            {errorSubmit ? (
              <p>
                Oops! We encountered an error while processing your
                subscription.
              </p>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsletterForm;
