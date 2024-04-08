(function(){
    emailjs.init({
        publicKey: 'nbGwUwTeGKM9Fmpbu',
        // Do not allow headless browsers
        blockHeadless: true,
        blockList: {
          // Block the suspended emails
          list: ['foo@emailjs.com', 'bar@emailjs.com'],
          // The variable contains the email address
          watchVariable: 'userEmail',
        },
        limitRate: {
          // Set the limit rate for the application
          id: 'app',
          // Allow 1 request per 10s
          throttle: 10000,
        },
      });

    //   var templateParams = {
    //     to_name: 'James',
    //     from_name: 'Hello',
    //     message: 'New Message'
    //   };
      
    //   emailjs.send('service_vzs7akv', 'template_w5xr9hp', templateParams).then(
    //     (response) => {
    //       console.log('SUCCESS!', response.status, response.text);
    //     },
    //     (error) => {
    //       console.log('FAILED...', error);
    //     },
    //   );
      
})();