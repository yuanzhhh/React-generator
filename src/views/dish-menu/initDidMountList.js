const asyncTestFun = str => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(str);
    }, 16);
});

const getInitData = (y) => async dispatch => {
    const getData = await asyncTestFun('初始化成功');
 
    dispatch({
        type: 'ADD_DISH_NUM',
        payload: getData,
    });
}

const getTest = (y) => async dispatch => {
    const getData = await asyncTestFun('初始化成功');

    dispatch({
        type: 'ADD_DISH_NUM',
        payload: `${getData}two`,
    });
}

const getTest2 = (y) => dispatch => {
    dispatch({
        type: 'ADD_DISH_NUM',
        payload: 'Done!',
    });
}

export default {
    action:[
        getInitData,
        getTest,
        getTest2,
    ],
    initType: 'sequential',
}