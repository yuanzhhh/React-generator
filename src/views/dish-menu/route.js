import Loadable from 'react-loadable';

import loading from '@/components/loadableLoading';
import dispatchToProps from './dispatchToProps';

export default {
    path: '/DishMenu',
    component: Loadable({
        loader: () => import('./'),
        loading,
    }),
    init: async store => {
        await store.dispatch(dispatchToProps.getInitData(599))
        
        await store.dispatch(dispatchToProps.getInitData(666))
    },
}