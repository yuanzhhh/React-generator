import createReducer from '@/createReducer';
import update from 'immutability-helper';

const initState = {
    'dishNum': 0,
}

const addDishNum = (state, action) => {
    const newNum = state.dishNum + action.payload;

    return update(state, {
        dishNum:{
            $set: newNum,
        },
    });
}

export default createReducer(initState, {
    ADD_DISH_NUM: addDishNum,
});