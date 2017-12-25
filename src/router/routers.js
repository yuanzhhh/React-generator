import Loadable from 'react-loadable';

import dishMenuRoute from '../views/dish-menu/route';

const loading = props => {
    if (props.error) {
        return 'Error';
    } else if (props.pastDelay) {
        return 'Loading...';
    } else {
        return null;
    }
}

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