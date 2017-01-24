import { connect } from 'react-redux'
import { propertyChange,depositChange,Mortgage_TermChange, typeChange, Interest_InitialChange,Interest_ThenChange,Initial_PeriodChange} from '../actions/actions'
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
  }
}
function mapStateToProps(state) {
  const Min_Property = state.finance.Static_Data.Min_Property;
  const Max_Property = state.finance.Static_Data.Max_Property;
  const Step_Property = state.finance.Static_Data.Step_Property;
  const property = state.finance.Property;

  const Min_Deposit = 0;
  const Max_Deposit = state.finance.Property;
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

  const Max_Initial_Period= state.finance.Static_Data.Max_Initial_Period;
  const years = [];
  for (let i = Min_Mortgage_Term; i <=Max_Mortgage_Term; i++ ) {
    years.push(<MenuItem value={i} key={i} primaryText={`${i} years`} />);
  }
  const initialyears = [];
  initialyears.push(<MenuItem value={0} key={0} primaryText={'No Initial Period'} />);
  for (let i = 1; i <=Max_Initial_Period; i++ ) {
  initialyears.push(<MenuItem value={i} key={i} primaryText={`${i} years`} />);
  }

  return {
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
    Monthly_Cost_Initial: Monthly_Cost_Initial,
    Monthly_Cost_Then: Monthly_Cost_Then,
    Interest_Initial: Interest_Initial,
    Interest_Then: Interest_Then,
    Max_Initial_Period: Max_Initial_Period,
  }
}

const Main = connect(mapStateToProps,mapDispatchToProps)(App);

export default Main
