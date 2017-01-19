import { connect } from 'react-redux'
import { principalChange } from '../actions/actions'
//import Slider_Input_Results from '../components/Slider_Input_Results'
import App from '../components/App'
import { bindActionCreators } from 'redux'

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
  const Monthly_Cost_Initial = state.finance.Monthly_Cost_Initial;
  return {
    Principal: principal,
    Min_Principal: Min_Principal,
    Max_Principal: Max_Principal,
    Step_Principal: Step_Principal,
    Monthly_Cost_Initial: Monthly_Cost_Initial,
  }
}

const Main = connect(mapStateToProps,mapDispatchToProps)(App);

export default Main
