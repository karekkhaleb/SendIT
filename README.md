# SendIT

[![Build Status](https://travis-ci.org/karekkhaleb/sendit.svg?branch=api-endpoint)](https://travis-ci.org/karekkhaleb/sendit)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![Coverage Status](https://coveralls.io/repos/github/karekkhaleb/sendit/badge.svg?branch=Develop)](https://coveralls.io/github/karekkhaleb/sendit?branch=Develop)

> The templates are hosted at https://karekkhaleb.github.io/sendit/UI/html

> The api is hosted at https://glacial-headland-62518.herokuapp.com/

## Running the api Locally

* clone the repo or download the zip
* Navigate to the folder where you downloaded or cloned the app
* Make sure you are on the Develop branch (Because the Develop branch has all the recent code)
* Run `npm install` from the terminal(make sure the port 9000 is free).
* With the ideal tool preferably postman, send a get request on `http://localhost:9000` for more information about the api endpoints

## Getting the static pages Locally

* clone the repo or download the zip
* Navigate to the folder where you downloaded or cloned the app
* Make sure you are on the Develop branch (Because the Develop branch has all the recent code)
* Navigate to `/UI/html` folder for that is where the static pages are located
* There you may open any html file with your browser and see the template working!!

## Running the tests locally 
* clone the repo or downoald the zip file(extract the zip and navigate to the folder containing the app)
* Install dependecies with `npm install` (You can also use yarn) from the terminal
* Run tests with `npm test` (also yarn may work)


## Information on the API


```json
{
  "gettingAllParcels": {
    "url": "/api/v1/parcels",
    "method": "GET"
  },
  "gettingASingleParcelById": {
    "url": "/api/v1/parcels/<parcelId>",
    "method": "GET"
  },
  "gettingParcelsByUserId": {
    "url": "/api/v1/users/<userId>/parcels",
    "method": "GET"
  },
  "creatingAParcel": {
    "url": "/api/v1/parcels",
    "method": "POST",
    "objectFormat": {
      "userId": "The id of the user creating the parcel",
      "weight": "The weight of the parcel",
      "pickupLocation": "The location where the parcel should be picked up",
      "destination": "The parcel's destination",
      "description": "Some info about the parcel"
    }
  },
  "cancelParcel": {
    "url": "/api/v1/parcels/<parcelId>/cancel",
    "method": "PUT"
  }
}

```
