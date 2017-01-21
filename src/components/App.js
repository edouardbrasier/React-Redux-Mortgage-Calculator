import React,{Component} from 'react'
import Slider from 'material-ui/Slider'
import NumericInput from 'react-numeric-input'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NumberFormat from 'react-number-format';

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

export default class App extends Component {
  handleFirstSliderProperty = (event, value) => {
    this.props.propertyChangeAction(value);
  };

  handleInputProperty = (event, value) => {
    this.props.propertyChangeAction(value);
    this.setState({input: value});
  };

  handleFirstSliderDeposit = (event, value) => {
    this.props.depositChangeAction(value);
  };

  handleInputDeposit = (event, value) => {
    this.props.depositChangeAction(value);
    this.setState({input: value});
  };
  render() {
    return (
      <div>
      <p>
      <span>{'The property price: '}</span>
      <span><NumberFormat value={this.props.Property.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></span>
      </p>
      <NumericInput
      min={this.props.Min_Property}
      max={this.props.Max_Property}
      step={this.props.Step_Property}
      value={this.props.Property}
      precision={2}
      onChange={this.handleInputProperty}
      />
      <MuiThemeProvider>
      <Slider
      min={this.props.Min_Property}
      max={this.props.Max_Property}
      step={this.props.Step_Property}
      value={this.props.Property}
      onChange={this.handleFirstSliderProperty}
      />
      </MuiThemeProvider>

      <p>
      <span>{'Your Deposit: '}</span>
      <span><NumberFormat value={this.props.Deposit.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></span>
      </p>
      <NumericInput
      min={this.props.Min_Deposit}
      max={this.props.Max_Deposit}
      step={this.props.Step_Deposit}
      value={this.props.Deposit}
      precision={2}
      onChange={this.handleInputDeposit}
      />
      <MuiThemeProvider>
      <Slider
      min={this.props.Min_Deposit}
      max={this.props.Max_Deposit}
      step={this.props.Step_Deposit}
      value={this.props.Deposit}
      onChange={this.handleFirstSliderDeposit}
      />
      </MuiThemeProvider>

      <div>The monthly cost is <NumberFormat value={this.props.Monthly_Cost_Initial.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></div>
      </div>
    );
  }
}
