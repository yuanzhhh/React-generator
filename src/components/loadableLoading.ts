export default ({ error, pastDelay }) => ({
    [error]: 'Error',
    [pastDelay]: 'Loading...',
}[error || pastDelay] || null);