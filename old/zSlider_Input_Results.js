import React from 'react'

import Slider_Input from '../components/Slider_Input'
import Results from '../components/Results'

class Slider_Input_Results extends React.Component {

//not sure I need render
render() { return (
  <div>
  <Results/>
  <Slider_Input/>
  </div>
); } }

export default Slider_Input_Results
