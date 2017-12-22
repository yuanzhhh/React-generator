import createReducer from '@/createReducer';
import update from 'immutability-helper';

const initState = {
    'dishNum': 0,
}

const addDishNum = (state, action) => update(state, {
    dishNum:{
        $set: action.payload,
    },
});

export default createReducer(initState, {
    ADD_DISH_NUM: addDishNum,
});