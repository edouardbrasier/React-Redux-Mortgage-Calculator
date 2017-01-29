import { connect } from 'react-redux'
import { propertyChange,depositChange,Mortgage_TermChange, typeChange, Interest_InitialChange,Interest_ThenChange,Initial_PeriodChange,graphtypeChange} from '../actions/actions'
import App from '../components/App'
import { bindActionCreators } from 'redux'

import React from 'react'
import MenuItem from 'material-ui/MenuItem'

function mapDispatchToProps(dispatch) {
  return {
    propertyChangeAction: bindActionCreators(propertyChange, dispatch),
    depositChangeAction: bindActionCreators(depositChange, dispatch),
    Mortgage_TermChangeAction: bindActionCreators(Mortgage_TermChange, dispatch),
    typeChangeAction: bindActionCreators(typeChange, dispatch),
    Interest_ThenChangeAction: bindActionCreators(Interest_ThenChange, dispatch),
    Interest_InitialChangeAction: bindActionCreators(Interest_InitialChange, dispatch),
    Initial_PeriodChangeAction: bindActionCreators(Initial_PeriodChange, dispatch),
    graphtypeChangeAction: bindActionCreators(graphtypeChange, dispatch),
  }
}
function mapStateToProps(state) {
  const Min_Property = state.finance.Static_Data.Min_Property;
  const Max_Property = state.finance.Static_Data.Max_Property;
  const Step_Property = state.finance.Static_Data.Step_Property;

  const property = state.finance.Property;
  const Principal= state.finance.Principal;
  const Min_Deposit = 0;

  const Max_Deposit=state.finance.Static_Data.Max_Property
  const Step_Deposit = state.finance.Static_Data.Step_Property/5;
  const deposit = state.finance.Deposit;

  const Max_Mortgage_Term = state.finance.Static_Data.Max_Mortgage_Term;
  const Min_Mortgage_Term = state.finance.Static_Data.Min_Mortgage_Term;
  const Mortgage_Term = state.finance.Mortgage_Term;
  const Monthly_Cost_Initial = state.finance.Monthly_Cost_Initial;
  const Type= state.finance.Type;
  const Interest_Initial= state.finance.Interest_Initial;
  const Initial_Period= state.finance.Initial_Period;
  const Interest_Then= state.finance.Interest_Then;
  const Monthly_Cost_Then=  state.finance.Monthly_Cost_Then;
  const Yearly_Capital=  state.finance.Yearly_Capital;
  const Principal_Remaining=  state.finance.Principal_Remaining;
  const Max_Initial_Period= state.finance.Static_Data.Max_Initial_Period;
  const Graph_Type= state.finance.Graph_Type;
  const years = [];
  for (let i = Min_Mortgage_Term; i <=Max_Mortgage_Term; i++ ) {
    years.push(<MenuItem value={i} key={i} primaryText={`${i} years`} />);
  }
  const initialyears = [];
  initialyears.push(<MenuItem value={0} key={0} primaryText={'No Initial Period'} />);
  for (let i = 1; i <=Max_Initial_Period; i++ ) {
    initialyears.push(<MenuItem value={i} key={i} primaryText={`${i} years`} />);
  }

  let moduloo;
  let start;
  let msgtext;
  let val= [];


//if the chart shows the remaining capital then we want it to start at 0 to start with the full ammount
//however if we want to show the monthly equity gain then we don't want to show 0 for year 0
//the modulo is to show years instead of month in the x axis
  if  (state.finance.Graph_Type === 'Remaining Capital'){
    start=0;
    msgtext= 'Remaining Mortgage Balance'
    val =  Principal_Remaining;
  } else {  //Monthly Equity Gain
    start=1;
    msgtext= 'Portion Of Monthly Cost Capitalized'
    val=  Yearly_Capital;
  }
  const chart = { msg: msgtext, osX: [], osY: [] };

  for (let i = start; i <= (Mortgage_Term*12); i++ ) {
    moduloo=i % 12
    if ( moduloo=== 0 ){
      chart.osX[i] = i/12;
    }
    chart.osY[i] = val[i];
  }

  return {
    Principal: Principal,
    Property: property,
    Deposit: deposit,
    Min_Property: Min_Property,
    Max_Property: Max_Property,
    Step_Property: Step_Property,
    Min_Deposit: Min_Deposit,
    Max_Deposit: Max_Deposit,
    Step_Deposit: Step_Deposit,
    years:years,
    initialyears:initialyears,
    Initial_Period:Initial_Period,
    Mortgage_Term:Mortgage_Term,
    Type:Type,
    Graph_Type:Graph_Type,
    Monthly_Cost_Initial: Monthly_Cost_Initial,
    Monthly_Cost_Then: Monthly_Cost_Then,
    Interest_Initial: Interest_Initial,
    Interest_Then: Interest_Then,
    Max_Initial_Period: Max_Initial_Period,
    Yearly_Capital: Yearly_Capital,
    Principal_Remaining: Principal_Remaining,
    chart:  chart
  }
}

const Main = connect(mapStateToProps,mapDispatchToProps)(App);

export default Main
