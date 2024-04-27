(function () {
    emailjs.init({
        publicKey: "nbGwUwTeGKM9Fmpbu",
        // Do not allow headless browsers
        blockHeadless: true,
        blockList: {
            // Block the suspended emails
            list: ["foo@emailjs.com", "bar@emailjs.com"],
            // The variable contains the email address
            watchVariable: "userEmail",
        },
        limitRate: {
            // Set the limit rate for the application
            id: "app",
            // Allow 1 request per 10s
            throttle: 10000,
        },
    });

    // Contact form validations
    let nameInput = document.querySelector("input#name");
    let emailInput = document.querySelector("input#email");
    let queryInput = document.querySelector("textarea#query");
    let formMessage = document.querySelector(".form-message");

    nameInput.value = "";
    emailInput.value = "";
    queryInput.value = "";

    document.querySelector(".submit-btn").addEventListener("click", function () {

        let isNameValid = false;
        let isEmailValid = false;
        let isQueryValid = false;

        if(nameInput.value == "") {
            nameInput.nextElementSibling.innerText = "* please enter valid name";
            isNameValid = false;
        } else {
            nameInput.nextElementSibling.innerText = "";
            isNameValid = true
        }

        if(!emailInput.value.match(/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/)){
            emailInput.nextElementSibling.innerText = "* please enter a valid email";
            isEmailValid = false;
        } else {
            emailInput.nextElementSibling.innerText = "";
            isEmailValid = true;
        }

        if(queryInput.value == "") {
            queryInput.nextElementSibling.innerText = "* please enter something";
            isQueryValid = false;
        } else {
            queryInput.nextElementSibling.innerText = "";
            isQueryValid = true;
        }

        if(isNameValid && isEmailValid && isQueryValid) {
              var templateParams = {
                to_name: 'Avneet',
                from_name: `${nameInput.value} -- ${emailInput.value}`,
                message: queryInput.value
              };

              //template_w5xr9hp
              emailjs.send('service_vzs7akv', 'template_w5xr9hp', templateParams).then(
                (response) => {
                  console.log('SUCCESS!', response.status, response.text);
                  formMessage.classList.add('success');
                  formMessage.classList.remove('error');
                  formMessage.innerText = "Your enquiry has been sent!";
                },
                (error) => {
                  console.log('FAILED...', error);
                  formMessage.classList.remove('success');
                  formMessage.classList.add('error');
                  formMessage.innerText = "Some error occured, Please send me an email on avneetvirdi26@gmail.com";
                },
              );
        }
    });
})();
