import {combineReducers}  from 'redux'
import Actions from '../actions/actions'
import InitialState from '../constants/initial'

const financeReducer = (state = InitialState.finance, action) => {
let Property,Principal,Deposit,Type,Graph_Type, Initial_Period, Mortgage_Term, Interest_Initial, Interest_Then
Property= state.Property
Deposit= state.Deposit
Type= state.Type
Graph_Type= state.Graph_Type
Initial_Period= state.Initial_Period
Mortgage_Term= state.Mortgage_Term
Interest_Initial= state.Interest_Initial
Interest_Then= state.Interest_Then

switch (action.type) {
case Actions.PROPERTY_CHANGE:
Property = action.payload
break
case Actions.DEPOSIT_CHANGE:
Deposit = action.payload
break
case Actions.TYPE_CHANGE:
Type =  action.payload
break
case Actions.GRAPH_TYPE_CHANGE:
Graph_Type =  action.payload
break
case Actions.INITIAL_PERIOD_CHANGE:
Initial_Period =  action.payload
break
case Actions.MORTGAGE_TERM_CHANGE:
Mortgage_Term =  action.payload
break
case Actions.INTEREST_INITIAL_CHANGE:
Interest_Initial =  action.payload
break
case Actions.INTEREST_THEN_CHANGE:
Interest_Then =  action.payload
break
default:
}

if (typeof Interest_Initial === "string"){
Interest_Initial= Number(Interest_Initial.toString().slice(0, -1))
}

if (typeof Interest_Then === "string"){
Interest_Then= Number(Interest_Then.toString().slice(0, -1))
}

if (typeof Property === "string"){
Property= Number(Property.toString().slice(0, -1))
}

if (typeof Deposit === "string"){
Deposit= Number(Deposit.toString().slice(0, -1))
}


Deposit =Math.max(0,Math.min(Deposit,InitialState.finance.Static_Data.Max_Property))
Initial_Period= Math.max (0,Math.min(Initial_Period,Mortgage_Term))
Property=Math.max(InitialState.finance.Static_Data.Min_Property,Math.min(Property,InitialState.finance.Static_Data.Max_Property))
Interest_Initial= Math.max (0,Math.min(Interest_Initial,100))
Interest_Then= Math.max (0,Math.min(Interest_Then,100))
let Monthly_Cost_Initial_temp1,Monthly_Cost_Initial_temp2,Monthly_Cost_Then_temp1,Monthly_Cost_Then_temp2
let Monthly_Cost_Initial,Monthly_Cost_Then= 0;


let Principal_Remaining_temp, Principal_Remaining_temp1,Principal_Remaining_temp2, Principal_Remaining_temp3
let Principal_Remaining=[]
let Yearly_Interest=[]
let Yearly_Capital=[]

Principal= Math.max(0,Property-Deposit);
Principal_Remaining =[...Principal_Remaining,Principal]
if (Type === "Capital repayment"){ 
//removed this condition because the first part is always the same if Initial period or not following not needed //if (Type == "Capital" && Initial_Period ==0){
if (Interest_Initial > 0 ){
Monthly_Cost_Initial_temp1 = (Interest_Initial/100/12*Principal)
Monthly_Cost_Initial_temp2= Math.exp((((-1*Mortgage_Term)*12)*(Math.log((1+(Interest_Initial/100/12))))))
Monthly_Cost_Initial = Monthly_Cost_Initial_temp1/(1-Monthly_Cost_Initial_temp2)
} else {
Monthly_Cost_Initial = Principal/12/Mortgage_Term
}

if (Initial_Period >0) {
//remaining capital after each year during initial period
for (let i = 1; i <= Initial_Period*12; i++) {
if (Interest_Initial > 0 ){
Principal_Remaining_temp1= (12/(Interest_Initial/100))*Monthly_Cost_Initial
Principal_Remaining_temp2= ((Monthly_Cost_Initial*12)/(Interest_Initial/100))- Principal
Principal_Remaining_temp3 = Math.exp((i)*Math.log((1+(Interest_Initial/100/12))))
Principal_Remaining_temp = Principal_Remaining_temp1-(Principal_Remaining_temp2*Principal_Remaining_temp3)
} else {
Principal_Remaining_temp= Principal- (12*i*Monthly_Cost_Initial)
}

Principal_Remaining_temp= Math.max(0,Principal_Remaining_temp)
Principal_Remaining =[...Principal_Remaining,Principal_Remaining_temp]

}
//Monthly cost after initial period
if (Interest_Then > 0 ){
//array starts at 0 so capital due at the end of initial period is index at initial period -1
Monthly_Cost_Then_temp1 = (Interest_Then/100/12*Principal_Remaining[Initial_Period*12])
Monthly_Cost_Then_temp2= Math.exp((((-1*(Mortgage_Term-Initial_Period))*12)*(Math.log((1+(Interest_Then/100/12))))))
Monthly_Cost_Then = Monthly_Cost_Then_temp1/(1-Monthly_Cost_Then_temp2)
} else {
Monthly_Cost_Then = Principal_Remaining_temp/12/(Mortgage_Term-Initial_Period)
}
//remainig capital until expiry, notice that the term is reduced since we start from the end of the initial period

for (let i = 1; i <= (Mortgage_Term-Initial_Period)*12; i++) {
if (Interest_Then > 0 ){
Principal_Remaining_temp1= (12/(Interest_Then/100))*Monthly_Cost_Then
Principal_Remaining_temp2= ((Monthly_Cost_Then*12)/(Interest_Then/100))- Principal_Remaining[Initial_Period*12]
Principal_Remaining_temp3 = Math.exp((i)*Math.log((1+(Interest_Then/100/12))))
Principal_Remaining_temp = Principal_Remaining_temp1-(Principal_Remaining_temp2*Principal_Remaining_temp3)
} else {
Principal_Remaining_temp= Principal_Remaining[Initial_Period*12]- (i*Monthly_Cost_Then)

}
Principal_Remaining_temp= Math.max(0,Principal_Remaining_temp)
Principal_Remaining =[...Principal_Remaining,Principal_Remaining_temp]
}

} else {
//if no intial period
for (let i = 1; i <= Mortgage_Term*12; i++) {
if (Interest_Initial > 0 ){
Principal_Remaining_temp1= (12/(Interest_Initial/100))*Monthly_Cost_Initial
Principal_Remaining_temp2= ((Monthly_Cost_Initial*12)/(Interest_Initial/100))- Principal
Principal_Remaining_temp3 = Math.exp((i)*Math.log((1+(Interest_Initial/100/12))))
Principal_Remaining_temp = Principal_Remaining_temp1-(Principal_Remaining_temp2*Principal_Remaining_temp3)
} else {
Principal_Remaining_temp= Principal- (i*Monthly_Cost_Initial)
}
Principal_Remaining_temp= Math.max(0,Principal_Remaining_temp)
Principal_Remaining =[...Principal_Remaining,Principal_Remaining_temp]
}
}

let Yearly_Capital_Temp
Yearly_Capital= [...Yearly_Capital,0]
for (let i = 1; i <= Mortgage_Term*12; i++) {
Yearly_Capital_Temp= -1*(Principal_Remaining[i]-Principal_Remaining[i-1])
Yearly_Capital= [...Yearly_Capital,Yearly_Capital_Temp]
}

}else if (Type === "Interest only"){
Monthly_Cost_Initial= Interest_Initial*0.01*(0.08+(0.01/3))*Principal
if (Initial_Period >0) {
Monthly_Cost_Then = Interest_Then*0.01*(0.08+(0.01/3))*Principal
}
}

return { ...state,  Principal,Property, Deposit, Type, Graph_Type,Initial_Period, Mortgage_Term, Interest_Initial, Interest_Then, Monthly_Cost_Initial, Monthly_Cost_Then, Principal_Remaining, Yearly_Interest,Yearly_Capital }
}

const chargesReducer = (state = InitialState.charges, action) => {
// Coming soon...v2 will include charges and house price scenarios
return state
}
//  Bootstrapping
const reducer = combineReducers({
finance: financeReducer,
charges: chargesReducer,
})

export default reducer
