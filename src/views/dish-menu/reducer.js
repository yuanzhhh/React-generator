import createReducer from '@/createReducer';
import update from 'immutability-helper';

const initState = {
    'dishNum': 0,
}

const addDishNum = (state, { payload }) => update(state, {
    dishNum:{
        $set: payload,
    },
});

export default createReducer(initState, {
    ADD_DISH_NUM: addDishNum,
});