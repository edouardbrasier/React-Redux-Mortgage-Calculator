import React,{Component} from 'react'
import Slider from 'material-ui/Slider'
import AppBar from 'material-ui/AppBar'
import {Card, CardText} from 'material-ui/Card'
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
    const Class_initial_period= this.props.Initial_Period>0 ? 'text' : 'hidden-div';
    const Class_initial_period_results= this.props.Initial_Period>0 ? 'TextResults' : 'hidden-div';
    //only show graph if there is capital to repay
    const Class_Capital= this.props.Type ==='Capital repayment' &&  this.props.Monthly_Cost_Initial > 0 ? '' : 'hidden-div';
    return (
      <div >
      <MuiThemeProvider>
      <AppBar
      title="Mortgage"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      </MuiThemeProvider>
      <div className="card">
      <MuiThemeProvider>
      <Card >
      <CardText>
      <div className="Container">
      <div className="notgrouped">
      <div className="text">
      <span className="Textinput">{'The property price: '}
      <NumberFormat value={this.props.Property.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'} />
      </span>
      </div>
      <div className="numeric">
      <NumericInput
      className="numericinput"
      inputMode="numeric"
      min={this.props.Min_Property}
      max={this.props.Max_Property}
      step={this.props.Step_Property}
      value={this.props.Property}
      precision={2}
      format={myFormatCurrency}
      onChange={this.handleInputProperty}
      />
      </div>
      </div>
      <div className="slider">
      <MuiThemeProvider>
      <Slider
      className="sliderinput"
      min={this.props.Min_Property}
      max={this.props.Max_Property}
      step={this.props.Step_Property}
      value={this.props.Property}
      onChange={this.handleFirstSliderProperty}
      />
      </MuiThemeProvider>
      </div>
      </div>
      <div className="Container">
      <div className="notgrouped">
      <div className="text">
      <span className="Textinput">{'The deposit is: '}
      <NumberFormat value={this.props.Deposit.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'} />
      </span>
      </div>
      <div className="numeric">
      <NumericInput
      className="numericinput"
      inputMode="numeric"
      min={this.props.Min_Deposit}
      max={this.props.Max_Deposit}
      step={this.props.Step_Deposit}
      value={this.props.Deposit}
      precision={2}
      format={myFormatCurrency}
      onChange={this.handleInputDeposit}
      />
      </div>
      </div>
      <div className="slider">
      <MuiThemeProvider>
      <Slider
      className="sliderinput"
      min={this.props.Min_Deposit}
      max={this.props.Max_Deposit}
      step={this.props.Step_Deposit}
      value={this.props.Deposit}
      onChange={this.handleFirstSliderDeposit}
      />
      </MuiThemeProvider>
      </div>
      </div>
      </CardText>
      </Card>
      </MuiThemeProvider>
      </div>
      <div className="card">
      <MuiThemeProvider>
      <Card >
      <CardText>
      <div className="Container">
      <div>
      <div className="text">
      {'Mortgage Type '}
      </div>
      <div className="menu">
      <MuiThemeProvider>
      <SelectField style={{fontSize: "3.0vh"}}
      value={this.props.Type}
      onChange={this.handleChangeType}
      >
      <MenuItem value={'Capital repayment'} primaryText="Capital repayment" />
      <MenuItem value={'Interest only'} primaryText="Interest only" />
      </SelectField>
      </MuiThemeProvider>
      </div>
      </div>
      <div>
      <div className="text">
      {'Repayment period '}
      </div>
      <div className="menu">
      <MuiThemeProvider>
      <DropDownMenu style={{fontSize: "3.0vh"}}  maxHeight={300} value={this.props.Mortgage_Term} onChange={this.handleChangeMortgage_Term}>
      {this.props.years}
      </DropDownMenu>
      </MuiThemeProvider>
      </div>
      </div>
      <div>
      <div className="text">
      {'Initial period '}
      </div>
      <div className="menu">
      <MuiThemeProvider>
      <DropDownMenu style={{fontSize: "3.0vh"}} maxHeight={300} value={this.props.Initial_Period} onChange={this.handleChangeInitial_Period}>
      {this.props.initialyears}
      </DropDownMenu>
      </MuiThemeProvider>
      </div>
      </div>
      </div>
      </CardText>
      </Card>
      </MuiThemeProvider>
      </div>
      <div className="card">
      <MuiThemeProvider>
      <Card >
      <CardText>
      <div className="Container">
      <div className="notgrouped">
      <div className="text">
      {'Initial interest Rate '}
      </div>
      <div className="numericshort">
      <NumericInput
      className="numericinputshort"
      min={0}
      max={100}
      step={0.01}
      value={this.props.Interest_Initial}
      precision={2}
      format={myFormatPercentage}
      onChange={this.handleInputInterest_Initial}
      />
      </div>
      </div>
      <div className="notgrouped">
      <div className={Class_initial_period}>
      {'Interest Rate Then'}
      </div>
      <div className={Class_initial_period}>
      <NumericInput
      className="numericinputshort"
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
      </div>
      <div className="TextResultsdiv">
      <span className="TextResults">{'The monthly cost is'} <NumberFormat value={this.props.Monthly_Cost_Initial.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></span>
      <span className={Class_initial_period_results}>
      {' then '} <NumberFormat value={this.props.Monthly_Cost_Then.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'} />{' after initial period '}</span>
      </div>
      </div>
      </CardText>
      </Card>
      </MuiThemeProvider>
      </div>
      <div className="card">
      <MuiThemeProvider>
      <Card >
      <CardText className={Class_Capital}>
      <div className="text">
      {'Graph Type '}
      </div>
      <div className="menu">
      <MuiThemeProvider>
      <SelectField style={{fontSize: "3.0vh"}}
      value={this.props.Graph_Type}
      onChange={this.handleChangeGraph_Type}
      >
      <MenuItem value={'Monthly Equity Gain'} primaryText='Monthly Equity Gain'/>
      <MenuItem value={'Remaining Capital'} primaryText='Remaining Capital'/>
      </SelectField>
      </MuiThemeProvider>
      </div>
      <div className={Class_Capital}>
      <rcl.ChartLine data={this.props.chart}/>
      </div>
      </CardText>
      </Card>
      </MuiThemeProvider>
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
