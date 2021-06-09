export const required = value => {
    if (value) return undefined;
    return 'Field is required';
};

 // типа thunkCreator принимает извне maxLength затем его сравнивает с поступившим value и сравнивает
export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
};
