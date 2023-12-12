import { useEffect } from 'react';

const useStickyHeader = () => {
  useEffect(() => {
    let customElementDefined = false;
    class StickyHeader extends HTMLElement {
      connectedCallback() {
        this.header = document.querySelector('.js-site-header');
        this.headerBounds = {};
        this.currentScrollTop = 0;
        this.onScrollHandler = this.onScroll.bind(this);
    
        window.addEventListener('scroll', this.onScrollHandler, false);
    
        this.createObserver();
      }
    
      disconnectedCallback() {
        window.removeEventListener('scroll', this.onScrollHandler);
      }
    
      createObserver() {
        let observer = new IntersectionObserver((entries, observer) => {
          this.headerBounds = entries[0].intersectionRect;
          observer.disconnect();
        });
    
        observer.observe(this.header);
      }
    
      onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let headerHeight = document.querySelector('.js-navigation').offsetHeight;
    
        document.querySelector('#gatsby-focus-wrapper').classList.add('is-sticky');
        if (window.scrollY > headerHeight){
          if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
            requestAnimationFrame(this.hide.bind(this));
          } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
            requestAnimationFrame(this.reveal.bind(this));
          } else if (scrollTop <= this.headerBounds.top) {
            requestAnimationFrame(this.reset.bind(this));
          }
        }
        else{
          requestAnimationFrame(this.reset.bind(this));
        }
    
        this.currentScrollTop = scrollTop;
      }
    
      hide() {
        this.header.classList.add('refact-section-header-hidden', 'refact-section-header-sticky');
         document.querySelector('#gatsby-focus-wrapper').classList.add('is-sticky');
         document.getElementsByTagName('html')[0].classList.add('has-sticky-header');
      }
    
      reveal() {
        this.header.classList.add('refact-section-header-sticky', 'animate');
        document.querySelector('#gatsby-focus-wrapper').classList.add('is-sticky');
        this.header.classList.remove('refact-section-header-hidden');
        this.header.classList.add('is-reset');
        document.getElementsByTagName('html')[0].classList.remove('has-sticky-header');
      }
    
      reset() {
        this.header.classList.remove('is-reset');
      }
    }

    if (!customElementDefined && !customElements.get('sticky-header')) {
      // Define the custom element
      customElements.define('sticky-header', StickyHeader);
      customElementDefined = true;
    }

    return () => {

    };
  }, []);

  return null; // You can return any JSX if needed
};

export default useStickyHeader;
