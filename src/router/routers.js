import Loadable from 'react-loadable';


const loading = props => {
    const { error } = props;

    return error ? 'Error' : 'Loading...';
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
    },
]