const InitialState = {
  finance: {
    Property: 300000,
    Deposit: 60000,
    Principal: 240000,
    Type: 'Capital',
    Initial_Period: 0,
    Mortgage_Term: 20,
    Interest_Initial: 1.94,
    Interest_Then: 3.5,
    Monthly_Cost_Initial: 0,
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
    },
  },
  charges: {},
  Consolidation: {},
}


export default InitialState
