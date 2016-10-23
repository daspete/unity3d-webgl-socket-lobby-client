class GameClient {

    constructor(){
        this.socket = null;
        this.roomID = null;
        this.playerID = window.webglSocketLobby.connectionID;

        this.unityGameReceiverObject = 'GameManager';

        window.gameClient = this;
    }

    StartReceiver(data){
        this.socket = data.socket;
        this.roomID = data.roomID;

        this.StartClient();
    }

    StartClient(){}

    SendToGame(functionName, parameter){
        SendMessage(this.unityGameReceiverObject, functionName, parameter);
    }

}

export default GameClient;