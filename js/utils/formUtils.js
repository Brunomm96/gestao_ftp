const acceptNumbersOnly = (e) => {
    let valid = true;
    const { which, keyCode } = e;

    const ASCIICode = which || keyCode;

    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        valid = false;

    return valid;
}

export { acceptNumbersOnly };