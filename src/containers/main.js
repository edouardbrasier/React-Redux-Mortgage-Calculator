import React from 'react'
import { connect } from 'react-redux'

import SliderExampleControlled from '../components/SliderExampleControlled'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

//import {Tabs, Tab} from 'material-ui/Tabs'
// From https://github.com/oliviertassinari/react-swipeable-views
//import SwipeableViews from 'react-swipeable-views'

//not a consistent rendering see answers gmail? Do they need to go to the store?
import NumericInput from 'react-numeric-input'
//https://github.com/vlad-ignatov/react-numeric-input

class TabsExampleSwipeable extends React.Component {

render() { return (
<MuiThemeProvider>
  <div>
  <div>The monthly cost is {this.props.Monthly_Cost_Initial}</div>
  <div>The property price is {this.props.Principal}</div>
 <div>This is what I want to pass as the minimum value of the slider {this.props.Min_Principal}</div>
  <MuiThemeProvider>
  <SliderExampleControlled

  />
  </MuiThemeProvider>

  <NumericInput
  min={0} max={1000000}
  value={this.props.Principal}
  />

  </div>
</MuiThemeProvider>
); } }

function mapStateToProps(state) {
  const Monthly_Cost_Initial = state.finance.Monthly_Cost_Initial;
    const principal = state.finance.Principal;
    const Min_Principal = state.Static_Data.Min_Principal;
  return {
    Monthly_Cost_Initial: Monthly_Cost_Initial,
    Principal: principal,
    Min_Principal: Min_Principal
  }
}

const Main = connect(mapStateToProps)(TabsExampleSwipeable);

export default Main
