class Animal {
  constructor(animal) {
    this._pathImagem = `./img/${animal}.png`;
    this._pathSom = `./music/${animal}.mp3`;
    this._nomeAnimal = animal;
  }

  /**
   * Retorna a localização da imagem do animal
   * de acordo com o diretório onde o arquivo .png foi salvo.
   */
  get imagemAnimal() {
    return this._pathImagem;
  }

  /**
   * Retorna a localização do som do animal
   * de acordo com o diretório onde o arquivo .mp3 foi salvo.
   */
  get somAnimal() {
    return this._pathSom;
  }

  /**
   * Retorna o nome do animal.
   */
  get nomeAnimal() {
    return this._nomeAnimal;
  }
}
