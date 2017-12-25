const addDishNum = num => dispatch => dispatch({
    type: 'ADD_DISH_NUM',
    payload: num,
});

const asyncTestFun = num => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(num);
    }, 0);
});

const getInitData = num => async dispatch => {
    const getData = await asyncTestFun(num);

    return dispatch({
        type: 'ADD_DISH_NUM',
        payload: getData,
    });
}

export default {
    addDishNum,
    getInitData,
};