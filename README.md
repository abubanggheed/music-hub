# Music Hub
This project is designed to be a site in which musicians may interact with a publicly available database to collectively compose and remix music.

## Diggin in to this repository

### Prerequisit Technologies
This project is a node ES6 project. Insure that your browser can run ES6 before opening this program. If you don't have node, you can find it here:
https://nodejs.org/en/download/

### SetUp
Once you have node, you can get this repository, by forking and cloning or by downloading this zip.

```git clone *forked repository*.git```

Next, move into the project directory and install the dependencies with

```npm install```

If you are intending to use this as a template for building a similar website, please use your own datadump.

Delete config.js in the src folder, and replace it with one of your own making. If you are not using firebase storage, also remove all references to firebase in songSaga.js and urlSaga.js and replace them with content of your choice.

If you are using a firebase storage, I recomend deleting the content of config.js from lines 5 through 10, and replacing them with your own configurations.

### Database
Create a new postgresql database called music_hub. In that database, create the tables written in database.sql.

### Run on local host

To run the site, use the two following built in scripts:

```npm run server```
```npm run client```

If all went well, you should be able to create a profile, a project, and upload a remix for that project.