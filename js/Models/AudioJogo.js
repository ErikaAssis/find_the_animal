class AudioJogo {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    /**
     * Cria e retorna uma tag de áudio <audio>.   
     * 
     * @param {String} caminhoAudio 
     * @param {Boolean} loop 
     */
    static criar(caminhoAudio, loop){
        this._audioElement = document.createElement('audio');
        // Define a localização do audio 
        this._audioElement.src = caminhoAudio;
        // Define se o áudio, após sua finalização, será repetido ou não.
        this._audioElement.loop = loop;
        // Executa o áudio
        this._audioElement.play();
        return this._audioElement;
    }

    /**
     * Pausa o áudio que está em reprodução.
     */
    static pause(){
        this._audioElement.pause();
    }
}