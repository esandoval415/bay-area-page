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
        <div class="card list">
  <a href="berkeley.html?id=${data.records[i].id}">${
          image
            ? `<img class="card-img-top rounded" alt="${name}" src="${image[0].url}">`
            : ``
        }
          </a>
  <div class="card-places">
    <p class="card-titulo">${name}</p>
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
    `https://api.airtable.com/v0/appUjc6D3Y0L4AvTo/berkeley/${id}`,
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
       <div class="card mb-3 attraction-card">
  <div class="row g-0">
    <div class="col-md-4">
     ${
       image
         ? `<img class="img-fluid rounded-start" alt="${name}" src="${image[0].url}">`
         : ``
     }
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <a href="${address}" target="_blank" class="btn btn-primary">Address</a>
        <a href="${site}" target="_blank" class="btn btn-primary">Main Site</a>
        <a href="${reviews}" target="_blank" class="btn btn-primary">Reviews</a>
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
