class GameClient {

    constructor(){
        this.socket = null;
        this.roomID = null;
        this.playerID = null;

        this.unityGameReceiverObject = 'GameManager';

        window.gameClient = this;
    }

    SetPlayerID(playerID){
        this.playerID = playerID;
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