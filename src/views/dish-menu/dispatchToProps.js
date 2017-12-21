const addDishNum = num => dispatch => dispatch({
    type: 'ADD_DISH_NUM',
    payload: num,
});


const add = num => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(num);
    }, 1000);
});

const addAction = num => async dispatch => {
    const nums = await add(num);

    return dispatch({
        type: 'ADD_DISH_NUM',
        payload: nums,
    });
}

const addDistNumAsync = num => addAction(num);

export default {
    addDishNum,
    addDistNumAsync,
};