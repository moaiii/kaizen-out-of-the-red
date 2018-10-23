import ReactGA from 'react-ga';

export const initialise = () => {
  ReactGA.initialize('xxxx', {
    debug: false,
    titleCase: false,
    gaOptions: {
      // userId: uid,
      // email: email,
      // name: `${ firstname } ${ lastname }`
    }
  });
};

export const trackPage = () => {
  initialise();
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const trackEvent = () => {
  initialise();
};