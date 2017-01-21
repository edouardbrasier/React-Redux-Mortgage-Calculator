import { connect } from 'react-redux'
import { propertyChange,depositChange } from '../actions/actions'
import App from '../components/App'
import { bindActionCreators } from 'redux'
function mapDispatchToProps(dispatch) {
  return {
    propertyChangeAction: bindActionCreators(propertyChange, dispatch),
    depositChangeAction: bindActionCreators(depositChange, dispatch),
  }
}
function mapStateToProps(state) {
  const Min_Property = state.finance.Static_Data.Min_Property;
  const Max_Property = state.finance.Static_Data.Max_Property;
  const Step_Property = state.finance.Static_Data.Step_Property;
  const property = state.finance.Property;

  const Min_Deposit = 0;
  const Max_Deposit = state.finance.Static_Data.Max_Property;
  const Step_Deposit = state.finance.Static_Data.Step_Property/5;
  const deposit = state.finance.Deposit;

  const Monthly_Cost_Initial = state.finance.Monthly_Cost_Initial;
  return {
    Property: property,
    Deposit: deposit,
    Min_Property: Min_Property,
    Max_Property: Max_Property,
    Step_Property: Step_Property,

    Min_Deposit: Min_Deposit,
    Max_Deposit: Max_Deposit,
    Step_Deposit: Step_Deposit,
    Monthly_Cost_Initial: Monthly_Cost_Initial,
  }
}

const Main = connect(mapStateToProps,mapDispatchToProps)(App);

export default Main
// import { connect } from 'react-redux'
// import { propertyChange, depositChange} from '../actions/actions'
// //import Slider_Input_Results from '../components/Slider_Input_Results'
// import App from '../components/App'
// import { bindActionCreators } from 'redux'
//
// function mapDispatchToProps(dispatch) {
//   return {
//     depositChangeAction: bindActionCreators(depositChange, dispatch),
//     propertyChangeAction: bindActionCreators(propertyChange, dispatch),
//   }
//
//
//   function mapStateToProps(state) {
//     const Min_Property = state.finance.Static_Data.Min_Property;
//     const Max_Property = state.finance.Static_Data.Max_Property;
//     const Step_Property = state.finance.Static_Data.Step_Property;
//     const property  = state.finance.Property;
//
//     const Min_Deposit = 0;
//     const Max_Deposit = state.finance.Static_Data.Max_Principal;
//     const Step_Deposit= state.finance.Static_Data.Step_Principal/10;
//     const deposit = state.finance.Deposit;
//
//
//     const Monthly_Cost_Initial = state.finance.Monthly_Cost_Initial;
//     return {
//       Property: Property,
//       Deposit: deposit,
//       Min_Property: Min_Property,
//       Max_Property: Max_Property,
//       Step_Property: Step_Property,
//       Min_Deposit: Min_Deposit,
//       Max_Deposit: Max_Deposit,
//       Step_Deposit: Step_Deposit,
//       Monthly_Cost_Initial: Monthly_Cost_Initial,
//     }
//   }
//
//   const Main = connect(mapStateToProps,mapDispatchToProps)(App);
//
//   export default Main
