module.exports = (initType = 'parallel', ...funcs) => async dispatch => {
    if (initType !== 'sequential' && initType !== 'parallel') {
        throw new Error('initType is not sequential or parallel');
    }

    const unpackList = funcs.map(fun => fun());

    async function parallel() {
        const result = unpackList.map(fun => fun(dispatch));

        await Promise.all(result);
    }

    async function sequential() {
        for (const fun of unpackList) {
            await fun(dispatch);
        }
    }

    await {
        parallel,
        sequential,
    }[initType]();
}