import Loadable from 'react-loadable';

import loading from '@/components/loadableLoading';
import initDid from './initDidMountList';

function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }

    return funcs.reduce((a, b) => {
        return (...args) => {
            return a( b(...args) );
        };
    })
  }
  

const DishMenu = Loadable({
    loader: () => import('./'),
    loading,
});

export default {
    path: '/DishMenu',
    component: DishMenu,
    init: compose(...initDid),
}