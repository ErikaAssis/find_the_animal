class PontuacaoService {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    /**
     * Adiciona um ponto à pontuação e salva no localStorage.
     */
    static setPontuacao(){
        localStorage.setItem('pontuacao', PontuacaoService.getPontuacao + 1);
    }

    /**
     * Retorna do localStorage a atual pontuação do jogador.
     */
    static get getPontuacao(){
        return parseInt(localStorage.getItem('pontuacao')) || 0;
    }
}