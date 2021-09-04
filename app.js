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
  mainMenu(searchResults[0], people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      let personInfoString = displayPerson(person);
      alert(personInfoString); //Displays all personal information on that person.
      mainMenu(person, people); //Allows user to ask for other information
      break;
    case "family":
      let immediateFamilyString = immediateFamilySearch(person, people);
      alert(immediateFamilyString); //Displays immediate family members for that person.
      mainMenu(person, people); //Allows user to ask for other information
      break;
    case "descendants":
      let descendantSearchResults = descendants(person, people);
      displayPeople(descendantSearchResults); //Displays all descendents for that person.
      mainMenu(person, people); //Allows user to ask for other information
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

//Name Search Function
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

// Search Criteria Functions Initializer //Code By: Matt Taylor
function searchCriteriaInitializer(people){
  let currentSearchResult = people;
  let userCriteriaArray = userCriteriaInput()
  return searchCriteria(currentSearchResult, userCriteriaArray, people);
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
    alert("Invalid Response.");
    userCriteriaInput();
  }
  else{
    return userCriteriaArray;
  }
  
}

// Search Criteria User Interface with recursion //Code By: Matt Taylor  ////Rafactor Later////
function searchCriteria(currentSearchResult, userCriteriaArray, people){
  let continueSearch;
  for(let i = 0; i < userCriteriaArray.length; i++){
    currentSearchResult = searchCriteriaSwitch(userCriteriaArray[i], currentSearchResult);
  }
  if(currentSearchResult.length === 1){
    displayPeople(currentSearchResult);
    let userChoice = promptFor("Do you wish to look up more information on this individual? Yes or No", yesNo).toLowerCase;
    if(userChoice = "yes"){
      return mainMenu(currentSearchResult[0], people);
    }
    else{
      return app(people);
    }
  }
  displayPeople(currentSearchResult); // Display List of Results
  continueSearch = promptFor("Do you wish to narrow this search down?", yesNo);
  if(continueSearch === "yes"){
    let userNewCriteria = prompt(`What criteria would you like to filter this search by? Please type the corresponding number.\n1:Gender, 2:DOB, 3:Height, 4:Weight, 5:Eye Color, 6:Occupation, 7:Parents, 8:Current Spouse`);
    searchCriteria(currentSearchResult, userNewCriteria, currentSearchResult);
  }
  else if(continueSearch === "no"){
    app(people); // restart app
  }
}

//Refactor for the search trait filters, Condenses the multiple traits into one search criteria function ran by the search switch case.
function searchByTrait(people, trait, question){
  let searchTrait = trait;
  let foundMatches = [];
  let selectedTrait = prompt(question).toLowerCase();
  foundMatches = people.filter(function(person){
    if(person[reducer(searchTrait)] == selectedTrait){
      return true;
    }
  })
  return foundMatches;
}

// Search Criteria Input //Code By: Matt Taylor
function searchCriteriaSwitch(userCriteria, people){
  switch(userCriteria){
    case "1":
      return searchByTrait(people, "gender", `What gender would you like to search for?`);      
    case "2":
      return searchByTrait(people, "dob", `What is the persons date of birth you would like to search for?\nmm/dd/yyyy`);      
    case "3":
      return searchByTrait(people, "height", `What is the person's height in inches you would like to search for?`);      
    case "4":
      return searchByTrait(people, "weight", `What is the person's weight in pounds you would like to search for?`);      
    case "5":
      return searchByTrait(people, "eyeColor", `What eye color would you like to search for?`);
    case "6":
      return searchByTrait(people, "occupation", `What occupation would you like to search for?`);      
    case "7":
      return searchByTrait(people, "parents", `What is the ID of the person's Parent you would like to search for?`);      
    case "8":
      return searchByTrait(people, "currentSpouse", `What is the ID of the person's Spouse you would like to search for?`);      
    default:
      app(people);   
  }
}

//Takes an initial input and reduces it into a usable input. 
///Was created to allow us to get around the scope limitation inside searchByTrait(...) to avoid using 100 lines of code to do the same thing as 8 lines.
function reducer(response){
  return response.split(" ").join("");
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
//Displays a list of names provided from an Array //Code By: Dustin Flynn and Matt taylor
function displayPeopleNoAlert(people){
  let display = people.map(function(person){
    return person.firstName + " " + person.lastName
  }).join(", ");
  return display;
}

//Displays the personal information of the personnel matching the search criteria.  //Code by: Dustin Flynn
function displayPerson(person){
  let personInfo = "ID: " + person.id + "\n";
  personInfo += "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Current Spouse ID: " + person.currentSpouse;
  return personInfo;
}
//Displays the immediate family for an individual requested by the User //Code By: Dustin Flynn and Matt Taylor
function familyRelationsDisplay(person, parents, spouse, children, siblings){
  let immediateFamily = "Individual: " + person.firstName + " " + person.lastName + "\n";
  immediateFamily += "Parents: " + parents + "\n";
  immediateFamily += "Spouse: " + spouse + "\n";
  immediateFamily += "Children: " + children + "\n";
  immediateFamily += "Siblings: " + siblings;
  return immediateFamily;
}

//#endregion

//Descendent Functions
//Functions to help find the descendent of a specific person
/////////////////////////////////////////////////////////////////
//#region 

// Displays descendants by searching parent ID. //Code by Dustin Flynn and Matt Taylor
/// Fix totalDescendants and Fix Main Menu Function
function descendants(person, people){
  let foundDescendents = [];
  for(let i = 0; i < people.length; i++){
    if(people[i].parents.includes(person.id)){
      foundDescendents.push(people[i]);
    }
  }
  for(let i = 0; i < foundDescendents.length; i++){
    foundDescendents = foundDescendents.concat(descendants(foundDescendents[i], people));
  }
  return foundDescendents;
}

//#endregion

//family Functions
//Functions to help find the immediate family of a specific person
/////////////////////////////////////////////////////////////////
//#region 

//Family Search Initializer to start search for Immediate Family //Code By: Matt Taylor
function immediateFamilySearch(person, people){
  let parents = foundFamilyDisplayCheck(immediateFamilyParents(person, people));
  let spouse = foundFamilyDisplayCheck(immediateFamilySpouse(person, people));
  let children = foundFamilyDisplayCheck(immediateFamilyChildren(person, people));
  let siblings = foundFamilyDisplayCheck(immediateFamilySiblings(person, people));
  let familyRelationsString = familyRelationsDisplay(person, parents, spouse, children, siblings);
  return familyRelationsString;
}
//Finds the parents for the individual //Code By: Matt Taylor
function immediateFamilyParents(person, people, totalParents = []){
  let foundParents = [];
  let parentIDArray = person.parents;
  for(let i = 0; i < parentIDArray.length; i++){
    foundParents = people.filter(function(parentSearchID){
      if(parentSearchID.id === parentIDArray[i]){
        return true;
      }  
      else{
        return false;
      }  
    })
    for(let i = 0; i < foundParents.length; i++){
      totalParents.push(foundParents[i]);
    }
  } 
  return totalParents; 
} 
//Find the spouse for the individual //Code By: Matt Taylor
function immediateFamilySpouse(person, people){
  let spouseID = person.currentSpouse;
  let foundSpouse = people.filter(function(spouseSearchID){
    if(spouseSearchID.id === spouseID){
      return true;
    }  
    else{
      return false;
    }  
  })
  return foundSpouse;
}
//Finds the immediate children for the individual //Code By: Matt Taylor
function immediateFamilyChildren(person, people){
  let parentID = person.id;
  let foundChildren = people.filter(function(parent){
    for (let i = 0; i < 2; i++){
      if(parent.parents[i] === parentID){
        return true;
      }  
      else{
        return false;
      } 
    } 
  })
  return foundChildren;
}
//Finds the children of each parent of the individual to determine their siblings
function immediateFamilySiblings(person, people, totalSiblings = []){
  let foundSiblings = [];
  for(let i = 0; i < 2; i++){
    let currentParent = person.parents[i];
    if(currentParent !== undefined){
      foundSiblings = people.filter(function(parent){
        for(let j = 0; j < 2; j++){
          if(parent.parents[j] === currentParent){
            return true;
          }
          else{
            return false;
          }
        }
      })
      for(let j = 0; j < foundSiblings.length; j++){
        if(foundSiblings[j].id !== person.id){
          totalSiblings.push(foundSiblings[j]);
        }
      }
    }
  }
  return totalSiblings;
}
//Checks the found results from the family search to verify that there was a return and than formats the result into a string.
function foundFamilyDisplayCheck(foundFamily){
  if(foundFamily.length > 0){
    let family = displayPeopleNoAlert(foundFamily);
    return family;
  }
  else{
    return `No family matches found in Database.`
  }
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

///////Old Code before Refactor///////

/////Old Trait Search Criteria//////
// //Eye Color Search Function //Code By: Matt Taylor
// function searchByEyeColor(people){
//   let userEyeColor = prompt(`What eye color would you like to search for?`).toLowerCase();
//   let foundEyeColor = people.filter(function(color){
//     if(color.eyeColor === userEyeColor){
//       return true;
//     }  
//     else{
//       return false;
//     }  
//   })
//   return foundEyeColor;
// }
// //Gender Search Function //Code By: Matt Taylor
// function searchByGender(people){
//   let userGender = prompt(`What gender would you like to search for?`).toLowerCase();
//   let foundGender = people.filter(function(gender){
//     if(gender.gender === userGender){
//       return true;
//     }  
//     else{
//       return false;
//     }  
//   })
//   return foundGender;
// }
// //Occupation Search Function //Code By: Matt Taylor
// function searchByOccupation(people){
//   let userOccupation = prompt(`What occupation would you like to search for?`).toLowerCase();
//   let foundOccupation = people.filter(function(occupation){
//     if(occupation.occupation === userOccupation){
//       return true;
//     }  
//     else{
//       return false;
//     }  
//   })
//   return foundOccupation;
// }
// // Weight search function //Code by: Dustin Flynn
// function searchByWeight(people){
//   let userWeight = Number(prompt(`What is the person's weight in pounds you would like to search for?`));
//   let foundWeight = people.filter(function(weight){
//     if(weight.weight === userWeight){
//       return true;
//     }  
//     else{
//       return false;
//     }  
//   })
//   return foundWeight;
// }
// // Height search function //Code by: Dustin Flynn
// function searchByHeight(people){
//   let userHeight = Number(prompt(`What is the person's height in inches you would like to search for?`));
//   let foundHeight = people.filter(function(height){
//     if(height.height === userHeight){
//       return true
//     }  
//     else{
//       return false;
//     }  
//   })
//   return foundHeight;
// }
// // ID search function //Code by: Dustin Flynn
// function searchById(people){
//   let userId = prompt(`What is the person's ID number you would like to search for?`);
//   let foundId = people.filter(function(id){
//     if(id.id === userId){
//       return true;
//     }  
//     else{
//       return false;
//     }  
//   })
//   return foundId;
// }
// // Spouse search function //Code by: Dustin Flynn
// function searchBySpouse(people){
//   let userSpouse = prompt(`What is the ID of the person's Spouse you would like to search for?`).toLowerCase();
//   let foundSpouse = people.filter(function(spouse){
//     if(spouse.currentSpouse === userSpouse){
//       return true;
//     }  
//     else{
//       return false;
//     }  
//   })
//   return foundSpouse;
// }
// // DOB search function //Code by: Dustin Flynn
// function searchByDob(people){
//   let userDob = prompt(`What is the persons date of birth you would like to search for?\nmm/dd/yyyy`).toString();
//   let foundDob = people.filter(function(dob){
//     if(dob.dob === userDob){
//       return true;
//     }  
//     else{
//       return false;
//     }  
//   })
//   return foundDob;
// }
// // parent search function //Code by: Matt Taylor
// function searchByParent(people){
//   let userParent = prompt(`What is the ID of the person's Parent you would like to search for?`).toLowerCase();
//   let foundParent = people.filter(function(parent){
//     if(parent.parents === userParent){
//       return true;
//     }  
//     else{
//       return false;
//     }  
//   })
//   return foundParent;
// }

/////////Old Search Criteria above///////////

////////Old Descendents Search////////

  // let foundDescendants;
  // for (let j = 0; j < person.length || j < 1; j++){
  //   let currentParent = person[j] || person;
  //   let parentID = currentParent.id;
  //   foundDescendants = people.filter(function(parent){
  //     for (let i = 0; i < 2; i++){
  //       if(parent.parents[i] === parentID){
  //         return true;
  //       }  
  //       else{
  //         return false;
  //       } 
  //     } 
  //   })
  // }
  // for(let i = 0; i < foundDescendants.length; i++){
  //   totalDescendants.push(foundDescendants[i]);
  // }  
  // if(foundDescendants.length !== 0){
  //   descendants(foundDescendants, people, totalDescendants);
  // }
  // else{
  //   displayPeople(totalDescendants);
  //   totalDescendants = []; //Wipes results for next search, if searching the same person.
  //   // return mainMenu(person[0], people); //Figure out how to store original search criteria to return to.
  //   return app(people);
  // }