# Kakoru Puzzle Helper
## WARNING! - This is a work in progress with lots to do!

This app provides a simple web-based Kakuro puzzle that you can solve interactively.
It is currently a work in progress, porting from a working plain-old-javascript implementation to React.js (mostly for my own edification).

It will currently:
- Display a single fixed puzzle (from a set of clues) that you can complete
- Support navigaition via tabs, clicks and arrow keys
- Shows hints for:
    - possible combinations for clues
    - Cell value hints based on clues and already completed cells
    - Highlight entries that are invalid because of duplicates or not possible based on the clues
    - Highlight entries that are duplicate numbers in a row or column
- allow loading/entry of new puzzles from a set of clues (currently a fixed dropdown list)

### Things to do
* clue combination hints are filtered to hide invalid combination - but this uses a mutating state variable (not very good React). Fix this.
* allow manual entry/update of the cell value hints (so we can reduce our own)
* implement a "next step" helper (as per the original Javascript version)
* port the editing view to allow direct entry of a puzzle (clue sets created in the original Javascript version should work in this version too)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
