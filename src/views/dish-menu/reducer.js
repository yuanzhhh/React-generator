import createReducer from '@/createReducer';

const initState = {
    'dishNum': 0,
}

const addDishNum = (state, action) => {
    const newNum = state.dishNum + action.data;
    state.dishNum = newNum;
    return state;
}

export default createReducer(initState, {
    ADD_DISH_NUM: addDishNum,
});