import React from 'react'
import { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { createAction } from 'redux-actions'
import{ createStore, combineReducers }  from 'redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import logo from './logo.svg'
//import './App.css'

import SliderExampleControlled from './SliderExampleControlled'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Tabs, Tab} from 'material-ui/Tabs'
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views'
import { connect, Provider } from 'react-redux';

//not a consistent rendering see answers gmail? Do they need to go to the store?
import NumericInput from 'react-numeric-input'
//https://github.com/vlad-ignatov/react-numeric-input

//maybe use that https://cdn.rawgit.com/hongymagic/react-number-input/master/demos/demo0/index.html

//what about static data?
const InitialState = {
    finance: {
        Principal: 50000,
        Type: 'Capital',
    Initial_Period: 0,
    Mortgage_Term: 20,
        Interest_Initial: 8,
    Interest_Then: 8,
    Monthly_Cost_Initial: 0,
        Monthly_Cost_Then: 0,
    Principal_Remaining: [],
    Yearly_Interest: [],
    Yearly_Capital: [],
      },
    charges: {},
  Consolidation: {},
};
//  Actions
const Actions = {
    PRINCIPAL_CHANGE: 'PRINCIPAL_CHANGE',
  TYPE_CHANGE: 'TYPE_CHANGE',
  INITIAL_PERIOD_CHANGE: 'INITIAL_PERIOD_CHANGE',
  MORTGAGE_TERM_CHANGE: 'MORTGAGE_TERM_CHANGE',
  INTEREST_INITIAL_CHANGE: 'INTEREST_INITIAL_CHANGE',
  INTEREST_THEN_CHANGE: 'INTEREST_THEN_CHANGE',
};
//  Action Creators
const principal_change = createAction(Actions.PRINCIPAL_CHANGE);
const type_change = createAction(Actions.TYPE_CHANGE);
const inital_period_change = createAction(Actions.INITIAL_PERIOD_CHANGE);
const mortgage_term_change = createAction(Actions.MORTGAGE_TERM_CHANGE);
const interest_initial_change = createAction(Actions.INTEREST_INITIAL_CHANGE);
const interest_then_change = createAction(Actions.INTEREST_THEN_CHANGE);
//  Reducers

const financeReducer = (state = InitialState.finance, action) => {
  let Principal,Type, Initial_Period, Mortgage_Term, Interest_Initial, Interest_Then;
  Principal= state.Principal;
  Type= state.Type;
  Initial_Period= state.Initial_Period;
  Mortgage_Term= state.Mortgage_Term;
  Interest_Initial= state.Interest_Initial
  Interest_Then= state.Interest_Then;

    switch (action.type) {
             case Actions.PRINCIPAL_CHANGE:
          Principal =  action.payload;
        break;
      case Actions.TYPE_CHANGE:
             Type =  action.payload;
        break;
      case Actions.INITIAL_PERIOD_CHANGE:
             Initial_Period =  action.payload;
        break;
      case Actions.MORTGAGE_TERM_CHANGE:
             Mortgage_Term =  action.payload;
        break;
      case Actions.INTEREST_INITIAL_CHANGE:
             Interest_Initial =  action.payload;
        break;
      case Actions.INTEREST_INITIAL_Then:
             Interest_Then =  action.payload;
        break;
      default:
    }

  let Monthly_Cost_Initial_temp1,Monthly_Cost_Initial_temp2,Monthly_Cost_Then_temp1,Monthly_Cost_Then_temp2;
  let Monthly_Cost_Initial,Monthly_Cost_Then;

  let Principal_Remaining_temp, Principal_Remaining_temp1,Principal_Remaining_temp2, Principal_Remaining_temp3;
  let Principal_Remaining=[];
  let Yearly_Interest=[];
  let Yearly_Capital=[];

  if (Type === "Capital"){ 
    //removed this condition because the first part is always the same if Initial period or not following not needed //if (Type == "Capital" && Initial_Period ==0){
    if (Interest_Initial > 0 ){
      Monthly_Cost_Initial_temp1 = (Interest_Initial/100/12*Principal);
      Monthly_Cost_Initial_temp2= Math.exp((((-1*Mortgage_Term)*12)*(Math.log((1+(Interest_Initial/100/12))))));
      Monthly_Cost_Initial = Monthly_Cost_Initial_temp1/(1-Monthly_Cost_Initial_temp2);
    } else {
      Monthly_Cost_Initial = Principal/12/Mortgage_Term;
    }

    if (Initial_Period >0) {	
      //remaining capital after each year during initial period
      for (let i = 1; i <= Initial_Period; i++) {
        if (Interest_Initial > 0 ){
          Principal_Remaining_temp1= (12/(Interest_Initial/100))*Monthly_Cost_Initial;
          Principal_Remaining_temp2= ((Monthly_Cost_Initial*12)/(Interest_Initial/100))- Principal;
          Principal_Remaining_temp3 = Math.exp((i*12)*Math.log((1+(Interest_Initial/100/12))));
          Principal_Remaining_temp = Principal_Remaining_temp1-(Principal_Remaining_temp2*Principal_Remaining_temp3);
        } else {
          Principal_Remaining_temp= Principal- (12*i*Monthly_Cost_Initial);
        }
        Principal_Remaining_temp= Math.max(0,Principal_Remaining_temp);
        Principal_Remaining =[...Principal_Remaining,Principal_Remaining_temp];
        if (i===1){
          Yearly_Capital= [...Yearly_Capital,Principal-Principal_Remaining_temp];	
        } else {
          Yearly_Capital= [...Yearly_Capital,Principal_Remaining[i-2]-Principal_Remaining[i-1]];	
        }
      }
      //Monthly cost after initial period  
      if (Interest_Then > 0 ){
        //array starts at 0 so capital due at the end of initial period is index at initial period -1
        Monthly_Cost_Then_temp1 = (Interest_Then/100/12*Principal_Remaining[Initial_Period-1]);
        Monthly_Cost_Then_temp2= Math.exp((((-1*(Mortgage_Term-Initial_Period))*12)*(Math.log((1+(Interest_Then/100/12))))));
        Monthly_Cost_Then = Monthly_Cost_Then_temp1/(1-Monthly_Cost_Then_temp2);
      } else {
        Monthly_Cost_Then = Principal_Remaining_temp/12/(Mortgage_Term-Initial_Period);	
      }
      //remainig capital until expiry, notice that the term is reduced since we start from the end of the initial period

      for (let i = 1; i <= Mortgage_Term-Initial_Period; i++) {
        if (Interest_Then > 0 ){
          Principal_Remaining_temp1= (12/(Interest_Then/100))*Monthly_Cost_Then;
          Principal_Remaining_temp2= ((Monthly_Cost_Then*12)/(Interest_Then/100))- Principal_Remaining[Initial_Period-1];
          Principal_Remaining_temp3 = Math.exp((i*12)*Math.log((1+(Interest_Then/100/12))));
          Principal_Remaining_temp = Principal_Remaining_temp1-(Principal_Remaining_temp2*Principal_Remaining_temp3);
        } else {
          Principal_Remaining_temp= Principal- (12*i*Monthly_Cost_Then);

        }
        Principal_Remaining_temp= Math.max(0,Principal_Remaining_temp);
        Principal_Remaining =[...Principal_Remaining,Principal_Remaining_temp];
        Yearly_Capital= [...Yearly_Capital,Principal_Remaining[i-2]-Principal_Remaining[i-1]];
      }		

    } else {
      //if no intial period
      for (let i = 1; i <= Mortgage_Term; i++) {
        if (Interest_Initial > 0 ){
          Principal_Remaining_temp1= (12/(Interest_Initial/100))*Monthly_Cost_Initial;
          Principal_Remaining_temp2= ((Monthly_Cost_Initial*12)/(Interest_Initial/100))- Principal;
          Principal_Remaining_temp3 = Math.exp((i*12)*Math.log((1+(Interest_Initial/100/12))));
          Principal_Remaining_temp = Principal_Remaining_temp1-(Principal_Remaining_temp2*Principal_Remaining_temp3);
        } else {
          Principal_Remaining_temp= Principal- (12*i*Monthly_Cost_Initial);
        }
        Principal_Remaining_temp= Math.max(0,Principal_Remaining_temp);
        Principal_Remaining =[...Principal_Remaining,Principal_Remaining_temp];
        if (i===1){
          Yearly_Capital= [...Yearly_Capital,Principal-Principal_Remaining_temp];	
        } else {
          Yearly_Capital= [...Yearly_Capital,Principal_Remaining[i-2]-Principal_Remaining[i-1]];	
        }

      }
    }
  }else if (Type === "Interest"){
    Monthly_Cost_Initial= Interest_Initial*0.01*(0.08+(0.01/3))*Principal;
    if (Initial_Period >0) {	
      Monthly_Cost_Then = Interest_Then*0.01*(0.08+(0.01/3))*Principal;
    }	
  }

  return { ...state,  Principal,Type, Initial_Period, Mortgage_Term, Interest_Initial, Interest_Then, Monthly_Cost_Initial, Monthly_Cost_Then, Principal_Remaining, Yearly_Interest,Yearly_Capital };
};
 
const chargesReducer = (state = InitialState.charges, action) => {
    // Coming soon...
      return state;
};
//  Bootstrapping
const reducer = combineReducers({
    finance: financeReducer,
    charges: chargesReducer,
});
const store = createStore(reducer);


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

export default class TabsExampleSwipeable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    console.log('props', this.props.Monthly_Cost_Initial);
    return (
      <MuiThemeProvider>
        <div>

          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
          >
            <Tab label="I plan to Buy a property" value={0} />
            <Tab label="I already own a property" value={1} />
          </Tabs>

          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >

          <div>
            <div>Hello{this.props.Monthly_Cost_Initial}</div>
            <MuiThemeProvider>
              <SliderExampleControlled/>
            </MuiThemeProvider>
          </div>

          <div style={styles.slide}>
            <NumericInput 
              min={0} max={1000000}
              value= '100000'
            /> 
          </div>

        </SwipeableViews>
      </div>
    </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const Monthly_Cost_Initial = state.finance.Monthly_Cost_Initial;
  return { Monthly_Cost_Initial: Monthly_Cost_Initial  }
}

const HelloWorld = connect(mapStateToProps)(TabsExampleSwipeable);

const rootEl = document.getElementById('root')
const render = () => ReactDOM.render(
  <Provider store={store}>
    <HelloWorld />
  </Provider>,
  rootEl
)

render()
store.subscribe(render)
