//Creating the database
let statesData;
fetch("Data/states.json")
  .then((response) => response.json())
  .then((json) => (statesData = json));

// Function to find the country from a state
function findCountry(stateStr) {
  //Converting to uppercase
  stateStr = stateStr.toUpperCase();

  // console.log(statesData.length)

  // Testing if statesData has been imported properly
  // console.log(`The length of array is : ${statesData.length}`)

  // If exact match found, then return that or return the first from the list
  //Searching for exact result
  //iterating through all the countries
  for (let i = 0; i < statesData.length; i++) {
    let statesLst = statesData[i]["states"];
    //Iterating through all the states
    for (let j = 0; j < statesLst.length; j++) {
      let state = statesLst[j]["name"].toUpperCase();
      if (state == stateStr) {
        return statesData[i]["name"].toUpperCase();
      }
    }
  }

  //Searching for the closest result alphabetically
  //iterating through all the countries
  for (let i = 0; i < statesData.length; i++) {
    let statesLst = statesData[i]["states"];
    //Iterating through all the states
    for (let j = 0; j < statesLst.length; j++) {
      let state = statesLst[j]["name"].toUpperCase();
      if (state.indexOf(stateStr) >= 0) {
        return statesData[i]["name"].toUpperCase();
      }
    }
  }
}

// Function to add cards
function addCards(cardJSON, index) {
  div = document.querySelector("#StartOfListing");
  let template = `
  <div class="card" onclick="applyBtnClicked(${index})">
        <div class="position">${cardJSON["position"]}</div>

        <!-- Apply Button -->
        <div class="applyBtn">
          <a href="" class="applyBtnText">Apply</a>
        </div>

        <!-- Job Info -->
        <div class="jobInfo">
          <div class="info">
            <img src="Assets/company.PNG" alt="" class="locationImg" />
            ${cardJSON["company"]}
          </div>

          <div class="info">
            <img src="Assets/red_blimp.jpeg" alt="" class="locationImg" />
            ${cardJSON["location"]}
          </div>

          <div class="info">
            <img src="Assets/clock.jpg" alt="" class="locationImg" />
            ${cardJSON["nature"]}
          </div>
        </div>
        <!-- **End of Job Info** -->

        <!-- Job Description -->
        <div class="jobDescription">
          <div style = "font-size : 26px">Job Description</div>
          ${cardJSON["description"]}
        <!--** End of Job Description **-->
      
  `;
  let reqTemplate = ` <div style = "font-size : 26px; margin-top : 2%">Job Requirements</div>
  <ul class = "jobReq">`
  for (let i = 0; i<cardJSON["requirements"].length; i++){
    reqTemplate += `<li> ${cardJSON["requirements"][i]} </li>`
  };
  reqTemplate += '</ul>'

  //Ending Job desctiption and card
  template+= reqTemplate + '</div> </div>'

  console.log(reqTemplate)

  div.insertAdjacentHTML("beforeend", template);
}

//Using the database.json file to display the html of each card
fetch("Data/database.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (array) {
    for (let i = 0; i < array.length; i++) {
      addCards(array[i], i);
    }
  })
  .catch(function (error) {
    console.error("Something went wrong");
  });

// Function executed everytime a key is pressed
function searchFunction() {
  let filter = document.getElementById("searchText").value.toUpperCase();
  // console.log(filter);

  // Getting an array of all the objects of class card
  let allCards = document.getElementsByClassName("card");

  let fCountry = findCountry(filter);
  console.log(fCountry);

  // iterating through all objects of class "card"
  for (let i = 0; i < allCards.length; i++) {
    //card is a changing variable that goes through each of the cards
    let card = allCards[i];
    // Getting an array of all elements with tag 'div' and then indexinf through them to find the required details
    let position = card
      .getElementsByTagName("div")[0]
      .textContent.toUpperCase()
      .trim();
    let company = card
      .getElementsByTagName("div")[3]
      .textContent.toUpperCase()
      .trim();
    let location = card
      .getElementsByTagName("div")[4]
      .textContent.toUpperCase()
      .trim();
    let time = card
      .getElementsByTagName("div")[5]
      .textContent.toUpperCase()
      .trim();

    // console.log(position, company, location, time);

    // console.log(`${position} : Index is ${position.indexOf(filter)}`)

    // if index is not found then the function 'indexOf' returns -1
    // Hence if it is found, then index of will return a value greater than or equal to 0

    let toBeDisplayed;

    //Position
    if (position.indexOf(filter) >= 0) {
      // console.log("Filtered Position:", position);
      toBeDisplayed = true;
    }
    // Company
    else if (company.indexOf(filter) >= 0) {
      // console.log("Filtered Company:", company);
      toBeDisplayed = true;
    }
    //Location
    else if (location.indexOf(filter) >= 0 || location.indexOf(fCountry) >= 0) {
      // console.log("Filtered Location:", location);
      toBeDisplayed = true;
    }
    //Part Time or Full Time
    else if (time.indexOf(filter) >= 0) {
      // console.log("Filtered Nature of Job:", time);
      toBeDisplayed = true;
    } else {
      toBeDisplayed = false;
    }

    if (toBeDisplayed && screen.width > 680) {
      card.style.display = "grid";
    } else if (toBeDisplayed && screen.width < 680) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  }
}

function applyBtnClicked(index) {
  let allDesc = document.getElementsByClassName("jobDescription");
  if (allDesc[index].style.display == "flex") {
    allDesc[index].style.display = "none";
  } else {
    allDesc[index].style.display = "flex";
  }
  for (let i = 0; i < allDesc.length; i++) {
    if (i != index) {
      allDesc[i].style.display = "none";
    }
  }
  document.getElementById("StartOfListing").style.display = "flex";
  document.getElementById("StartOfListing").style.flexDirection = "column";
  document.getElementsByClassName("card").style.marginTop = "25px";
}
