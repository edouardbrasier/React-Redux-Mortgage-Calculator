import React from 'react'
//not a consistent rendering because of ontouch see interactive example
//https://github.com/vlad-ignatov/react-numeric-input
import NumericInput from 'react-numeric-input'
import { principalChange } from '../actions/actions'

import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

class Numeric_Connected extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  handleInput = (event, value) => {
    this.props.principalChangeAction(value);
    this.setState({input: value});
  };

  render() { return (
    <div>
    <p>
    <span>{'The property price is: '}</span>
    <span>{this.props.Principal}</span>
    </p>
    <NumericInput
    min={this.props.Min_Principal}
    max={this.props.Max_Principal}
    step={this.props.Step_Principal}
    value={this.props.Principal}
    onChange={this.handleInput}
    />
    </div>
  );
}
}

function mapDispatchToProps(dispatch) {
  return {
    principalChangeAction: bindActionCreators(principalChange, dispatch),
  }
}

function mapStateToProps(state) {
  const Min_Principal = state.finance.Static_Data.Min_Principal;
  const Max_Principal = state.finance.Static_Data.Max_Principal;
  const Step_Principal= state.finance.Static_Data.Step_Principal;
  const principal = state.finance.Principal;
  return {
    Principal: principal,
    Min_Principal: Min_Principal,
    Max_Principal: Max_Principal,
    Step_Principal: Step_Principal,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Numeric_Connected)
