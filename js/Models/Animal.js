class Animal {
    constructor(animal){
        this._pathImagem = `/img/${animal}.png`;
        this._pathSom = `/music/${animal}.mp3`;
    }

    get imagemAnimal(){
        return this._pathImagem;
    }

    get somAnimal(){
        return this._pathSom;
    }
}