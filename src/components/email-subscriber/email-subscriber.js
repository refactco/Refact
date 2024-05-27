import axios from 'axios';
import Cookie from 'js-cookie';
import React, { useEffect, useState } from 'react';

const EmailSubscriber = () => {
  const [email, setEmail] = useState('');
  const [showBox, setShowBox] = useState(false);
  const [position, setPosition] = useState('sticky');
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

        setTimeout(() => {
          setShowBox(false);
        }, 5000);
      })
      .catch(() => {
        setErrorSubmit(true);
      })
      .finally(() => {
        setSubmitInProgress(false);
      });
  };

  useEffect(() => {
    const alreadySubscribed = Cookie.get('already-subscribed');

    if (alreadySubscribed === 'Yes') {
      setShowBox(true);
      setPosition('static');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
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
    'c-email-subscriber',
    showBox ? 'c-email-subscriber--show' : '',
    `c-email-subscriber--${position}`,
  ].join(' ');

  return (
    <div className={emailSubscriberClass}>
      {successfulSubmit ? (
        <p className="c-email-subscriber__success-message">
          Thank you for subscribing! An email is on its way to you.
        </p>
      ) : (
        <>
          <div className="c-email-subscriber__info">
            <h4 className="c-email-subscriber__title">Enjoying this post?</h4>
            <p className="c-email-subscriber__text">
              Subscribe and receive more along with updates from us.
            </p>
          </div>
          <div className="c-email-subscriber-form__wrap">
            <div className="c-email-subscriber__form">
              <input
                value={email}
                placeholder="Enter email address"
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <button
                className="c-btn c-btn--subscriber"
                disabled={submitInProgress}
                onClick={() => {
                  subscribe();
                }}
              >
                {submitInProgress ? 'Progressing...' : 'Subscribe'}
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

export default EmailSubscriber;
