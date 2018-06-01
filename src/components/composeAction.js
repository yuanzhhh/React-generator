export default (initDidMountList, dispatchToProps = {}) => {
    return initDidMountList.reduce((initDidMoutObj, item) => {
        initDidMoutObj[item.name] = item;
    
        return initDidMoutObj;
    }, dispatchToProps)
}