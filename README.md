
# FAT IN PEACE

Mockup kiosk system to manage customer side and store side.

## Documentation

- This system runs on localhost:3000 by "XAMPP".

- MySQL port in XAMPP has been set to port:3307 or you can change it manually.

  *If you change, you must change in "database.js" in the project folder too.*

- You can get icecream_shop database from [FAT IN PEACE Database](https://github.com/Dukeoohhh/WebApplicationFinal_Database.git)

- Import database to phpMyAdmin on XAMPP.

- The administrator section | username: admin | password: admin

## Installation

- Install Node JS and Git.

- Create folder "icecream_shop" into Desktop on Command Prompt.

```bash
cd desktop

mkdir icecream_shop

cd icecream_shop
```

- Clone project from GitHub to your directory.

```bash
git clone https://github.com/Dukeoohhh/WebApplicationFinal.git
```

- Install npm in the "WebApplicationFinal" directory.

```bash
cd WebApplicationFinal

npm install

npm audit fix --force
```

- Install MySQL and Express-Session.

```bash
npm install mysql

npm install express-session
```

- Install Nodemon.

```bash
npm install --save-dev nodemon
```


## Run Locally

Start the server. *Open XAMPP and active Apache and MySQL (MySQL port: 3307)*

```bash
npm run dev
```
