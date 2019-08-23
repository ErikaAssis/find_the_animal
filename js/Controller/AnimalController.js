class AnimalController {
  constructor() {
    const $ = document.querySelector.bind(document);

    // Cria um acesso DOM dos elementos.
    this._divPrincipalElement = $('#app');
    this._divJogoElement = $('.container');
    this._infoElement = document.createElement('h2');
  }

  /**
   * Inicia o jogo após evento de 'click' do usuário.
   */
  iniciarJogo() {
    // Cria o elemento a ser encontrado pelo jogador.
    const findElement = this._inserirProcurarAnimal();

    // Adiciona à div principal do jogo o áudio padrão do jogo.
    this._adicionarElementoFilho(
      this._divPrincipalElement,
      AudioJogo.criar('./music/music.mp3', true)
    );
    // Adiciona à div principal do jogo o elemento a ser encontrado
    this._adicionarElementoFilho(this._divPrincipalElement, findElement);

    // Altera a visibilidade das divs para o jogo ser iniciado.
    this._visibilidadeTag(true);

    // Exibe para o jogador a atual pontuação do mesmo.
    this._preencherPontuacao();

    // Evento acionado após o jogador encontrar o elemento escondido.
    findElement.addEventListener('click', () => {
      // 'Esconde' o elemento escondido
      findElement.style.display = 'none';

      this._finalizarJogo();
    });
  }

  /**
   * Finaliza o jogo após o jogador encontrar o elemento escondido;
   *
   */
  _finalizarJogo() {
    // Atualiza e exibe a nova pontuação.
    PontuacaoService.setPontuacao();
    this._preencherPontuacao();

    // Gera o animal que foi encontrado.
    const animal = this._getAnimal();
    const imgJogoElement = this._gerarImagemAnimal(animal.imagemAnimal);

    // Exibe a mensagem de final de jogo.
    this._adicionaMensagemFinal(animal.nomeAnimal);

    // Adiciona a imagem do animal à div principal da aplicação.
    this._adicionarElementoFilho(this._divPrincipalElement, imgJogoElement);

    // Atualiza a música do jogo de acordo com o som caracteristico do animal.
    AudioJogo.pause();
    AudioJogo.criar(animal.somAnimal);

    /* Após 3 segundos (tempo necessário para exibir imagem do animal e tocar o 
        som característico do mesmo) chama a função restartJogo() para voltar 
        a aplicação para o estado inicial. */
    setTimeout(this._restartJogo.bind(this), 3300);
  }

  /**
   * Retorna os componentes ao padrão inicial da aplicação,
   * e a torna pronta para se jogar novamente.
   */
  _restartJogo() {
    this._visibilidadeTag(false);

    // Exclui todos os filhos inseridos na div principal da aplicação.
    while (this._divPrincipalElement.firstChild) {
      this._divPrincipalElement.removeChild(
        this._divPrincipalElement.firstChild
      );
    }
  }

  /**
   * Cria um elemento <div> que será utilizado para ser achado
   * pelo jogador e atribui estilos css ao mesmo.
   * Retorna o elemento criado.
   */
  _inserirProcurarAnimal() {
    const findElement = document.createElement('div');

    //findElement.style.background = 'black'; // Utilizado apenas na fase de desenvolvimento
    // Define a posição aleatória onde será inserido o elemento.
    findElement.style.top = `${Math.floor(Math.random() * 80)}%`;
    findElement.style.left = `${Math.floor(Math.random() * 90)}%`;

    // Adiciona a classe de CSS findElement
    findElement.classList.add('findElement');
    return findElement;
  }

  /**
   * Escolhe aleatoriamente o animal a ser exibido para o jogador ao final do jogo.
   * Retorna o objeto Animal criado.
   */
  _getAnimal() {
    const animais = [
      'leão',
      'cachorro',
      'gato',
      'passarinho',
      'elefante',
      'vaca',
      'golfinho'
    ];
    return new Animal(animais[Math.floor(Math.random() * animais.length)]);
  }

  /**
   * Cria uma tag imagem <img> contendo a imagem do animal,
   * cujo src é recebido pelo parâmetro 'caminhoImagem',
   * e atribui estilos css à mesma.
   * Retorna o elemento imagem criado.
   *
   * @param {String} caminhoImagem
   */
  _gerarImagemAnimal(caminhoImagem) {
    const imgJogoElement = document.createElement('img');

    imgJogoElement.src = caminhoImagem;
    // Adiciona a classe de CSS imagemAnimal
    imgJogoElement.classList.add('imagemAnimal');
    return imgJogoElement;
  }

  /**
   * Preenche o parágrafo <p> infoElement, e o adiciona em divs <div>,
   * para assim informar ao jogador a sua atual pontuação no jogo.
   */
  _preencherPontuacao() {
    this._infoElement.innerHTML = `Sua pontuação: ${
      PontuacaoService.getPontuacao
    }`;

    const divInfoElement = document.createElement('div');
    divInfoElement.setAttribute('id', 'info');
    divInfoElement.appendChild(this._infoElement);
    divInfoElement.style.cursor = 'default';

    this._adicionarElementoFilho(this._divPrincipalElement, divInfoElement);
  }

  /**
   * Cria e exibe uma mensagem para o usuário, informando o final do jogo
   * e sua atual pontuação.
   */
  _adicionaMensagemFinal(animal) {
    document.querySelector(
      '#mensagem'
    ).innerHTML = `<br />Parabéns, você encontrou um <span>${animal}</span>!<br>Sua atual pontuação é: <span>${
      PontuacaoService.getPontuacao
    }</span>`;
  }

  /**
   * Adiciona um filho à tag html.
   *
   * @param {Elemento HTML} tagPai
   * @param {Elemento HTML} tagFilho
   */
  _adicionarElementoFilho(tagPai, tagFilho) {
    tagPai.appendChild(tagFilho);
  }

  /**
   * Altera o atributo display das divs <div> de acordo com
   * a condição recebida como parâmetro.
   *
   * @param {Boolean} condicao
   */
  _visibilidadeTag(condicao) {
    if (condicao) {
      this._divPrincipalElement.style.display = 'block';
      this._divJogoElement.style.display = 'none';
    } else {
      this._divPrincipalElement.style.display = 'none';
      this._divJogoElement.style.display = 'flex';
    }
  }
}
