/**
 * App is the main container for the Kakuro puzzle
 * It maintains the data and logic for running the game.
 */
import React, { Component } from 'react';
import './App.css';
import PuzzleGrid from './PuzzleGrid';

const DEFAULT_CLUES = 'B1:B6=37;C1:C2=5;D1:D3=17;E1:E4=12;H1:H2=16;I1:I2=10;A2:A5=27;G2:G6=32;F3:F5=23;C4:C8=31;H4:H9=30;D5:D7=8;I5:I8=29;E6:E9=10;F7:F9=22;A8:A9=8;B8:B9=15;G8:G9=17;B1:E1=22;H1:I1=11;A2:E2=16;G2:I2=23;A3:B3=16;D3:G3=12;A4:C4=23;E4:H4=27;A5:D5=29;F5:I5=29;B6:E6=12;G6:I6=24;C7:F7=13;H7:I7=12;A8:C8=23;E8:I8=24;A9:B9=8;E9:H9=25'
const CLUE_RE = /([A-Z]+)([1-9][0-9]*):([A-Z]+)([1-9][0-9]*)=([0-9]+)/;
const CLUE_COMBINATIONS = new Map([
  ['2.3',['12']],
  ['2.4',['13']],
  ['2.5',['14', '23']],
  ['2.6',['15', '24']],
  ['2.7',['16', '25', '34']],
  ['2.8',['17', '26', '35']],
  ['2.9',['18', '27', '36', '45']],
  ['2.10',['19', '28', '37', '46']],
  ['2.11',['29', '38', '47', '56']],
  ['2.12',['39', '48', '57']],
  ['2.13',['49', '58', '67']],
  ['2.14',['59', '68']],
  ['2.15',['69', '78']],
  ['2.16',['79']],
  ['2.17',['89']],
  ['3.6',['123']],
  ['3.7',['124']],
  ['3.8',['125', '134']],
  ['3.9',['126', '135', '234']],
  ['3.10',['127', '136', '145', '235']],
  ['3.11',['128', '137', '146', '236', '245']],
  ['3.12',['129', '138', '147', '156', '237', '246', '345']],
  ['3.13',['139', '148', '157', '238', '247', '256', '346']],
  ['3.14',['149', '158', '167', '239', '248', '257', '347', '356']],
  ['3.15',['159', '168', '249', '258', '267', '348', '357', '456']],
  ['3.16',['169', '178', '259', '268', '349', '358', '367', '457']],
  ['3.17',['179', '269', '278', '359', '368', '458', '467']],
  ['3.18',['189', '279', '369', '378', '459', '468', '567']],
  ['3.19',['289', '379', '469', '478', '568']],
  ['3.20',['389', '479', '569', '578']],
  ['3.21',['489', '579', '678']],
  ['3.22',['589', '679']],
  ['3.23',['689']],
  ['3.24',['789']],
  ['4.10',['1234']],
  ['4.11',['1235']],
  ['4.12',['1236', '1245']],
  ['4.13',['1237', '1246', '1345']],
  ['4.14',['1238', '1247', '1256', '1346', '2345']],
  ['4.15',['1239', '1248', '1257', '1347', '1356', '2346']],
  ['4.16',['1249', '1258', '1267', '1348', '1357', '1456', '2347', '2356']],
  ['4.17',['1259', '1268', '1349', '1358', '1367', '1457', '2348', '2357', '2456']],
  ['4.18',['1269', '1278', '1359', '1368', '1458', '1467', '2349', '2358', '2367', '2457', '3456']],
  ['4.19',['1279', '1369', '1378', '1459', '1468', '1567', '2359', '2368', '2458', '2467', '3457']],
  ['4.20',['1289', '1379', '1469', '1478', '1568', '2369', '2378', '2459', '2468', '2567', '3458', '3467']],
  ['4.21',['1389', '1479', '1569', '1578', '2379', '2469', '2478', '2568', '3459', '3468', '3567']],
  ['4.22',['1489', '1579', '1678', '2389', '2479', '2569', '2578', '3469', '3478', '3568', '4567']],
  ['4.23',['1589', '1679', '2489', '2579', '2678', '3479', '3569', '3578', '4568']],
  ['4.24',['1689', '2589', '2679', '3489', '3579', '3678', '4569', '4578']],
  ['4.25',['1789', '2689', '3589', '3679', '4579', '4678']],
  ['4.26',['2789', '3689', '4589', '4679', '5678']],
  ['4.27',['3789', '4689', '5679']],
  ['4.28',['4789', '5689']],
  ['4.29',['5789']],
  ['4.30',['6789']],
  ['5.15',['12345']],
  ['5.16',['12346']],
  ['5.17',['12347', '12356']],
  ['5.18',['12348', '12357', '12456']],
  ['5.19',['12349', '12358', '12367', '12457', '13456']],
  ['5.20',['12359', '12368', '12458', '12467', '13457', '23456']],
  ['5.21',['12369', '12378', '12459', '12468', '12567', '13458', '13467', '23457']],
  ['5.22',['12379', '12469', '12478', '12568', '13459', '13468', '13567', '23458', '23467']],
  ['5.23',['12389', '12479', '12569', '12578', '13469', '13478', '13568', '14567', '23459', '23468', '23567']],
  ['5.24',['12489', '12579', '12678', '13479', '13569', '13578', '14568', '23469', '23478', '23568', '24567']],
  ['5.25',['12589', '12679', '13489', '13579', '13678', '14569', '14578', '23479', '23569', '23578', '24568', '34567']],
  ['5.26',['12689', '13589', '13679', '14579', '14678', '23489', '23579', '23678', '24569', '24578', '34568']],
  ['5.27',['12789', '13689', '14589', '14679', '15678', '23589', '23679', '24579', '24678', '34569', '34578']],
  ['5.28',['13789', '14689', '15679', '23689', '24589', '24679', '25678', '34579', '34678']],
  ['5.29',['14789', '15689', '23789', '24689', '25679', '34589', '34679', '35678']],
  ['5.30',['15789', '24789', '25689', '34689', '35679', '45678']],
  ['5.31',['16789', '25789', '34789', '35689', '45679']],
  ['5.32',['26789', '35789', '45689']],
  ['5.33',['36789', '45789']],
  ['5.34',['46789']],
  ['5.35',['56789']],
  ['6.21',['123456']],
  ['6.22',['123457']],
  ['6.23',['123458', '123467']],
  ['6.24',['123459', '123468', '123567']],
  ['6.25',['123469', '123478', '123568', '124567']],
  ['6.26',['123479', '123569', '123578', '124568', '134567']],
  ['6.27',['123489', '123579', '123678', '124569', '124578', '134568', '234567']],
  ['6.28',['123589', '123679', '124579', '124678', '134569', '134578', '234568']],
  ['6.29',['123689', '124589', '124679', '125678', '134579', '134678', '234569', '234578']],
  ['6.30',['123789', '124689', '125679', '134589', '134679', '135678', '234579', '234678']],
  ['6.31',['124789', '125689', '134689', '135679', '145678', '234589', '234679', '235678']],
  ['6.32',['125789', '134789', '135689', '145679', '234689', '235679', '245678']],
  ['6.33',['126789', '135789', '145689', '234789', '235689', '245679', '345678']],
  ['6.34',['136789', '145789', '235789', '245689', '345679']],
  ['6.35',['146789', '236789', '245789', '345689']],
  ['6.36',['156789', '246789', '345789']],
  ['6.37',['256789', '346789']],
  ['6.38',['356789']],
  ['6.39',['456789']],
  ['7.28',['1234567']],
  ['7.29',['1234568']],
  ['7.30',['1234569', '1234578']],
  ['7.31',['1234579', '1234678']],
  ['7.32',['1234589', '1234679', '1235678']],
  ['7.33',['1234689', '1235679', '1245678']],
  ['7.34',['1234789', '1235689', '1245679', '1345678']],
  ['7.35',['1235789', '1245689', '1345679', '2345678']],
  ['7.36',['1236789', '1245789', '1345689', '2345679']],
  ['7.37',['1246789', '1345789', '2345689']],
  ['7.38',['1256789', '1346789', '2345789']],
  ['7.39',['1356789', '2346789']],
  ['7.40',['1456789', '2356789']],
  ['7.41',['2456789']],
  ['7.42',['3456789']],
  ['8.36',['12345678']],
  ['8.37',['12345679']],
  ['8.38',['12345689']],
  ['8.39',['12345789']],
  ['8.40',['12346789']],
  ['8.41',['12356789']],
  ['8.42',['12456789']],
  ['8.43',['13456789']],
  ['8.44',['23456789']],
  ['9.45',['123456789']],
]);

// DEVELOPMENT FEATURE FLAGS
const CHECK_CELL_DUPLICATES = true;
const CHECK_CELL_COMBOS = true;

class App extends Component {
  constructor (props) {
    super (props);

    let cluearray = [];
    if (typeof props.clues == 'string') {
      cluearray = props.clues.split(';');
    } else {
      cluearray = DEFAULT_CLUES.split(';');
    }

    this.state = this.parseClues(cluearray);
    console.debug('App: initialised with state=', this.state);

    this.onUpdateCellValue = this.onUpdateCellValue.bind(this);
  }

  parseClues (cluearray) {
    console.log('parseClues');
    if (cluearray.length === 0) {
      return { rows: 0, cols: 0, cells: [] };
    }

    // determine the size from the clues...
    let clues = [];
    let rows = 0;
    let cols = 0;
    for (const cluestr of cluearray) {
      let [, C1, R1, C2, R2, VAL] = cluestr.match(CLUE_RE);
      rows = Math.max(rows, R1, R2);
      cols = Math.max(cols, C1.charCodeAt(0) - 64, C2.charCodeAt(0) - 64);

      // save the clue for later...
      let clue = {
        name: cluestr,
        value: VAL,
        C0: (C1 === C2) ? C1 : String.fromCharCode(Math.min(C1.charCodeAt(0),C2.charCodeAt(0)) - 1),
        R0: (R1 === R2) ? R1 : Math.min(R1, R2) - 1,
        C1: String.fromCharCode(Math.min(C1.charCodeAt(0),C2.charCodeAt(0))),
        R1: Math.min(R1, R2),
        C2: String.fromCharCode(Math.max(C1.charCodeAt(0),C2.charCodeAt(0))),
        R2: Math.max(R1, R2),
        length: Math.abs(R2 - R1) + Math.abs(C2.charCodeAt(0) - C1.charCodeAt(0)) + 1,
      };
      clue.combos = CLUE_COMBINATIONS.get(`${clue.length}.${clue.value}`);

      clues.push(clue);

    }
    console.debug(`App: parsed ${clues.length} clues to get ${rows}x${cols} puzzle`);

    // set up an array of cells for the puzzle (does not include header row/col for the puzzle clues)
    let cells = [];
    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        let ch = String.fromCharCode(64 + c);
        let cell = { key: `${ch}${r}`, index: (r-1) * cols + c, clues: [], value: null };
        for (let l of clues) {
          if (r >= l.R1 && r <= l.R2 && ch >= l.C1 && ch <= l.C2) {
            cell.clues.push(l);
          }
        }
        cells.push(cell);
      }
    }

    // set an initial mask for each cell...
    for (const cell of cells.filter(e => e.clues.length > 0)) {
      let mask = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      for (const clue of cell.clues) {
        let cluemask = clue.combos.reduce( (prev, curr) => prev + curr, '' );
        mask = mask.filter (e => cluemask.indexOf(e) >= 0);
      }
      
      cell.mask = mask;
      // console.debug('MASK for ' + cell.key + '=' + mask + ' (', cell.clues[0].combos, cell.clues[1].combos);
    } 

    // return a potential new state
    return { rows, cols, cells, clues };
  }

  onUpdateCellValue (cell, value) {
    if (cell.value === value) return; // no change

    console.log(`Change ${cell.key} to ${value}`);
    let newCells = this.state.cells.slice();
    for (const c of newCells) {
      if (c.key === cell.key) c.value = value;
    };
    
    // TODO: Transcribe the computations that update cell masks
    
    // check cell validity after the change...
    this.validateCells(newCells, this.state.clues);

    // ... and update the state
    this.setState({ cells: newCells });
  }

  validateCells (cells, clues) {
    // start by setting all cells to valid...
    for (const c of cells) {
      c.invalid = false;
    }

    // Check that all cells in this clue are valid.
    for (const cl of clues) {
      // check there are no two cells in a clue that have the same value
      // given a clue is either a row or col - take one direction only...
      const allvals = cl.combos.join('').split('').sort();

      const fromIdx = (cl.R1 - 1) * this.state.cols + cl.C1.charCodeAt(0) - 65;
      const toIdx = (cl.R2 - 1) * this.state.cols + cl.C2.charCodeAt(0) - 65;
      const stepIdx = (cl.R1 === cl.R2) ? 1 : this.state.cols;

      // Run through each cell in the clue...
      for (let i = fromIdx; i <= toIdx; i += stepIdx) {
        if (cells[i].value !== null) {

          if (CHECK_CELL_COMBOS) {
            // Check that values are possible given the active combos
            if (cells[i].value !== null && allvals.indexOf(cells[i].value) < 0) {
              cells[i].invalid = true;
            }
          }

          if (CHECK_CELL_DUPLICATES) {
            // check for duplicate values in the clue
            for (let j = i + stepIdx; j <= toIdx; j += stepIdx) {  
              if (cells[j].value === cells[i].value) {
                cells[i].invalid = true;
                cells[j].invalid = true;
              }
            }
          }

        }
      } // for (let i = fromIdx; i <= toIdx; i += stepIdx) {...}

    } // for (const cl of clues) {...}

  } // validateCells()

  onSetOption (name, value) {
    let newstate = {};
    newstate[name] = value;
    this.setState( newstate );
  }

  render() {
    // console.log('App.render', this.state);
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Kakuro Puzzle: {this.state.rows}x{this.state.cols} / {this.state.clues.length} clues
          </p>
        </header>
        <div className="App-content">
          <PuzzleGrid {...this.state} onCellUpdate={this.onUpdateCellValue} />
        </div>
        <div className="App-content">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            Hints: 
            <input type="checkbox" className="optionButton" id="clueHints" 
              onChange={(e) => this.onSetOption('showClueHints', e.target.checked)}/>
            <label htmlFor="clueHints">Clue Hints</label>

            <input type="checkbox" className="optionButton" id="cellValid" 
              onChange={(e) => this.onSetOption('showValidCells', e.target.checked)}/>
            <label htmlFor="cellValid">Cell Validation Hints</label>
            
            <input type="checkbox" className="optionButton" id="cellHints"
                onChange={(e) => this.onSetOption('showCellHints', e.target.checked)}/>
            <label htmlFor="cellHints">Cell Value Hints</label>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
