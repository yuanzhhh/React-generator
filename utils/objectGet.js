
/**
 * object 原始对象
 * path 查询路径
 * defaultValue 查询失败返回默认
 */
export default (object, path, defaultValue) => Array.isArray(path) ? path : path.split('.').reduce((obj, key) => (obj || {})[key] || defaultValue, object);