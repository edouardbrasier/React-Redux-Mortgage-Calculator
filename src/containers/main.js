import React from 'react'
import { connect } from 'react-redux'

import Slider_Connected from '../components/Slider_Connected'
import Numeric_Connected from '../components/Numeric_Connected'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

class Slider_Numeric_Connected extends React.Component {

  render() { return (
    <div>
    <Numeric_Connected/>
    <MuiThemeProvider>
    <Slider_Connected/>
    </MuiThemeProvider>
    <div>The monthly cost is {this.props.Monthly_Cost_Initial}</div>
    </div>
  ); } }

  function mapStateToProps(state) {
    const Monthly_Cost_Initial = state.finance.Monthly_Cost_Initial;
    return {
      Monthly_Cost_Initial: Monthly_Cost_Initial,
    }
  }

  const Main = connect(mapStateToProps)(Slider_Numeric_Connected);

  export default Main
