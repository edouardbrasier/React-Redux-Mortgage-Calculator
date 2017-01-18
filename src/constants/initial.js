const InitialState = {
  finance: {
    Principal: 300000,
    Type: 'Capital',
    Initial_Period: 0,
    Mortgage_Term: 20,
    Interest_Initial: 8,
    Interest_Then: 8,
    Monthly_Cost_Initial: 0,
    Monthly_Cost_Then: 0,
    Principal_Remaining: [],
    Yearly_Interest: [],
    Yearly_Capital: [],
    Static_Data: {
      Max_Principal: 10000000,
      Min_Principal: 10000,
      Step_Principal: 10000,
      Max_Mortgage_Term: 50,
      Min_Mortgage_Term: 2,
    },
  },
  charges: {},
  Consolidation: {},
}


export default InitialState
