import React from 'react'
import { connect } from 'react-redux'

import SliderExampleControlled from '../components/SliderExampleControlled'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import {Tabs, Tab} from 'material-ui/Tabs'
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views'


//not a consistent rendering see answers gmail? Do they need to go to the store?
import NumericInput from 'react-numeric-input'
//https://github.com/vlad-ignatov/react-numeric-input

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
class TabsExampleSwipeable extends React.Component {

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
              value='100000'
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

const Main = connect(mapStateToProps)(TabsExampleSwipeable);

export default Main
