export default (initDidMountList, dispatchToProps = {}) => initDidMountList.reduce((initDidMoutObj, item) => {
    initDidMoutObj[item.name] = item;

    return initDidMoutObj;
}, dispatchToProps)