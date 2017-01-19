import React, {Component} from 'react'
import Slider from 'material-ui/Slider'
import { principalChange } from '../actions/actions'

import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

class Slider_Connected extends Component {

  handleFirstSlider = (event, value) => {
    this.props.principalChangeAction(value);
  };

  render() {
    return (
      <div>
      <Slider
      min={this.props.Min_Principal}
      max={this.props.Max_Principal}
      step={this.props.Step_Principal}
      value={this.props.Principal}
      // defaultValue={}
      onChange={this.handleFirstSlider}
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

export default connect(mapStateToProps,mapDispatchToProps)(Slider_Connected)
