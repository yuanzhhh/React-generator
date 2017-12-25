import dispatchToProps from './dispatchToProps';

export default async store => {
    await store.dispatch(dispatchToProps.getInitData(599))
    
    await store.dispatch(dispatchToProps.getInitData(666))
}