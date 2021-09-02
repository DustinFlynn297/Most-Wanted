"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchCriteriaInitializer(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults[0], people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Each Search Function narrows down the search results down to only those with that trait.
//The Search Criteria Function takes the user input to tell the app which Search Function to perform next.
/////////////////////////////////////////////////////////////////
//#region 

//Name Search Function //// Done ////
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson; 
}
//Eye Color Search Function////Done//// Code By: Matt Taylor
function searchByEyeColor(people){
  let userEyeColor = prompt(`What eye color would you like to search for?`).toLowerCase();
  let foundEyeColor = people.filter(function(color){
    if(color.eyeColor === userEyeColor){
      return true;
    }  
    else{
      return false;
    }  
  })
  return foundEyeColor;
}
//Gender Search Function////Done//// Code By: Matt Taylor
function searchByGender(people){
  let userGender = prompt(`What gender would you like to search for?`).toLowerCase();
  let foundGender = people.filter(function(gender){
    if(gender.gender === userGender){
      return true;
    }  
    else{
      return false;
    }  
  })
  return foundGender;
}
//Occupation Search Function////Done//// Code By: Matt Taylor
function searchByOccupation(people){
  let userOccupation = prompt(`What occupation would you like to search for?`).toLowerCase();
  let foundOccupation = people.filter(function(occupation){
    if(occupation.occupation === userOccupation){
      return true;
    }  
    else{
      return false;
    }  
  })
  return foundOccupation;
}
// Weight search function // Done// Code by: Dustin Flynn
function searchByWeight(people){
  let userWeight = prompt(`What is the person's weight in pounds you would like to search for?`).map(Number);
  let foundWeight = people.filter(function(weight){
    if(weight.weight === userWeight){
      return true;
    }  
    else{
      return false;
    }  
  })
  return foundWeight;
}
// Height search function // Done// Code by: Dustin Flynn
function searchByHeight(people){
  let userHeight = prompt(`What is the person's height in inches you would like to search for?`).map(Number);
  let foundHeight = people.filter(function(height){
    if(height.height === userHeight){
      return true
    }  
    else{
      return false;
    }  
  })
  return foundHeight;
}
// ID search function // Done// Code by: Dustin Flynn
function searchById(people){
  let userId = prompt(`What is the person's ID number you would like to search for?`);
  let foundId = people.filter(function(id){
    if(id.id === userId){
      return true;
    }  
    else{
      return false;
    }  
  })
  return foundId;
}
// Spouse search function // Done// Code by: Dustin Flynn
function searchBySpouse(people){
  let userSpouse = prompt(`What is the ID of the person's Spouse you would like to search for?`).toLowerCase();
  let foundSpouse = people.filter(function(spouse){
    if(spouse.currentSpouse === userSpouse){
      return true;
    }  
    else{
      return false;
    }  
  })
  return foundSpouse;
}
// DOB search function // Done// Code by: Dustin Flynn
function searchByDob(people){
  let userDob = prompt(`What is the persons date of birth you would like to search for?\nmm/dd/yyyy`).toString();
  let foundDob = people.filter(function(dob){
    if(dob.dob === userDob){
      return true;
    }  
    else{
      return false;
    }  
  })
  return foundDob;
}
// parent search function // Done// Code by: Matt Taylor
function searchByParent(people){
  let userParent = prompt(`What is the ID of the person's Parent you would like to search for?`).toLowerCase();
  let foundParent = people.filter(function(parent){
    if(parent.parents === userParent){
      return true;
    }  
    else{
      return false;
    }  
  })
  return foundParent;
}
//Takes user input to determine criteria to search by. //Code By: Matt Taylor
function userCriteriaInput(){
  let criteriaString = prompt(`What criteria would you like to search by? Please type the corresponding number(s).\n1:Gender, 2:DOB, 3:Height, 4:Weight, 5:Eye Color, 6:Occupation, 7:Parents, 8:Current Spouse`);
  let userCriteriaArray = criteriaString.split(" ");
  if(userCriteriaArray.length > 5){
    alert("Please enter a maximum of 5 criteria.");
    userCriteriaInput();
  }
  else if(userCriteriaArray.length === 0){
    alert("Invalid Response.")
    userCriteriaInput()
  }
  else{
    return userCriteriaArray;
  }
  
}
// Search Criteria Input //Code By: Matt Taylor
function searchCriteriaSwitch(userCriteria, people){
  switch(userCriteria){
    case "1":
      return searchByGender(people);
      break;
    case "2":
      return searchByDob(people);
      break;
    case "3":
      return searchByHeight(people);
      break;
    case "4":
      return searchByWeight(people);
      break;
    case "5":
      return searchByEyeColor(people);
      break;
    case "6":
      return searchByOccupation(people);
      break;
    case "7":
      return searchByParent(people);
      break;
    case "8":
      return searchBySpouse(people);
      break;
    default:
      app(people);   
  }
}
// Search Criteria User interface with recursion //Code By: Matt Taylor
function searchCriteria(currentSearchResult, userCriteriaArray, people){
  let continueSearch;
  for(let i = 0; i < userCriteriaArray.length; i++){
    currentSearchResult = searchCriteriaSwitch(userCriteriaArray[i], currentSearchResult);
  }
  displayPeople(currentSearchResult); // Display List of Result
  continueSearch = promptFor("Do you wish to narrow this search down?", yesNo);
  if(continueSearch === "yes"){
    let userNewCriteria = prompt(`What criteria would you like to filter this search by? Please type the corresponding number.\n1:Gender, 2:DOB, 3:Height, 4:Weight, 5:Eye Color, 6:Occupation, 7:Parents, 8:Current Spouse`);
    searchCriteria(currentSearchResult, userNewCriteria, currentSearchResult);
  }
  else if(continueSearch === "no"){
    app(people); // restart app
  }
}
// Search Criteria Functions Initializer //Code By: Matt Taylor
function searchCriteriaInitializer(people){
  let currentSearchResult = people;
  let userCriteriaArray = userCriteriaInput()
  return searchCriteria(currentSearchResult, userCriteriaArray, people);
} 

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion