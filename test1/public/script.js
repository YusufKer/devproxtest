document.addEventListener("DOMContentLoaded", e =>{

    const app = firebase.app();

    const db = firebase.firestore();
    const usersCollection = db.collection("users");

    const nameInput = document.querySelector(".form-A #name");
    const surnameInput = document.querySelector(".form-A #surname");
    const IDNumberInput = document.querySelector(".form-A #id-number");
    const DOBInput = document.querySelector(".form-A #DOB");

    const postButton = document.querySelector("#post-button");
    const cancelButton = document.querySelector("#cancel-button");

    const errorContainer = document.querySelector("#test-1 .error");
    const validationMessage = document.querySelector(".error #validation-message");
    const userData = document.querySelector("#users-data");

    usersCollection
        .onSnapshot(querySnapshot =>{
            const usersArray = [];
            let usersTableHTML = "";
            querySnapshot.forEach(doc =>{
                const {name, surname, DOB, idNumber} = doc.data();
                usersArray.push({name, surname, DOB, idNumber});
                usersTableHTML += `
                    <tr>
                        <td>${name}</td>
                        <td>${surname}</td>
                        <td>${DOB}</td>
                        <td>${idNumber}</td>
                    </tr>
                `;
            })
            
            console.table(usersArray);
            userData.innerHTML = usersTableHTML;
        })

    postButton.addEventListener("click", async e =>{
        e.preventDefault();
        if(await validate() === false) return;
        const newUser = {
            name: nameInput.value, 
            surname: surnameInput.value, 
            DOB: DOBInput.value, 
            idNumber: IDNumberInput.value
        }
        usersCollection
            .doc()
            .set(newUser)
            .then(() =>{
                nameInput.value = "";
                surnameInput.value = "";
                DOBInput.value = "";
                IDNumberInput.value = "";
            })
            .catch(error =>{
                console.log({error});
            })
    })

    cancelButton.addEventListener("click", e =>{
        e.preventDefault();
    })

    async function validate(){
        let validationErrors = [];
        if(nameInput.value === ""){
            validationErrors.push("Name field cannot be empty");
        }
        if(surnameInput.value === ""){
            validationErrors.push("Surname field cannot be empty");
        }
        if(IDNumberInput.value === ""){
            validationErrors.push("ID Number field cannot be empty");
        }else{
            if(IDNumberInput.value.length !== 13){
                validationErrors.push("ID Number must be 13 digits long");
            }
            if(!containsOnlyNumbers(IDNumberInput.value)){
                validationErrors.push("ID Number must only contain digits");
            }
        }
        if(await IDNumberExists(IDNumberInput.value)){
            validationErrors.push("ID Number already exists in database");
        }

        if(DOBInput.value === ""){
            validationErrors.push("Date of birth field cannot be empty");
        }else{
            let dateArray = DOBInput.value.split("/");
            let isValidDate = Date.parse(`${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`);
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

    async function IDNumberExists(number){
        let idExists = await usersCollection
            .where("idNumber","==",number)
            .get()
            .then(snapshot =>{
                console.log(snapshot.docs.length);
                if(snapshot.docs.length > 0){
                    return true;
                }else{
                    return false;
                }
            })
        return idExists;
    }
})
