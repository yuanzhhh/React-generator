import Loadable from 'react-loadable';
import { compose } from 'redux';

import loading from '@/components/loadableLoading';
import initDid from './initDidMountList';

const DishMenu = Loadable({
    loader: () => import('./'),
    loading,
});

export default {
    path: '/DishMenu',
    component: DishMenu,
    init: compose(...initDid),
}