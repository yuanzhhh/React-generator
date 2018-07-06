import Loadable from 'react-loadable';


import loading from '@/components/loadableLoading';
import initDid from './initDidMountList';

const DishMenu = Loadable({
    loader: () => import('./'),
    loading,
});

export default {
    path: '/DishMenu',
    component: DishMenu,
    initType: 'sequential',
    init: initDid,
}