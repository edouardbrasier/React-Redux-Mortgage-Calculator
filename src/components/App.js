//hsbc is very innaccurate //http://www.hsbc.co.uk/1/2/mortgages/repayment-calculator
//http://www.1728.org/mortpmts.htm

import React,{Component} from 'react'
import Slider from 'material-ui/Slider'
import NumericInput from 'react-numeric-input'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NumberFormat from 'react-number-format'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import "chart.js"
import rcl from "react-chart-line"
import './App.css'

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showinitial: 1};
  }

  handleChangeInitial_Period = (event, index, value) => {
    this.props.Initial_PeriodChangeAction(value);
    this.setState({value});
    this.setState({
      showinitial: value
    })
  }
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

  handleChangeMortgage_Term = (event, index, value) => {
    this.props.Mortgage_TermChangeAction(value);
    this.setState({value});
  }


  handleChangeType = (event, index, value) => {
    this.setState({value});
    this.props.typeChangeAction(value);
  }

  handleChangeGraph_Type = (event, index, value) => {
    this.setState({value});
    this.props.graphtypeChangeAction(value);
  }


  handleInputInterest_Initial = (event, value) => {
    this.props.Interest_InitialChangeAction(value);
    this.setState({input: value});
  };

  handleInputInterest_Then = (event, value) => {
    this.props.Interest_ThenChangeAction(value);
    this.setState({input: value});
  };

  render() {

     //only show interest rate then and monthly cost after initial period if there is an initial period
    const toggle_initial_period= this.props.Initial_Period>0 ? false : true;
    const Class_initial_period= this.props.Initial_Period>0 ? '' : 'hidden-div';
    //only show the chart if the mortgage type is capital reapyment and if the ammount borrowed is more than 0
    const Class_Capital= this.props.Type ==='Capital repayment' &&  this.props.Monthly_Cost_Initial > 0 ? '' : 'hidden-div';
    return (

      <div>
      <div id="PropertyContainer">

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
      format={myFormatCurrency}
      onChange={this.handleInputProperty}
      />
      </div>

      <div>

      <MuiThemeProvider>
      <Slider
      min={this.props.Min_Property}
      max={this.props.Max_Property}
      step={this.props.Step_Property}
      value={this.props.Property}
      format={myFormatCurrency}
      onChange={this.handleFirstSliderProperty}
      />
      </MuiThemeProvider>
      </div>
      </div>



      <div id="DepositContainer">

      <div>
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
      format={myFormatCurrency}
      onChange={this.handleInputDeposit}
      />
      </div>

      <div>
      <MuiThemeProvider>
      <Slider
      min={this.props.Min_Deposit}
      max={this.props.Max_Deposit}
      step={this.props.Step_Deposit}
      value={this.props.Deposit}
      onChange={this.handleFirstSliderDeposit}
      />
      </MuiThemeProvider>
      </div>

      </div>

      <div id="Mortgage_TermContainer">
      {'Repayment period '}
      <MuiThemeProvider>
      <DropDownMenu  maxHeight={300} value={this.props.Mortgage_Term} onChange={this.handleChangeMortgage_Term}>
      {this.props.years}
      </DropDownMenu>
      </MuiThemeProvider>
      </div>

      <div id="Initial_PeriodContainer">
      {'Initial period '}
      <MuiThemeProvider>
      <DropDownMenu maxHeight={300} value={this.props.Initial_Period} onChange={this.handleChangeInitial_Period}>
      {this.props.initialyears}
      </DropDownMenu>
      </MuiThemeProvider>
      </div>


      <div id="TypeContainer">
      {'Mortgage Type '}
      <MuiThemeProvider>
      <SelectField
      value={this.props.Type}
      onChange={this.handleChangeType}
      >
      <MenuItem value={'Capital repayment'} primaryText="Capital repayment" />
      <MenuItem value={'Interest only'} primaryText="Interest only" />
      </SelectField>
      </MuiThemeProvider>
      </div>

      <div id="Interest_InitialContainer">
      {'Interest Rate '}<NumericInput
      min={0}
      max={100}
      step={0.01}
      value={this.props.Interest_Initial}
      precision={2}
      format={myFormatPercentage}
      onChange={this.handleInputInterest_Initial}
      />
      </div>

      <div id="Interest_ThenContainer" className={Class_initial_period}>
      Then
      <NumericInput
      min={0}
      max={100}
      step={0.01}
      value={this.props.Interest_Then}
      precision={2}
      format={myFormatPercentage}
      disabled={ toggle_initial_period}
      onChange={this.handleInputInterest_Then}
      />
      </div>
      <div>The monthly cost will be <NumberFormat value={this.props.Monthly_Cost_Initial.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></div>
      <div className={Class_initial_period} >Then after the end of the initial period the cost will be <NumberFormat value={this.props.Monthly_Cost_Then.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></div>

      <div id="GraphTypeContainer">
      {'Graph Type '}
      <MuiThemeProvider>
      <SelectField
      value={this.props.Graph_Type}
      onChange={this.handleChangeGraph_Type}
      >
      <MenuItem value={'Monthly Equity Gain'} primaryText='Monthly Equity Gain' />
      <MenuItem value={'Remaining Capital'} primaryText='Remaining Capital' />
      </SelectField>
      </MuiThemeProvider>
      </div>
      <div className={Class_Capital}  >
      <rcl.ChartLine data={this.props.chart} />
      </div>
      </div>
    );
  }
}

function myFormatCurrency(num) {
  return num + ' £';
}
function myFormatPercentage(num) {
  return num + '%';
}
