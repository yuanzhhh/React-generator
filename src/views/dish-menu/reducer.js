import createReducer from '@/createReducer';
import update from 'immutability-helper';

const initState = {
    'dishNum': 0,
    'asd': 0,
}

const addDishNum = (state, { payload }) => update(state, {
    dishNum:{
        $set: payload,
    },
});

const addDishNums = (state, { payload }) => {
    return update(state, {
        asd:{
            $set: payload,
        },
    });
}

export default createReducer(initState, {
    ADD_DISH_NUM: addDishNum,
    ADD_DISH_NUMS: addDishNums,
});