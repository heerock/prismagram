export const isAuthenticated = (reqest) => {
    if(!reqest.user) {
        throw Error('You need to log in to perform this action');
    }
    return;
}