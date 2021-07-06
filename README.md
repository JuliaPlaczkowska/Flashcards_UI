# Flashcards App

Flashcards game app created with React.js. 
You can try it using this url: [https://flashcards-react.herokuapp.com/register](https://flashcards-react.herokuapp.com/register) 

## Table of contents
* [Description](#description)
* [Technologies](#technologies)
* [Setup](#setup)

## Description
Flashcards App is a web app which enables you to learn by playing 
flashcards game. 

### Database
Such data as sets of flashcards, users' information and their progress 
are stored in H2 database and acquired through [REST API](https://github.com/JuliaPlaczkowska/Flashcards).
Available sets of flashcards are developed 
dynamically with respect of users’ needs by the app administrator. 
Every user can email admin directly with a new set request.


### Ranking
The application also consists 
of features that will encourage users to
study more by implementing score and progress tracking system.
The score is a measure of how quickly the user learns the set of flashcards. 
After finishing learning, user can choose whether to add
the score to the public ranking to compete with others.

## Technologies
Project is created with:
* React version: 17.0.2
* Material-UI version: 4.11.1
* Axios version: 0.12.1
* Semantic UI version: 2.4.2

## Setup
To run this project, clone it from GitHub and run as normal 
React project.
