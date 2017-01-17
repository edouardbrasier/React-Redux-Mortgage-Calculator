//  Actions
export const Actions = {
  PRINCIPAL_CHANGE: 'PRINCIPAL_CHANGE',
  TYPE_CHANGE: 'TYPE_CHANGE',
  INITIAL_PERIOD_CHANGE: 'INITIAL_PERIOD_CHANGE',
  MORTGAGE_TERM_CHANGE: 'MORTGAGE_TERM_CHANGE',
  INTEREST_INITIAL_CHANGE: 'INTEREST_INITIAL_CHANGE',
  INTEREST_THEN_CHANGE: 'INTEREST_THEN_CHANGE',
};


export function principalChange(payload) {
  return {
    type: 'PRINCIPAL_CHANGE',
    payload
  }
}

//  Action Creators
//const principal_change = createAction(Actions.PRINCIPAL_CHANGE);
// const type_change = createAction(Actions.TYPE_CHANGE);
// const inital_period_change = createAction(Actions.INITIAL_PERIOD_CHANGE);
// const mortgage_term_change = createAction(Actions.MORTGAGE_TERM_CHANGE);
// const interest_initial_change = createAction(Actions.INTEREST_INITIAL_CHANGE);
// const interest_then_change = createAction(Actions.INTEREST_THEN_CHANGE);

export default Actions
