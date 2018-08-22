export const validation = (value, validation) => {
    let isValid = true;
    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (validation.number) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }
    if (validation.maxLength) {
        isValid = value.length <= validation.maxLength && isValid;
    }
    return isValid;
};