const addDishNum = () => dispatch => dispatch({
    type: 'ADD_DISH_NUMS',
    payload: 'asdww',
});

const asyncTestFun = str => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(str);
    }, 20);
});

const getInitData = () => async dispatch => {
    const getData = await asyncTestFun('初始化成功');
    
    dispatch({
        type: 'ADD_DISH_NUM',
        payload: getData,
    });
}

export default [
    getInitData,
    addDishNum,
];