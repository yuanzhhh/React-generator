const addDishNum = num => dispatch => dispatch({
    type: 'ADD_DISH_NUM',
    payload: num,
});

const asyncTestFun = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(500);
    }, 1000);
});

const getInitData = () => async dispatch => {
    const getData = await asyncTestFun();

    return dispatch({
        type: 'ADD_DISH_NUM',
        payload: getData,
    });
}

export default {
    addDishNum,
    getInitData,
};