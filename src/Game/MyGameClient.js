import GameClient from './GameClient.js';

class MyGameClient extends GameClient {

    StartClient(){
        this.socket.on('set-goal-position', this.OnSetGoalPosition.bind(this));
        this.socket.on('player-won-round', this.OnPlayerWonRound.bind(this));
        this.socket.on('player-lost-round', this.OnPlayerLostRound.bind(this));
    }

    SendPlayerClick(data){
        this.socket.emit('player-got-position', data);
    }

    OnSetGoalPosition(data){
        this.SendToGame('SocketSetGoalPosition', JSON.stringify(data));
    }

    OnPlayerWonRound(){
        this.SendToGame('SocketPlayerWonRound');
    }

    OnPlayerLostRound(){
        this.SendToGame('SocketPlayerLostRound');
    }

}

export default MyGameClient;