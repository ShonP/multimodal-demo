export const isValidHttpUrl = (url: string) => {
    let newURL;
    try {
        newURL = new URL(url);
    } catch (_) {
        return false;
    }

    return newURL.protocol === 'http:' || newURL.protocol === 'https:';
};
