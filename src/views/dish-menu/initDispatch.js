import { getInitData } from './dispatchToProps';

export default store => {
    store.dispatch(getInitData());
}