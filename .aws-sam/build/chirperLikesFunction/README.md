# Chirper API (Serverless)

![Built and Deployed by SAM](https://img.shields.io/badge/BUILT%20%26%20DEPLOYED%20BY-SAM-orange?style=for-the-badge&logo=amazonaws)
![Serverless Stack](https://img.shields.io/badge/SERVERLESS%20STACK-CLOUDFORMATION-orange?style=for-the-badge&logo=amazonaws)
![CI/CD by AWS CodePipeline](https://img.shields.io/badge/CI%2FCD-CODEPIPELINE-orange?style=for-the-badge&logo=amazonaws)

NOTE: This repo only contains the back-end of our project.
The interface used can be found at [RevatureRobert/2106Jun07RNCN-2-p2-fe](https://github.com/RevatureRobert/2106Jun07RNCN-2-p2-fe).

## Project Description

This social media application allows for text "chirps" to be sent for all to see!
This repo contains the REST API which handles the CRUD operations required on our chirps database.

## Technologies Used

- AWS SAM
- AWS CloudFormation
- AWS Lambda
- AWS API Gateway
- AWS S3
- AWS CodePipeline
- AWS DynamoDB
- NodeJS
- Jest (w/ Dynalite)

## Features

- Can read all chirps from DB
- Can create new chirps in DB
- Can delete chirps
- Can include photos in chirps
- Can like/unlike chirps
- Can comment on chirps
- Can delete comments

To-do list:

- Enable uploading videos in chirps
- Enable user following

## Getting Started

To Develop:

- Make sure you have AWS-CLI and SAM-CLI installed
- Set your AWS credentials
- Clone the repo: git clone https://github.com/RevatureRobert/2106Jun07RNCN-2-p2-be.git path-to-local-folder
- Update your remote git to a new repository.

To Build & Run (do To Devlop steps first):

- Set up AWS CodePipeline (see included `buildspec.yml`)
- Update the `template.yml` to include your lamdas.

## Usage

The following API calls can be made.
A `:` in front of a portion of the path means to replace with desired value.
All request/response bodies are in JSON.

#### Chirps

- `GET` to `/` will get all chirps
- `POST` to `/` will add a chirp; requires the following body:
  ```JSON
  {
     "username": string,
     "body": string,
     "timestamp": string,
     "media"?: string
  }
  ```
  Note that the timestamp is in string format; this should be a numerical value cast to a string for DB purposes.
- `DELETE` to `/:timestamp` will delete a chirp

#### Comments

- `GET` to `/:timestamp/comments` will get all comments from a chirp
- `PUT` to `/:timestamp/comments` will add a comment to a specific chirp;
  requires the following body:
  ```JSON
    [
      {
        "username": string,
        "body": string,
        "timestamp": string,
      }
    ]
  ```
- `DELETE` to `/:timestamp/comments/:cmttimestamp` will delete a specific comment

#### Likes

- `PUT` to `/like/:timestamp/:username` will like a chirp as a user
- `PUT` to `/unlike/:timestamp/:username` will unlike a chirp as a user

## Contributors

- [Daguinson Fleurantin](https://github.com/dague00)
- [Red Oral](https://github.com/redoral)
- [Marc Skwarczynski](https://github.com/marcski55)
- [Caleb Sword](https://github.com/calebmsword)

## License

[![MIT](https://img.shields.io/github/license/RevatureRobert/2106Jun07RNCN-2-p2-be?style=for-the-badge)](https://github.com/RevatureRobert/2106Jun07RNCN-2-p2-be/blob/417cce5cafa0f36f638b138d9709e1a17a31215a/LICENSE)

![Built with Love](https://forthebadge.com/images/badges/built-with-love.svg)
