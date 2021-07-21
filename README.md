# Chirper API - TO BE UPDATED FOR SERVERLESS

NOTE: This repo only contains the back-end of our project.
The interface used can be found at [RevatureRobert/2106Jun07RNCN-2-p2-fe](https://github.com/RevatureRobert/2106Jun07RNCN-2-p2-fe).

## Project Description

This social media application allows for text "chirps" to be sent for all to see!
This repo contains the API which handles the CRUD operations required on our chirps database.

## Technologies Used

- Express
- NodeJS
- DynamoDB
- Jest (w/ Dynalite)

## Features

- Can read all chirps from DB
- Can create new chirps in DB
- Can edit chirps
- Can delete chirps
- Can create new users in DB
- Can read user data from DB

To-do list:

- Users should be able to include photos in chirps
- Users should be able to like chirps
- Users should be able to comment on chirps
- Users should be able to change profile pictures
- Users should be able to see others' bios
- Users should be able to self-validate their emails/username

## Getting Started

To Develop:

- Make sure you have NodeJS installed.
- Clone the repo: `git clone https://github.com/dague00/chirp-proj1.git path-to-local-folder`.
- Enter the directory of your folder on your terminal: `cd path-to-local-folder`.
- Run `npm install` to get dependencies installed.
- Run `npm start` to run the app in development mode.

To Build (do To Devlop steps first):

- In a terminal inside the project folder run `npm run compile`.

To Run Built Code (test):

- Run `node dist/index.js` after build. If all goes well, see next section for keeping the service running on a server without intervention.

To Keep Deployed Code Running:

- Install pm2 globally: `npm install pm2 -g`
- Run `pm2 start dist/index.js`
- See the [pm2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/) for more information on running the service at startup.

## Usage

The following API calls can be made.
A `:` in front of a portion of the path means to replace with desired value.
All request/response bodies are in JSON.

#### Users

- `GET` to `/user/all` will get all users
- `GET` to `/user/:username` will get a single user
- `POST` to `/user` will create a user; requires the following information:
  ```JSON
  {
    "username": string,
    "bio": string
  }
  ```
- `PUT` to `/user/:username/bio` will edit the user's bio
- `DELETE` to `/usr/:username` will delete the user

#### Chirps

- `GET` to `/chirp/all` will get all chirps
- `GET` to `/:username` will get all chirps by one user
- `GET` to `/chirp/:timestamp` will get a specific chirp
- `POST` to `/chirp` will add a chirp; requires the following information:
  ```JSON
  {
     "username": string,
     "body": string,
     "timestamp": string
  }
  ```
  Note that the timestamp is in string format; this should be a numerical value cast to a string for DB purposes.
- `PUT` to `/chirp/:timestamp` will update (edit) a chirp
- `DELETE` to `/chirp/:timestamp` will delete a chirp

## Contributors

- [Daguinson Fleurantin](https://github.com/dague00)
- [Red Oral](https://github.com/redoral)
- [Marc Skwarczynski](https://github.com/marcski55)
- [Caleb Sword](https://github.com/calebmsword)

## License

This project uses the following license: [MIT](https://github.com/dague00/chirp-proj1/blob/51cb09bfc21f852797b836455cc1a29b2e18bd4e/LICENSE).
