# SendIT

[![Build Status](https://travis-ci.org/karekkhaleb/sendit.svg?branch=api-endpoint)](https://travis-ci.org/karekkhaleb/sendit)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![Coverage Status](https://coveralls.io/repos/github/karekkhaleb/sendit/badge.png?branch=Develop)](https://coveralls.io/github/karekkhaleb/sendit?branch=Develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/0462e697b44eea987243/maintainability)](https://codeclimate.com/github/karekkhaleb/sendit/maintainability)

> This api is hosted at https://glacial-headland-62518.herokuapp.com/


# App Description
> This app will provide parcel Devilery features to the clients
> You pay based on the weight of your parcel

## Running the api Locally

* clone the repo or download the zip
* Navigate to the folder where you downloaded or cloned the app
* Make sure you are on the Develop branch (Because the Develop branch has all the recent code)
* Make sure you have postgres DB running on your system
* In the root folder of the app, create a `.env` file and populate it based on the guide in the `.env.examples` file that is already availbale in the root folder
* Run `npm install` from the terminal(make sure the port 9000 is free).
* Run `npm start` from the terminal to start the app
* With the ideal tool preferably postman, send a get request on `http://localhost:9000` for more information about the api endpoints

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
  },
  "changeParcelStatus": {
    "url": "/api/v1/parcels/<parcelId>/status",
    "method": "PUT",
    "requirements": "you should be authenticated and use the token in the header"
  },
  "changeParcelDestination": {
    "url": "/api/v1/parcels/<parcelId>/destination",
    "method": "PUT",
    "requirements": "you should be authenticated and use the token in the header"
  }
}

```