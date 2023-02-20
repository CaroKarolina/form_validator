const userNameInputElement = document.getElementById("username");
const passwordInputElement = document.getElementById("password");
const password2InputElement = document.getElementById("password2");
const emailInputElement = document.getElementById("email");
const clearBtnElement = document.querySelector(".clear");
const sendBtnElement = document.querySelector(".send");
const popupDivElement = document.querySelector(".popup");

const inputInFormElements = document.querySelectorAll(".form-box input");

const checkForm = () => {
  inputInFormElements.forEach((el) => {
    if (el.value === "") infoError(el, el.placeholder);
    else {
      clearError(el);
      el.type === "text"
        ? checkLength(el, 3)
        : el.type === "password"
        ? checkPassword(el)
        : el.type === "email"
        ? checkEmail(el)
        : false;
    }
  });
};

const checkLength = (userData, min) => {
  const elName = userData.previousElementSibling.textContent
    .toLowerCase()
    .slice(0, -1);

  if (userData.value.length < min)
    infoError(
      userData,
      `Pole ${elName} powinno składać się z min. ${min} znaków`
    );
};

let pass = "";
const checkPassword = (password) => {
  if (!pass || pass === password.value) checkLength(password, 8);
  else infoError(password, "Podane hasła różnią się");
  pass = password.value;
  return pass;
};

const checkEmail = (email) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(email.value)) {
    clearError(email);
  } else infoError(email, "Adres email jest niepoprawny.");
};

const infoError = (inputError, errorMsg) => {
  inputError.parentNode.classList.add("error-box");
  inputError.nextElementSibling.textContent = errorMsg;
};

const clearError = (inputError) => {
  inputError.parentNode.classList.remove("error-box");
};

clearBtnElement.addEventListener("click", (e) => {
  e.preventDefault();
  inputInFormElements.forEach((el) => {
    el.value = "";
    clearError(el);
  });
});

const sendBtnHandler = (e) => {
  e.preventDefault();
  checkForm();
  sendForm();
};
sendBtnElement.addEventListener("click", sendBtnHandler);

//wysyłka formularza, gdy liczba błędów === 0 :
const sendForm = () => {
  const formBoxListEl = Array.from(document.querySelectorAll(".form-box"));
  const errorCounter = formBoxListEl.filter((el) =>
  el.className.includes("error-box")
  ).length;
  if (!errorCounter) {
    popupDivElement.classList.add("show-popup");
  } else if (errorCounter !== 0) {
    return;
  }
};
