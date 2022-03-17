document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        const getData = (src) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', src);
                request.setRequestHeader('Content-type', 'application/json');
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        const response = JSON.parse(request.responseText);
                        resolve(response);
                    } else {
                        reject(request.statusText);
                    }
                });
                request.send();
            });
        };
        const get = (data) => {
            data.cars.forEach(item => {
                if (item.brand === select.value) {
                    const { brand, model, price } = item;
                    output.innerHTML = `Тачка ${brand} ${model} <br>
                    Цена: ${price}$`;
                }
            });
        };
        getData('./cars.json')
            .then(get)
            .catch(error => {
                output.innerHTML = 'Произошла ошибка';
                console.error(error);
            });
    });
});