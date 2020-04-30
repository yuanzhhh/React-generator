const asyncTestFun = str => new Promise((resolve) => {
    setTimeout(() => {
        resolve(str);
    }, 16);
});

const getInitData = () => async dispatch => {
    const getData = await asyncTestFun('初始化成功');
 
    dispatch({
        type: 'ADD_DISH_NUM',
        payload: getData,
    });
}

const getTest = () => async dispatch => {
    const getData = await asyncTestFun('初始化成功');

    dispatch({
        type: 'ADD_DISH_NUM',
        payload: `${getData}two`,
    });
}

const getTest2 = () => dispatch => {
    dispatch({
        type: 'ADD_DISH_NUM',
        payload: 'Done!',
    });
}

export default {
    initList: [
        getInitData,
        getTest,
        getTest2,
    ],
    initType: 'sequential',
}
