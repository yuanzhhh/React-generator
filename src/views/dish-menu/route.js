import Loadable from 'react-loadable';

import loading from '@/components/loadableLoading';
import dispatchToProps from './dispatchToProps';

const DishMenu = Loadable({
    loader: () => import('./'),
    loading,
});

export default {
    path: '/DishMenu',
    component: DishMenu,
    init: async store => {
        await store.dispatch(dispatchToProps.getInitData('你好'));
    },
}