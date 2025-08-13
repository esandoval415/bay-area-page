"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("attractions");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patCEvvXSZ1XOkLbN.6aa76e2e28ce815c58219e87060254c7748ba7f9deddcf6147dca1cb8b79095e`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appUjc6D3Y0L4AvTo/berkeley`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let image = data.records[i].fields["Image"]; // here we are getting column values
        let name = data.records[i].fields["Name"]; //here we are using the Field ID to fecth the name property
        let city = data.records[i].fields["City"];

        newHtml += `
        
         <div class="col-xl-4 cardImageText">
        <div class="card">
  <a href="index.html?id=${data.records[i].id}">${
          image
            ? `<img class="card-img-top rounded" alt="${name}" src="${image[0].url}">`
            : ``
        }
          </a>
  <div class="card-body">
    <p class="card-text">${name}</p>
  </div>
</div>
          <p hidden class="card-key">${city}</p>
          </div>
       
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

// function for our detail view
async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("attractions");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patCEvvXSZ1XOkLbN.6aa76e2e28ce815c58219e87060254c7748ba7f9deddcf6147dca1cb8b79095e`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appUjc6D3Y0L4AvTo/bayarea/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let image = data.fields["Image"];
      let name = data.fields["Name"];
      let address = data.fields["Address"];
      let site = data.fields["Site"];
      let reviews = data.fields["Reviews"];
      let city = data.fields["City"];

      let newHtml = `
        <div class="card list mb-3">
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center align-items-center">
     ${
       logo
         ? `<img class="img-fluid back ms-4" alt="${name}" src="${logo[0].url}">`
         : ``
     }
    </div>
    <div class="col-md-6 d-flex justify-content-center align-items-center desc">
      <div class="card-body">
        <h5 class="card-title bar">${name}</h5>
        <p class="card-text">${description}</p>
        <p class="card-text"><small>${stars(rating)} (${rating})</small></p>
        <p class="card-text"><small>${address} <br> SF, CA ${zip}</small></p>
        <a href="${map}" target="_blank"><button type="button" class="btn btn-primary btn-sm">Get Directions</button></a>
      </div>
    </div>
  </div>
</div>

<div class="card list mb-3">
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center ">
    ${
      picture
        ? `<img class="img-fluid front" alt="${name}" src="${picture[0].url}">`
        : ``
    }
       </div>
       <div class="col-md-6 d-flex justify-content-center align-items-center">
       <div class="card-body">
       <div class="card-group hours mx-auto">    
  <div class="card list hours shift">
    <div class="card-body">
      <h4 class="card-title">🕔 Hours</h4>
      <p class="card-text">${formattedString(hours)}</p>
      
    </div>
  </div>
  <div class="card list hours">
    <div class="card-body">
      <h4 class="card-title">😁 🕔 Happy Hours</h4>
      <p class="card-text">${formattedString(happy)}</p>
     
    </div>
  </div>
</div>
<div class="moves">
<table class="table misc">
    <tbody>
    <tr>
      <th scope="row misc">Neighborhood</th>
      <td class="card-text">${neighborhood}</td>
    </tr>
    <tr>
      <th scope="row misc">Outdoor Seating</th>
      <td>${outdoor}</td>
    </tr>
    <tr>
      <th scope="row misc">Food Served</th>
      <td colspan="2">${formattedString(food)}</td>
    </tr>
     <tr>
      <th scope="row misc">Merchandise</th>
      <td colspan="2">${formattedString(merchandise)}</td>
    </tr>
    <tr>
      <th scope="row misc">Links</th>
      <td colspan="2"><a href="${website}" target="_blank"><button type="button" class="btn btn-primary btn-sm go">Website</button></a> <a href="${yelp}" target="_blank"><button type="button" class="btn btn-primary btn-sm go">Yelp</button></a></td>
    </tr>
  </tbody>
</table>
</div>
</div>
</div>
</div>
</div>
      `;

      jobsResultElement.innerHTML = newHtml;
    });
}

// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  // Call listener function to hide search bar for mobile devices
//   myNeighborhood(x);
  getAllRecords(); // no id given, fetch summaries
}