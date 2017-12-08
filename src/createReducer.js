
export default (initState, operation) => (state = initState, action = {}) => {
    const actionFun = operation[action.type];

    if (typeof actionFun === 'function') {
        return actionFun(state, action);
    }

    return state;
}