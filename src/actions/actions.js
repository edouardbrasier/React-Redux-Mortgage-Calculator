export const Actions = {
  PROPERTY_CHANGE: 'PROPERTY_CHANGE',
  DEPOSIT_CHANGE: 'DEPOSIT_CHANGE',
  TYPE_CHANGE: 'TYPE_CHANGE',
  GRAPH_TYPE_CHANGE: 'GRAPH_TYPE_CHANGE',
  INITIAL_PERIOD_CHANGE: 'INITIAL_PERIOD_CHANGE',
  MORTGAGE_TERM_CHANGE: 'MORTGAGE_TERM_CHANGE',
  INTEREST_INITIAL_CHANGE: 'INTEREST_INITIAL_CHANGE',
  INTEREST_THEN_CHANGE: 'INTEREST_THEN_CHANGE',
};

export function propertyChange(payload) {
  return {
    type: 'PROPERTY_CHANGE',
    payload
  }
}

export function depositChange(payload) {
  return {
    type: 'DEPOSIT_CHANGE',
    payload
  }
}

export function Mortgage_TermChange(payload) {
  return {
    type: 'MORTGAGE_TERM_CHANGE',
    payload
  }
}

export function typeChange(payload) {
  return {
    type: 'TYPE_CHANGE',
    payload
  }
}

export function graphtypeChange(payload) {
  return {
    type: 'GRAPH_TYPE_CHANGE',
    payload
  }
}

export function Interest_InitialChange(payload) {
  return {
    type: 'INTEREST_INITIAL_CHANGE',
    payload
  }
}

export function Interest_ThenChange(payload) {
  return {
    type: 'INTEREST_THEN_CHANGE',
    payload
  }
}

export function Initial_PeriodChange(payload) {
  return {
    type: 'INITIAL_PERIOD_CHANGE',
    payload
  }
}

export default Actions
