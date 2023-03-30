const nameInput = document.querySelector(".form-A #name");
const surnameInput = document.querySelector(".form-A #surname");
const IDNumberInput = document.querySelector(".form-A #id-number");
const DOBInput = document.querySelector(".form-A #DOB");

const postButton = document.querySelector("#post-button");
const cancelButton = document.querySelector("#cancel-button");

const errorContainer = document.querySelector("#test-1 .error");
const validationMessage = document.querySelector(".error #validation-message");

postButton.addEventListener("click", e =>{
    e.preventDefault();
    validate();
})

cancelButton.addEventListener("click", e =>{
    e.preventDefault();
})

function validate(){
    let validationErrors = [];
    if(nameInput.value === ""){
        validationErrors.push("Name field cannot be empty");
    }
    if(surnameInput.value === ""){
        validationErrors.push("Surname field cannot be empty");
    }
    if(IDNumberInput.value === ""){
        validationErrors.push("ID Number field cannot be empty");
    }
    else{
        if(IDNumberInput.value.length !== 13){
            validationErrors.push("ID Number must be 13 digits long");
        }
        if(!containsOnlyNumbers(IDNumberInput.value)){
            validationErrors.push("ID Number must only contain digits");
        }
    }
    if(DOBInput.value === ""){
        validationErrors.push("Date of birth field cannot be empty");
    }
    else{
        let isValidDate = Date.parse(DOBInput.value);
        if (isNaN(isValidDate)) {
            validationErrors.push("Date of birth must be formatted as such dd/mm/yyyy");
        }
    }

    if(validationErrors.length > 0){
        let html = "";
        validationErrors.forEach(error =>{
            html += `<li>${error}</li>`;
        })
        validationMessage.innerHTML = html;
        errorContainer.style.display = "block";
        return false;
    }

    errorContainer.style.display = "none";
    return true;
}

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}