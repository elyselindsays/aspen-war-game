# Aspen Capital War Card Game

The project is live at https://aspencapitalwargame.herokuapp.com/

## Running the App

In the backend folder, run: 

`npm install`

`npx dotenv sequelize db:create`

`npx dotenv sequelize db:migrate`

`npx dotenv sequelize db:seed:all`

`npm start`

In the frontend folder, run:

`npm install`

`npm start`

## Further steps

I have many ideas about how I would refactor my code to use custom hooks. The schema is designed so there is an opportunity to add more players than the assigned '1' and '2'. I have added a "show move history", but I would also like to add animation and card visualization to show the move steps clearer.
