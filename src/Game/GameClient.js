class GameClient {

    constructor(){
        this.socket = null;
        this.roomID = null;

        this.unityGameReceiverObject = 'GameManager';

        window.gameClient = this;
    }

    StartReceiver(data){
        this.socket = data.socket;
        this.roomID = data.roomID;

        this.socket.on('receive-game-data', this.OnReceiveGameData.bind(this));

        this.StartClient();
    }

    StartClient(){}

    OnReceiveGameData(data){
        this.SendToGame('SocketReceiveData', data);
    }

    SendToAllPlayers(data){
        this.socket.emit('send-to-all-players', data);
    }

    SendToOnePlayer(data){
        this.socket.emit('send-to-one-player', data);
    }

    SendToServer(data){
        this.socket.emit('send-to-server', data);
    }

    SendToGame(functionName, parameter){
        SendMessage(this.unityGameReceiverObject, functionName, parameter);
    }

}

export default GameClient;