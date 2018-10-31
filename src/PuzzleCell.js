import React, { Component } from 'react';

export default class PuzzleCell extends Component {
    constructor(props) {
      super(props);
      this.state = { active: false, value: props.cell.value }
    }
  
    toggleActive() {
      // console.log({cell: this.props.cell, state: this.state});
      this.setState({ active: !this.state.active });
    }
  
    onKeyDown(event) {
      if (!this.state.active) return;
  
      const key = event.key;
      if (key >= '0' && key <= '9') 
        this.setState({ value: key });
  
      else if (key === 'Backspace' || key === 'Delete')
        this.setState({ value: null });
  
      else if (key === 'Enter')
        this.acceptChanges();
  
      else if (key === 'Escape')
        this.rejectChanges();

      else if ('|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|'.indexOf(key) > 0 && this.props.onNavigate) {
        this.props.onNavigate(key);
        event.preventDefault(true);
        return false; // cancel default behaviour
      }
      
      // else 
      //   console.debug({key});
    }
  
    acceptChanges() {
      // console.log('ACCEPT VALUE ' + this.state.value + ' for ' + this.props.cell.key);
      if (this.props.onChange) this.props.onChange(this.state.value);
    }
  
    rejectChanges() {
      // console.log('REJExCT VALUE ' + this.state.value + ' for ' + this.props.cell.key);
      this.setState({ value: this.props.cell.value });
    }
  
  
    render() {
      // console.log('Cell.render', this.state, this.props.cell);
      let classes = 'puzzleSpace';
      if (this.props.cell.invalid && this.props.highlightInvalid) classes += ' invalid';
      if (this.state.active) classes += ' active';
  
      let content = this.state.value;
      if (this.state.value === null && this.props.showValues) {
          content = <div className="cellHintGrid">
            <div>{this.props.cell.mask.indexOf('1') >= 0 ? '1' : ''}</div>
            <div>{this.props.cell.mask.indexOf('2') >= 0 ? '2' : ''}</div>
            <div>{this.props.cell.mask.indexOf('3') >= 0 ? '3' : ''}</div>
            <div>{this.props.cell.mask.indexOf('4') >= 0 ? '4' : ''}</div>
            <div>{this.props.cell.mask.indexOf('5') >= 0 ? '5' : ''}</div>
            <div>{this.props.cell.mask.indexOf('6') >= 0 ? '6' : ''}</div>
            <div>{this.props.cell.mask.indexOf('7') >= 0 ? '7' : ''}</div>
            <div>{this.props.cell.mask.indexOf('8') >= 0 ? '8' : ''}</div>
            <div>{this.props.cell.mask.indexOf('9') >= 0 ? '9' : ''}</div>
          </div>
      }
      return (
        <div className={classes}
          tabIndex={this.props.cell.index}
          onKeyDown={(e) => this.onKeyDown(e)}
          onFocus={() => this.setState({ active: true })}
          onBlur={() => { this.acceptChanges(); this.setState({ active: false }) }}
        >{content}</div>);
    }
  }
  
  