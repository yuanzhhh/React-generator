export default props => {
    if (props.error) {
        return 'Error';
    } else if (props.pastDelay) {
        return 'Loading...';
    } else {
        return null;
    }
}