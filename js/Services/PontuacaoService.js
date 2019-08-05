class PontuacaoService {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static setPontuacao(){
        localStorage.setItem('pontuacao', PontuacaoService.getPontuacao + 1);
    }

    static get getPontuacao(){
        return (!localStorage.getItem('pontuacao')) ? 0 : parseInt(localStorage.getItem('pontuacao'));
    }
}