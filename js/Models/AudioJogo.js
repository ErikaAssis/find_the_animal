class AudioJogo {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static criar(caminhoAudio, loop){
        this._audioElement = document.createElement('audio');
        this._audioElement.src = caminhoAudio;
        this._audioElement.loop = loop;
        this._audioElement.play();
        return this._audioElement;
    }

    static pause(){
        this._audioElement.pause();
    }
}