/**
 *
 * objData 数据对象
 * path 路径
 * value 值
 */
module.exports = (objData, path, value) => {
    const cloneObjData = Object.assign({}, objData);

    Object.prototype.toString.call(path) === '[object Array]' ? path : path.split('.').reduce((obj, key, index, arrayList) => {
        if (index === arrayList.length - 1) {
            obj[key] = value;

            return;
        }

        if (obj[key] === undefined || !Object.keys(obj).length) {
            obj[key] = {}
        }

        return obj[key];
    }, cloneObjData);

    return cloneObjData;
}
