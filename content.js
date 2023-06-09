function zackprotect() {
    // password and username variables...
    var pass = localStorage["password"];
    var local_user = localStorage["userName"];

    // Create HTML interface for password prompt
    var container = document.createElement("div");
    var left_column = document.createElement("div");
    var right_column = document.createElement("div");
    var logo = document.createElement("img");
    var company_name = document.createElement("h1");

    var userLabel = document.createElement("label");
    var userInput = document.createElement("input");
    var passwordLabel = document.createElement("label");
    var passwordInput = document.createElement("input");
    var submitButton = document.createElement("button");
    var errorLabel = document.createElement("label");
    var br = document.createElement("br");
    var hr = document.createElement("hr");
    var form = document.createElement("form");
    var head = document.getElementsByTagName("head");
    var registerLable = document.createElement("h1");

    company_name.textContent = "";
    container.appendChild(br);
    if (pass == undefined || local_user == undefined) {
        registerLable.textContent = "register to use zack protect";
        userInput.setAttribute("placeholder", "set User name");
        passwordInput.setAttribute("placeholder", "set your password");
        submitButton.textContent = "Sign up";
        errorLabel.textContent = "registered successfully";
    } else {
        registerLable.textContent = "Login to whatsapp";
        userInput.value = local_user;
        userInput.disabled = "true";
        submitButton.textContent = "Login";
        errorLabel.textContent = "Incorrect password. Please try again.";
        errorLabel.style.color = "red";
    }

    userLabel.textContent = "User name";
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "user");
    passwordLabel.textContent = "Pasword:";
    passwordInput.type = "password";
    errorLabel.style.display = "none";
    logo.src = chrome.runtime.getURL("images/icon.png");
    logo.alt = "Logo";

    container.appendChild(left_column);
    container.appendChild(right_column);
    left_column.appendChild(logo);
    left_column.appendChild(company_name);
    right_column.appendChild(form);

    form.appendChild(registerLable);
    form.appendChild(hr);
    form.appendChild(userLabel);
    form.appendChild(userInput);

    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);

    form.appendChild(errorLabel);
    form.appendChild(submitButton);

    container.style.position = "fixed";
    container.style.height = "40vh";
    container.style.width = "70vh";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    container.style.backgroundColor = "white";
    container.style.paddingRight = "20px";
    container.style.borderRadius = "5px";
    container.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "row";
    container.style.userScalable = "no";
    //form
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.top = "50%";
    form.style.left = "50%";
    form.style.padding = "20px";
    form.style.userScalable = "no";

    //left_column
    registerLable.style.color = "darkgreen";
    left_column.style.backgroundColor = "#C7EA46";
    left_column.style.width = "30%";
    left_column.style.height = "100%";
    left_column.style.alignItems = "center";
    left_column.style.justifyContent = "center";
    left_column.style.display = "flex";
    left_column.style.flexDirection = "column";

    //right column
    right_column.style.width = "70%";

    right_column.style.height = "100%";
    right_column.style.display = "flex";
    right_column.style.justifyContent = "center";
    right_column.style.alignItems = "center";
    left_column.style.flexDirection = "column";

    //logo
    // logo.style.width = "127.35px";
    logo.style.height = "120.1px";
    logo.style.position = "fixed";

    //company name
    company_name.style.fontSize = "2em";
    company_name.style.paddingBottom = "10px";
    company_name.style.paddingTop = "10px";

    //label
    userLabel.style.marginBottom = "10px";
    userLabel.style.marginBottom = "10px";
    errorLabel.style.marginBotton = "10px";

    //inputs
    passwordInput.style.padding = "10px";
    passwordInput.style.marginBottom = "20px";
    passwordInput.style.borderRadius = "7px";

    //inputs
    userInput.style.padding = "10px";
    userInput.style.marginBottom = "20px";
    userInput.style.borderRadius = "7px";

    //button
    submitButton.style.padding = "10px";
    submitButton.style.borderRadius = "5px";
    submitButton.style.backgroundColor = "#C7EA46";
    submitButton.style.color = "black";
    submitButton.style.cursor = "pointer";
    submitButton.style.border = "none";

    submitButton.addEventListener("mouseover", function () {
        submitButton.style.backgroundColor = "darkgreen";
        submitButton.style.color = "white";
        submitButton.style.border = "none";
    });

    submitButton.addEventListener("mouseout", function () {
        submitButton.style.padding = "10px";
        submitButton.style.borderRadius = "5px";
        submitButton.style.backgroundColor = "#C7EA46";
        submitButton.style.color = "black";
        submitButton.style.cursor = "pointer";
    });

    // Create blurred background
    var blur = document.createElement("div");
    blur.style.position = "fixed";
    blur.style.top = "0";
    blur.style.left = "0";
    blur.style.width = "100%";
    blur.style.height = "100%";
    blur.style.backgroundColor = "rgba(0,0,0,0.5)";
    blur.style.backdropFilter = "blur(5px)";
    blur.style.zIndex = "9998";

    // Add HTML interface and blurred background to the page
    document.body.appendChild(blur);
    document.body.appendChild(container);
    passwordInput.focus();

    // Add event listener to submit button
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        var password = passwordInput.value;
        var user = userInput.value;

        if (pass == undefined || user == undefined) {
            if (password !== "" && user !== "") {
                localStorage["password"] = SHA256(password);
                localStorage["userName"] = user;
                errorLabel.style.display = "block";
                errorLabel.style.color = "darkgreen";
                errorLabel.textContent = "registered successfully!!";
                errorLabel.style.display = "block";
            } else {
                errorLabel.style.color = "red";
                errorLabel.textContent = "user or passwors is empty!!";
                errorLabel.style.display = "block";
                // Wait for 5 seconds (5000 milliseconds) and then refresh the page
                setTimeout(function () {
                    errorLabel.style.display = "none";
                }, 1000);
            }
        } else {
            if (SHA256(password) !== pass || user !== local_user) {
                // Display error message if password is incorrect
                errorLabel.style.color = "red";
                errorLabel.style.display = "block";
            } else {
                // Remove HTML interface and blurred background from the page after password is entered
                document.body.removeChild(blur);
                document.body.removeChild(container);
            }
        }
    });
}

zackprotect();
