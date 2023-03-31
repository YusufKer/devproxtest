const names = [
    "Maria",
    "Nushi",
    "Mohammed",
    "Jose",
    "Wei",
    "Ahmed",
    "Yan",
    "John",
    "Ana",
    "Mary",
    "Wilson",
    "Thomas",
    "Taylor",
    "Bruce",
    "Betty",
    "Tony",
    "Pepper",
    "Arthur",
    "Meera",
    "Mildred"
]

const surnames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Taylor",
    "Noah",
    "Oliver",
    "Stacy",
    "Erin",
    "Lee"
]

function generateName(){
    return `${names[generateRandomNumber(19)]} ${surnames[generateRandomNumber(19)]}`;
}

function generateBirthdate(){
    const earliestYear = Date.parse("01/01/1813") / 1000; // max age +- 110 Years
    const latestYear = Date.now() / 1000; // Born today
    
    // Revese order to account for epoch
    return formatAge(generateRandomNumber(earliestYear,latestYear));
}
// calculateAge(new Date(generateBirthdate().int)) - USE LIKE THIS
function calculateAge(birthdate){
    const differenceInMS = Date.now() - birthdate.getTime();
    const differenceAsDate = new Date(differenceInMS)

    return Math.abs(differenceAsDate.getFullYear() - 1970);
}

function checkUnique(user, usersArray){
    for(let i = 0; i < usersArray.length; i++){
        if(usersArray[i].birthdate === user.birthdate){
            console.log("Birthdate Match");
            if(usersArray[i].name === user.name){
                console.log("Name Match");
                console.log({user})
                return false;
            }
        }
    }
    return true;
}

function generateRandomNumber(upperLimit,lowerLimit = 0){
    return Math.floor(Math.random() * (upperLimit - lowerLimit + 1) + lowerLimit);
}

function formatAge(secs) {
    const format = {};
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    format.us = `${t.getDay()}/${t.getMonth() + 1}/${t.getFullYear()}`;
    format.int = `${t.getMonth() + 1}/${t.getDay()}/${t.getFullYear()}`;
    return format;
}

function generateUsers(){
    const usersArray = [];
    while(usersArray.length < 10000){
        const user = {
            name: generateName(),
            birthdate: generateBirthdate().int,

        }
        if(checkUnique(user,usersArray)){
            usersArray.push(user)
        }else{
            continue;
        }       
    }
    console.table(usersArray)
}

