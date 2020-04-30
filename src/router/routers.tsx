import Loadable from 'react-loadable';

import dishMenuRoute from '../views/dish-menu/route';

const loading = ({ error, pastDelay }) => ({
    [error]: 'Error',
    [pastDelay]: 'Loading...',
}[error || pastDelay] || null);

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
    dishMenuRoute,
]