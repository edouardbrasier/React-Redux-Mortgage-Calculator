const InitialState = {
  finance: {
    Property: '600000£',
    Deposit: '120000£',
    Principal: 240000,
    Type: 'Capital repayment',
    Graph_Type: 'Monthly Equity Gain',
    Initial_Period: 5,
    Mortgage_Term: 25,
    Interest_Initial: '1.94%',
    Interest_Then: '3.68%',
    Monthly_Cost_Initial: 5,
    Monthly_Cost_Then: 0,
    Principal_Remaining: [],
    Yearly_Interest: [],
    Yearly_Capital: [],
    Static_Data: {
      Max_Property: 2000000,
      Min_Property: 10000,
      Step_Property: 10000,
      Max_Mortgage_Term: 50,
      Min_Mortgage_Term: 2,
      Max_Initial_Period: 10,
    },
  },
  charges: {},
  Consolidation: {},
}


export default InitialState
