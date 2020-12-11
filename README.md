# react-minesweeper 😵 💣 😎

[Try online!](http://dn-l.github.io/react-minesweeper)

React implementation of [Minesweeper Game](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) optimized for large board.

The project is using [Bulma](http://bulma.io) for basic styling.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to play?

Select the board parameters of your preference (number of rows, columns, and bombs), and press on a smile button to create a gaming board.

Select a cell and click on it. At this point, the bombs will be distributed through the board (so you don't lose the game with the first click).

Once you click on a bomb the board will open board cells, and the game will be lost (the button will indicate 😵)

If you find all bombs on the board (open all the hint cells), the button will open the board calls as well, but the state of the button will show that you have won -- 😎

Feel free to put flags (🚩) with right mouse click for your convenience.

To restart the game press the button again.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
