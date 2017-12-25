import Loadable from 'react-loadable';

import dishMenuInit from '../views/dish-menu/initDispatch';

const loading = props => {
    if (props.error) {
        return 'Error';
    } else if (props.pastDelay) {
        return 'Loading...';
    } else {
        return null;
    }
}

const LoadDishMenu = Loadable({
    loader: () => import('../views/dish-menu'),
    loading,
});

const Test = Loadable({
    loader: () => import('../components/test'),
    loading,
});


export default [
    {
        path: '/',
        exact: true,
        component: Test,
    },
    {
        path: '/DishMenu',
        component: LoadDishMenu,
        init: dishMenuInit,
    },
]