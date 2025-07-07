const form = document.getElementById("user-form");
const personalNumber = form.querySelector("#personal-number");
const email = form.querySelector("#email");
const password = form.querySelector("#password");
const successDialog = document.getElementById("success-dialog");
const closeSuccessDialog = successDialog.querySelector(".close");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const validPersonalNumber = validatePersonalNumber();
  const validEmail = validateEmail();
  const validPassword = validatePassword();
  if (validPersonalNumber && validEmail && validPassword) {
    successDialog.showModal();
    form.reset();
    setTimeout(() => {
      successDialog.close();
      clearValidation();
    }, 5000);
  }
});

closeSuccessDialog.addEventListener("click", () => {
  successDialog.close();
  clearValidation();
});

function clearValidation() {
  const formGroups = form.querySelectorAll(".form-group");
  formGroups.forEach((group) => {
    group.classList.remove("error", "success");
    group.querySelector(".message").textContent = "";
  });
}
function isEmpty(input) {
  return input.validity.valueMissing || input.value.trim() === "";
}

function setError(element, message) {
  element.closest(".form-group").classList.remove("success");
  element.closest(".form-group").classList.add("error");
  element.closest(".form-group").querySelector(".message").textContent =
    message;
}
function setSuccess(element, message) {
  element.closest(".form-group").classList.remove("error");
  element.closest(".form-group").classList.add("success");
  element.closest(".form-group").querySelector(".message").textContent =
    message;
}

function validatePersonalNumber() {
  const personalNumberValue = personalNumber.value.trim();
  if (isEmpty(personalNumber)) {
    setError(personalNumber, "Personal number is required");
    return false;
  } else if (!/^\d{11}$/.test(personalNumberValue)) {
    setError(personalNumber, "Personal number must be 11 digits");
    return false;
  } else {
    setSuccess(personalNumber, "Personal number is valid");
    return true;
  }
}

// function validatePersonalNumber() {
//   const personalNumberValue = personalNumber.value.trim();
//   if (isEmpty(personalNumber)) {
//     setError(personalNumber, "Personal number is required");
//     return false;
//   } else if (personalNumberValue.length !== 11 || isNaN(personalNumberValue)) {
//     setError(personalNumber, "Personal number must be 11 digits");
//     return false;
//   } else {
//     setSuccess(personalNumber, "Personal number is valid");
//     return true;
//   }
// }

function validateEmail() {
  const emailValue = email.value.trim();
  if (isEmpty(email)) {
    setError(email, "Email is required");
    return false;
  } else if (!emailValue.endsWith("@gmail.com")) {
    setError(email, "Email must end with @gmail.com");
    return false;
  } else {
    setSuccess(email, "Email is valid");
    return true;
  }
}

function validatePassword() {
  const passwordValue = password.value.trim();
  if (isEmpty(password)) {
    setError(password, "Password is required");
    return false;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters long");
    return false;
  } else {
    setSuccess(password, "Password is valid");
    return true;
  }
}

personalNumber.addEventListener("input", validatePersonalNumber);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
