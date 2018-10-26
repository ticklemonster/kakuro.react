This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Kakoru Puzzle Helper

This app provides a simple web-based Kakuro puzzle that you can solve interactively.
It is currently a work in progress, porting from a working plain-old-javascript implementation to React.js (mostly for my own edification).

It will currently:
- Display a single fixed puzzle (from a set of clues) that you can complete
- Show hints for valid clue combinations
- Highlight entries that are invalid because of duplicates or not possible based on the clues
- Highlight entries that are duplicate numbers in a row or column
- Show hints for valid cell values (based on clues only)

### Things to do
* Update cell value hints based on already completed cells
* update clue hints based on already completed cells
* allow loading/entry of new puzzles from a set of clues (including resizing)
* port the editing view to allow direct entry of a puzzle (clue sets created in the original Javascript version should work in this version too)

