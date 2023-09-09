import './style.css';

const selectNameHeroes = document.querySelector('#nameHeroes');
const btnButton = document.querySelector('#btnRandom');
const showHeroes = document.querySelector('#showHeroes');
const imgHeroe = document.querySelector('#imgHeroe');
const imgHeroe2 = document.querySelector('#imgHeroe2');
const nameHeroe = document.querySelector('#nameHeroe');



// Buscando todos os nomes dos heróis na API
const URL_API = 'https://akabab.github.io/superhero-api/api/all.json';
fetch(URL_API)
  .then((response) => response.json())
  .then((data) => {
    setNameHeroes(data);
});

// Incluindo os nomes no selecionador
const setNameHeroes = (data) => {
  data.forEach(element => {
    const option = document.createElement('option');
    option.innerText = element.name
    selectNameHeroes.appendChild(option);
  });
}

// Procurar um herói através do selecionador de nome
selectNameHeroes.addEventListener('change', () => {
  fetch(URL_API)
    .then((response) => response.json())
    .then((data) => {
      showHeroes.style.display = 'block'
      const nameSelect = selectNameHeroes.value;
      const imgFound = data.find(({ name }) => name === nameSelect).images.md;
      const nameFound = data.find(({ name }) => name === nameSelect).name;
      nameHeroe.innerHTML = nameFound;
      imgHeroe.src = imgFound;
   })
   .catch(() => 
   Swal.fire({
     icon: 'error',
     title: 'Oops 2...',
     text: 'Não conseguimos encontrar o heroi pesquisado. Pesquise outro nome por favor!',
     // footer: '<a href="">Why do I have this issue?</a>'
     footer: ''
 }));
});

// Criando o evento do botão que sorteia o herói para apresentar
btnButton.addEventListener('click', () => {
  const id = parseInt(Math.random() * 563);

  fetch(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`)
    .then((response) => response.json())
    .then((data) => {
      showHeroes.style.display = 'block'
      imgHeroe.src = data.images.md;
      nameHeroe.innerHTML = data.name;
    })
    .catch(() => 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Não conseguimos encontrar o heroi pesquisado. Sorteie outro por favor!',
        // footer: '<a href="">Why do I have this issue?</a>'
        footer: ''
    }));
});

window.onload = () => {
  showHeroes.style.display = 'none';
}