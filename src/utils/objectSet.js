var bbs = null;
var bsas = null;
var data = {
    a: {
        b: {

        }
    }
};
Object.prototype.toString.call('a.b.c.d.e') === '[object Array]' ? [] : 'a.b.c.d.e'.split('.').reduce((obj, key) => {

     if (Object.keys(obj).length === 0) {
         // 不断往下建立引用地址
         bbs = obj;

         bbs[key] = {};
         
         return bbs[key];
     }

     bbs = obj;

     if (!bbs[key]) {
        bbs[key] = {}
     }

     bsas = bbs;
     
     return bbs[key];
 }, data);
 console.log(JSON.stringify(bsas), '@@@@');