const addDishNum = next => {
    console.log(next, '!!!');
    return (dispatch) => {
        
        dispatch({
            type: 'ADD_DISH_NUMs',
            payload: 'asdww',
        });

        if (typeof next === 'function') {
            next(dispatch);
        }
    }
};

const asyncTestFun = str => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(str);
    }, 20);
});

const getInitData = next => async (dispatch) => {
    console.log(next, '####');
    const getData = await asyncTestFun('嗷嗷');
    
    dispatch({
        type: 'ADD_DISH_NUM',
        payload: getData,
    });

    if (typeof next === 'function') {
        next(dispatch);
    }
};

export default [
    getInitData,
    addDishNum,
];