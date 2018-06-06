const addDishNum = dispatch => {
    console.log('@@@');

    if (typeof dispatch === 'function') {
        dispatch({
            type: 'ADD_DISH_NUMs',
            payload: 'asdww',
        });
    } else {
        return {
            type: 'ADD_DISH_NUMs',
            payload: 'asdww',
        };
    }
};

const asyncTestFun = str => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(str);
    }, 20);
});

const bs = async (dispatch) => {
    
    const getData = await asyncTestFun('嗷嗷');
    
    dispatch({
        type: 'ADD_DISH_NUM',
        payload: getData,
    });

    if (typeof next === 'function') {
        next(dispatch);
    }
}

const getInitData = next => {
    console.log(next, '####');
    

    if (typeof next === 'function') {
        next(bs);
    } else {
        return bs;
    }
};

export default [
    getInitData,
    addDishNum,
];