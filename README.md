# maps

## Introduction
This project contains two examples on how to use some features of the Google Maps API. One is in React and the other is in Vue.js. 

It allows the user to enter several addresses and generate a route based on that input.

![screenshot](https://github.com/achongsBiz/readme-files/blob/master/gmap-demo/gmap1.png)

## API Key Disclaimer
This project requires a Google Maps API key. It is your responsibility to secure and restrict access to the key you generate. 

Here is the official documentation on best practices with regards to this matter:
https://developers.google.com/maps/api-security-best-practices


## Project setup

Obtain a Google Maps API key from google and substitute it into the script tag into index.html:

```
 <script src='https://maps.googleapis.com/maps/api/js?key=GET-YOUR-OWN-KEY'></script>
 ```

 On VUE projects index.html is found under public/index.html. In React, the index.html file is located in the root of the project.

## Running the project

From within the React or Vue project folders:
```
npm install
npm run serve (or dev)
```
