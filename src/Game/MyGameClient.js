import GameClient from './GameClient.js';

class MyGameClient extends GameClient {

    StartClient(){
        this.socket.on('set-goal-position', this.OnSetGoalPosition.bind(this));
    }

    OnSetGoalPosition(data){
        this.SendToGame('SocketSetGoalPosition', JSON.stringify(data));
    }

}

export default MyGameClient;