const asyncTestFun = str => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(str);
    }, 20);
});

const getInitData = (y) => async dispatch => {
    const getData = await asyncTestFun('初始化成功');
    if (typeof y === 'function') {
        return y(dispatch);
    }
 
    dispatch({
        type: 'ADD_DISH_NUM',
        payload: getData,
    });
}

const getTest = (y) => async dispatch => {
    const getData = await asyncTestFun('初始化成功');
    if (typeof y === 'function') {
        return y(dispatch);
    }

    dispatch({
        type: 'ADD_DISH_NUM',
        payload: `${getData}two`,
    });
}

const getTest2 = (y) => dispatch => {
    if (typeof y === 'function') {
        return y(dispatch);
    }

    dispatch({
        type: 'ADD_DISH_NUM',
        payload: `three`,
    });
}

export default [
    getInitData,
    getTest,
    getTest2,
];