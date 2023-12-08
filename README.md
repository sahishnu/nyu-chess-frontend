## Development 

### Getting started

Clone the repo
```
https://github.com/sahishnu/nyu-chess-frontend.git
```

Install dependencies
```
npm i
```

Run the dev server
```
npm run dev
```

### Running with test network

To run a local network, we must run the hardhat node from our dApp repo - [nyu-eth-chess](https://github.com/sahishnu/nyu-eth-chess).

Follow the setup instructions there. And from the repo run:
```
npx hardhat node
```

## Features

### Starting a Game

This deploys a contract to the network. The contract requires the user to provide a wager amount (as the `msg.value`) and the timeout length. The player that deploys the contract will be `player1` and will play as `WHITE`.

### Join a Game

This joins a player to the game as player 2. The player must provide the correct wager amount that matches player 1's wager as the `msg.value`. Player 2 will play as `BLACK`.

### Chess Board GUI

The Chess board GUI acts as a helper for players to see the current state of the board, make a valid move and export the state of the board as in PGN format (e.g. _'1. d3 e6 2. Qd2 Qg5 3. Qxg5 Bd6 4. Qf4'_)

#### Loading the current state of the board from PGN

A player can paste the PGN string into the input box and click `Load moves (PGN)`. This will apply the list of moves to the chess board.

#### Make a valid move

The chess board should show an arrow indicating the last move made, the current player turn, and allow the user to make a valid move by dragging and dropping a piece.

#### Export the state of the board

When the player makes a move, the current state of the board is shown in PGN format (e.g. _'1. d3 e6 2. Qd2 Qg5 3. Qxg5 Bd6 4. Qf4'_). The player can paste this into the `ENCODE MESSAGE` form when constructing a message.

### ENCODE MESSAGE form

A form is provided to help the player construct and sign a valid message. The valid message contains:
1. The opponents public address (`address`)
2. The chess pgn string containing the move the player made (`string`)
3. The move number (`uint256`)
4. The address of the contract on the network, which identifies the game itself (`address`)

This message should be signed by the player. When sending the signed message to the player, all of the un-encoded field values should also be sent to the opponent so they can verify the contents of the message against your public key.

### DECODE MESSAGE form

A form is provided to help the player decode and verify the contents of a message from their opponent. The decoded message unpacks the fields listed above. The PGN string from the decoded message can be used to load the current board state before making a move.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
