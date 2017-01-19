
import React from 'react'
// const Results  = () => (
//   //<div>The monthly cost is not connected yet</div>
// <div>The monthly cost is {this.props.Monthly_Cost_Initial}</div>
// )

//export default Results

class Results extends React.Component {

render() { return (
<div>The monthly cost is {this.props.Monthly_Cost_Initial}</div>
); } }

export default Results
