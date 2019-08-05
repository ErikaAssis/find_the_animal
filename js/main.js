function iniciaJogo() {
    let divElement = document.querySelector('#app');
    let containerElement = document.querySelector('.container');
    let infoElement = document.createElement('h2');

    let audioElement = setAudio('/music/music.mp3', true);
    let procurarAnimalElement = insereProcurarAnimal();
    
    divElement.appendChild(audioElement);    
    divElement.appendChild(procurarAnimalElement); 

    visibilidadeComponentes(divElement, containerElement, 'block', 'none');
    preenchePontuacao(infoElement, divElement);
   
    procurarAnimalElement.addEventListener('click',  () => {
        procurarAnimalElement.style.display = 'none'; //tira o quadradinho preto
        finalJogo(divElement, audioElement, infoElement, containerElement);        
    });
}

function finalJogo(div, som, info, container) {
    const animal = getAnimal();

    salvarPontuacao();
    adicionaMensagemFinal();   
    preenchePontuacao(info, div);

    div.appendChild(adicionarImagemAnimal(animal.imagemAnimal)); 
    som.pause();
    setAudio(animal.somAnimal, false);

    setTimeout(resetComponentes, 3300, div, container);
}

function adicionaMensagemFinal(){
    document.querySelector('#mensagem').innerHTML = 
        `Você encontrou um animal!<br>Sua atual pontuação é: ${getPontuacao()}.`
}

function adicionarImagemAnimal(caminhoImagem) {
    let imgElement = document.createElement('img');

    imgElement.src = caminhoImagem;
    imgElement.style.height = '300px';
    imgElement.style.top = '50%';
    imgElement.style.left = '50%';
    imgElement.style.position = 'relative';
    imgElement.style.display = 'block';
    imgElement.style.transform = 'translate(-50%, -50%)';
    
    return imgElement;
}

function resetComponentes(div, container) {
    visibilidadeComponentes(div, container, 'none', 'flex');

    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}

function insereProcurarAnimal() {
    let elemento = document.createElement('div');

    elemento.style.width = '70px';
    elemento.style.height = '70px';
    elemento.style.cursor = 'pointer';
    elemento.style.background = 'black';
    elemento.style.top = `${Math.floor(Math.random() * 80)}%`;
    elemento.style.left = `${Math.floor(Math.random() * 90)}%`;
    elemento.style.position = 'relative';

    return elemento;
}

function preenchePontuacao(infoElement, divPrincipal) {
    infoElement.innerHTML = `Sua pontuação: ${getPontuacao()}`;

    let divInfoElement = document.createElement('div');
    divInfoElement.setAttribute('id', 'info');
    divInfoElement.appendChild(infoElement);
    divInfoElement.style.cursor = 'default';

    divPrincipal.appendChild(divInfoElement);
}


function setAudio(caminhoSom, loop) {
    let audioElement = document.createElement('audio');

    audioElement.src = caminhoSom;
    audioElement.loop = loop;
    audioElement.play();

    return audioElement;
}

function getAnimal(){
    let animais = ['leao', 'dog', 'gato', 'bird', 'elefante', 'cow', 'fox', 'dolphin'];
    return new Animal(animais[Math.floor(Math.random() * animais.length)]);
}

function salvarPontuacao() {
    localStorage.setItem('pontuacao', getPontuacao() + 1);
}

function getPontuacao() {
    return (!localStorage.getItem('pontuacao')) ? 0 : parseInt(localStorage.getItem('pontuacao'));
}

function visibilidadeComponentes(divJogo, divInicio, condicao1, condicao2){
    divJogo.style.display = condicao1; //div do jogo
    divInicio.style.display = condicao2; //div do inicio
}
