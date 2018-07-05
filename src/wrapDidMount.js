export default (initActionList, type) => (target, key, descriptor) => {
    if (key !== 'componentDidMount') {
        throw new Error('warpDidMout key is not componenDidMount');
    }

    async function sequential () {
        for (let i = 0; i < initActionList.length; i++) {
            await this.props[initActionList[i].name]();
        }
    }
    
    async function parallel () {
        const action = initActionList.map((item, index) => this.props[item.name]());
    
        await Promise.all(action);
    }

    const oldValue = descriptor.value;

    descriptor.value = async function (...args) {
        if (type === 'sequential') {
            await sequential.call(this);
        } else if (type === 'parallel' || !type) {
            await parallel.call(this);
        }
        
        oldValue.call(this, ...args);
    }

    return descriptor;
}


