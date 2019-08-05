class AnimalController {

    constructor(){
        const $ = document.querySelector.bind(document);

        this._divPrincipalElement = $('#app');
        this._containerElement = $('.container');
        this._infoElement = document.createElement('h2');      
    }

    iniciarJogo(){  
        const findElement = this._insereProcurarAnimal();

        this._adicionarElementoFilho(this._divPrincipalElement, AudioJogo.criar('/music/music.mp3', true));
        this._adicionarElementoFilho(this._divPrincipalElement, findElement);
        this._visibilidadeElemento(true);
        this._preencherPontuacao();

        findElement.addEventListener('click', () => {
            findElement.style.display = 'none';
            this._finalJogo();
        });
    }

    _finalJogo(){
        PontuacaoService.setPontuacao();
        this._preencherPontuacao();
        this._adicionaMensagemFinal();

        const animal = this._getAnimal();
        const imgJogoElement= this._gerarImagemAnimal(animal.imagemAnimal);

        this._adicionarElementoFilho(this._divPrincipalElement, imgJogoElement);

        AudioJogo.pause();
        AudioJogo.criar(animal.somAnimal);

        setTimeout(this._resetarComponentes.bind(this), 3300);
    }

    _resetarComponentes(){
        this._visibilidadeElemento(false);

        while(this._divPrincipalElement.firstChild){
            this._divPrincipalElement.removeChild(this._divPrincipalElement.firstChild);
        }
    }

    _insereProcurarAnimal(){
        const findElement = document.createElement('div');

        findElement.style.width = '70px';
        findElement.style.height = '70px';
        findElement.style.cursor = 'pointer';
        findElement.style.background = 'black';
        findElement.style.top = `${Math.floor(Math.random() * 80)}%`;
        findElement.style.left = `${Math.floor(Math.random() * 90)}%`;
        findElement.style.position = 'relative';

        return findElement;
    }

    _getAnimal(){
        const animais = ['leao', 'dog', 'gato', 'bird', 'elefante', 'cow', 'fox', 'dolphin'];
        return new Animal(animais[Math.floor(Math.random() * animais.length)]);
    }

    _gerarImagemAnimal(caminhoImagem){
        const imgJogoElement = document.createElement('img');  

        imgJogoElement.src = caminhoImagem;
        imgJogoElement.style.height = '300px';
        imgJogoElement.style.top = '50%';
        imgJogoElement.style.left = '50%';
        imgJogoElement.style.position = 'relative';
        imgJogoElement.style.display = 'block';
        imgJogoElement.style.transform = 'translate(-50%, -50%)';

        return imgJogoElement;
    }

    _preencherPontuacao(){ 
        this._infoElement.innerHTML = `Sua pontuação: ${PontuacaoService.getPontuacao}`;

        const divInfoElement = document.createElement('div');
        divInfoElement.setAttribute('id', 'info');
        divInfoElement.appendChild(this._infoElement);
        divInfoElement.style.cursor = 'default';

        this._adicionarElementoFilho(this._divPrincipalElement, divInfoElement);
    }

    _adicionaMensagemFinal(){
        document.querySelector('#mensagem').innerHTML = 
        `Você encontrou um animal!<br>Sua atual pontuação é: ${PontuacaoService.getPontuacao}.`
    }

    _adicionarElementoFilho(elementoPai, elementoFilho){
        elementoPai.appendChild(elementoFilho);
    }

    _visibilidadeElemento(condicao){
        if(condicao){
            this._divPrincipalElement.style.display = 'block'; 
            this._containerElement.style.display = 'none'; 
        }else{
            this._divPrincipalElement.style.display = 'none'; 
            this._containerElement.style.display = 'flex'; 
        }
    }

}