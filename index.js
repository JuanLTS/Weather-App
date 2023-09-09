const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.detalhes-do-tempo');
const e404 = document.querySelector('.nao-encontrado');

search.addEventListener('click', () =>{
    const APIkey = 'd4b91c24dabb12d7be8bc4f1887668cc';
    const cidade = document.querySelector('.search-box input').value;

    if (cidade === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

        if(json.cod === '404'){
            container.style.height = '650px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            e404.style.display = 'block';
            e404.classList.add('fadeIn');
            return;
        }

            e404.style.display = 'none';
            e404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperatura = document.querySelector('.weather-box .temperatura');
            const descricao = document.querySelector('.weather-box .descricao');
            const umidade = document.querySelector('.detalhes-do-tempo .umidade span');
            const vento = document.querySelector('.detalhes-do-tempo .vento span');

            switch (json.weather[0].main){
                case 'Clear':
                    image.src = 'imagens/Clear.jpg';
                    descricao.innerHTML = '<span>Ensolarado</span>'
                    break;
                
                case 'Rain':
                    image.src = 'imagens/Rain.jpg';
                    descricao.innerHTML = '<span>Chuvoso</span>'
                    break;
                
                case 'Snow':
                    image.src = 'imagens/Snow.jpg';
                    descricao.innerHTML = '<span>Neve</span>'
                    break;
                
                case 'Clouds':
                    image.src = 'imagens/Clouds.jpg';
                    descricao.innerHTML = '<span>Nublado</span>'
                    break;

                case 'Haze':
                    image.src = 'imagens/Haze.jpg';
                    descricao.innerHTML = '<span>Nebulento</span>'
                    break;
                
                default:
                    image.src = '';
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
            umidade.innerHTML = `${json.umidade}%`;
            vento.innerHTML = `${parseInt(json.vento)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
    });
});