import React, { Component } from 'react';

export default class ClueLabel extends Component {
    constructor(props) {
      super(props);
  
      this.state = { hintVisible: false }
    }
  
    render() {
      const className = (this.props.clue.C1 === this.props.clue.C2) ? 'clueDown' : 'clueRight';
      const hint = <div className='cluePopup'>
        <div className='title'>{this.props.clue.value}&nbsp;in&nbsp;{this.props.clue.length}</div>
        <div className='body'>{this.props.clue.combos.map(
          (c, i) => <span key={this.props.clue.name + i} >{`(${c.split('').join(',')})`}</span>
        )}</div>
      </div>;
  
      return (<div className={className}
        onMouseOver={this.props.showPopup ? () => this.setState({ hintVisible: true }) : null}
        onMouseOut={() => this.setState({ hintVisible: false })}
      >{this.props.clue.value}{this.state.hintVisible ? hint : null}</div>
      );
    }
  }
  