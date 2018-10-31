/**
 * PuzzleGrid is the main display grid area for the puzzle.
 * It provides selection, data entry, hints, etc.
 */

import React, { Component } from 'react';
import ClueLabel from './ClueLabel';
import PuzzleCell from './PuzzleCell';

export default class PuzzleGrid extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    let rval = [];

    // add the bulk of the array (including header rows/cols)
    for (let r = 0; r <= this.props.rows; r++) {
      for (let c = 0; c <= this.props.cols; c++) {

        const cell = (r > 0 && c > 0) ?
          this.props.cells[(r - 1) * this.props.rows + (c - 1)] :
          { key: `${String.fromCharCode(64 + c)}${r}`, clues: [] };

        if (cell.clues.length === 2) {
          // this is a value cell.
          rval.push(<PuzzleCell key={cell.key} cell={cell} 
            highlightInvalid={this.props.showValidCells} 
            showValues={this.props.showCellHints}
            onChange={(v) => this.props.onCellUpdate(cell, v)}
            onNavigate={this.props.onNavigate}
          />);
        } else {
          // this is a clue or blank 
          let clues = [];
          for (const cl of this.props.clues) {
            if (cell.key === `${cl.C0}${cl.R0}`) {
              clues.push(<ClueLabel key={cl.name} clue={cl} showPopup={this.props.showClueHints} />);
            }
          }

          rval.push(<div key={cell.key} className='puzzleClue'>{clues}</div>);
        }

      }
    }

    const toSolve = this.props.cells.filter(e => e.value === null || e.invalid);
    if (toSolve === 0) {
      console.log('SOLVED!!');
    }

    const styleOverride = {
      gridTemplateRows: `repeat(${this.props.rows + 1}, 3em)`,
      gridTemplateColumns: `repeat(${this.props.cols + 1}, 3em)`
    }

    return (<div className='puzzleGrid' style={styleOverride}>{rval}</div>);
  }
}



