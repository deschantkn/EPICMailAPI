# EPICMailAPI
The Backbone of plain and simple communication. This is the Nodejs REST API which will be supporting the mail application [here](https://deschant.github.io/EPICmail/). The project has user authentication and authorization, as well as sending and receiving messages ready to go.

[![Build Status](https://travis-ci.com/deschant/EPICMailAPI.svg?branch=develop)](https://travis-ci.com/deschant/EPICMailAPI) [![Coverage Status](https://coveralls.io/repos/github/deschant/EPICMailAPI/badge.svg?branch=develop)](https://coveralls.io/github/deschant/EPICMailAPI?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/61a40a6db41ac474a007/maintainability)](https://codeclimate.com/github/deschant/EPICMailAPI/maintainability)

## Installation steps

* Clone the repo using ```git clone https://github.com/deschant/EPICMailAPI```
* Run ```yarn install``` or ```npm install``` if you use npm
* Create a ```.env``` file at the root of the project and fill out the variables you can find in ```.env.example``` file
* You can now run ```yarn start``` or the npm equivalent

## Steps for running tests

* Change the ```NODE_ENV``` variable value to "test"
* Run the test script located in the ```package.json``` file

## Documentation

All the API endpoints are documented and available [here](https://epicmailapp.herokuapp.com/)