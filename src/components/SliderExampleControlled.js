import React, {Component} from 'react';
import Slider from 'material-ui/Slider';
import { principalChange } from '../actions/actions'
/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */

import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'



class SliderExampleControlled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstSlider:50000,
      secondSlider:15,
    };
  }

  handleFirstSlider = (event, value) => {
    this.props.principalChangeAction(value);
    this.setState({firstSlider: value});
  };

  handleSecondSlider = (event, value) => {
    this.setState({secondSlider: value});
  };

  render() {
    return (
      <div>
        <Slider
          min={this.props.Min_Principal}
          max={1000000}
          step={10000}
          //defaultValue={100000}
          value={this.state.firstSlider}
          onChange={this.handleFirstSlider}
        />
        <p>

        <span>{'The value of this slider is: '}</span>
        <span>{this.state.firstSlider}</span>
        <span>{' from a range of 0 to 100000 inclusive'}</span>
        <span>{'My minimum is haha : '}</span>
      <span>{this.props.Min_Principal}</span>
        </p>
        <Slider
          min={0}
          max={100}
          step={1}
          //defaultValue={50}
          value={this.state.secondSlider}
          onChange={this.handleSecondSlider}
        />
        <p>
          <span>{'The value of this slider is: '}</span>
          <span>{this.state.secondSlider}</span>
          <span>{' from a range of 0 to 100 inclusive'}</span>
        </p>
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
    const Min_Principal = state.Static_Data.Min_Principal;
  return {
  Min_Principal: Min_Principal,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SliderExampleControlled)
