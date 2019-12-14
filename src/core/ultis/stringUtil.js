export const valueOrEmpty = (value) => {
    return value !== undefined || value === null ? value : '';
};