const postData = async (url, data) => { //общая функция для настройки POST-запросов на сервер
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json(); //это Promise, который при успехе декодирует ответ от сервера в формат JS
};


const getResource = async (url) => { //общая функция для настройки GET-запросов с сервера
    const result = await fetch(url); //get-запрос

    if(!result.ok) { //если запрос выдал ошибку 404 и т.п.
        throw new Error(`Could not get resources from ${url}, status: ${result.status}`);
    }

    return await result.json(); //это Promise, который при успехе декодирует ответ от сервера в формат JS
};

export {postData, getResource};