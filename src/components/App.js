import React,{Component} from 'react'
import Slider from 'material-ui/Slider'
import NumericInput from 'react-numeric-input'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

export default class App extends Component {

  handleFirstSlider = (event, value) => {
    this.props.principalChangeAction(value);
  };

  handleInput = (event, value) => {
    this.props.principalChangeAction(value);
    this.setState({input: value});
  };

//is a render need here???
  render() {
    return (
      <div>
      <p>
      <span>{'The property price: '}</span>
      <span>{this.props.Principal}</span>
      </p>
      <NumericInput
      min={this.props.Min_Principal}
      max={this.props.Max_Principal}
      step={this.props.Step_Principal}
      value={this.props.Principal}
      onChange={this.handleInput}
      />
      <MuiThemeProvider>
      <Slider
      min={this.props.Min_Principal}
      max={this.props.Max_Principal}
      step={this.props.Step_Principal}
      value={this.props.Principal}
      onChange={this.handleFirstSlider}
      />
      </MuiThemeProvider>
      <div>The monthly cost is {this.props.Monthly_Cost_Initial}
      </div>
      </div>
    );
  }
}

//attemps to have only one render function
// const App = (props) =>
//       <div>
//       <p>
//       <span>{'The property price: '}</span>
//       <span>{this.props.Principal}</span>
//       </p>
//       <NumericInput
//       min={this.props.Min_Principal}
//       max={this.props.Max_Principal}
//       step={this.props.Step_Principal}
//       value={this.props.Principal}
//       onChange={this.handleInput}
//       />
//       <MuiThemeProvider>
//       <Slider
//       min={this.props.Min_Principal}
//       max={this.props.Max_Principal}
//       step={this.props.Step_Principal}
//       value={this.props.Principal}
//       onChange={this.handleFirstSlider}
//       />
//       </MuiThemeProvider>
//       <div>The monthly cost is {this.props.Monthly_Cost_Initial}
//       </div>
//       </div>
//
//
//  export default App