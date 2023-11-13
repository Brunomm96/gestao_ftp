const getSav = (id) => {
    const url = `${server}/v1/protheus/getSAV/${id}`;

    return new Promise((res, rej) => {
        $.ajax({
            type: 'GET',
            url,
            headers: {
                Authorization: `Bearer ${$token}`,
            },
            success: (data) => res(data),
            error: ({ _, status }) => rej(status)
        });
    })
}

export { getSav }