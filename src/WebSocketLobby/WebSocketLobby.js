class WebSocketLobby {

    constructor(gameClient){
        this.unityWebSocketLobbyGameObject = 'WebGLSocketLobby';
        this.config = {};

        this.socket = null;
        this.roomSocket = null;
        this.connectionTimeout = 10;
        this.currentConnectionTimeout = 0;

        this.connectionID = '';
        this.roomID = null;

        this.gameServerUrl = '';

        this.gameClient = gameClient;
    }

    Send(functionName, parameter){
        SendMessage(this.unityWebSocketLobbyGameObject, functionName, parameter);
    }

    SetConfig(data){
        this.config = JSON.parse(data);
    }

    Connect(server){
        this.gameServerUrl = 'http://' + server + '/';

        var socketIOScript = document.createElement('script');
        socketIOScript.setAttribute('src', this.gameServerUrl + 'socket.io/socket.io.js');
        document.head.appendChild(socketIOScript);

        this.SocketIOCheck();
    }

    SocketIOCheck(){
        if(typeof io == 'undefined'){
            this.currentConnectionTimeout++;

            this.currentConnectionTimeout == this.connectionTimeout
                ? this.Send('SocketConnectionTimeout')
                : setTimeout(this.SocketIOCheck.bind(this), 1000);

            return;
        }

        this.ConnectToGameServer();
    }

    ConnectToGameServer(){
        this.currentConnectionTimeout = 0;

        this.socket = io.connect(this.gameServerUrl);

        this.socket.on('connect', this.OnConnected.bind(this));
        this.socket.on('disconnect', this.OnDisconnected.bind(this));
    }

    JoinLobby(){
        this.roomSocket = io.connect(this.gameServerUrl + 'rooms');
        this.roomSocket.on('connect', this.OnConnectedToRoom.bind(this));

        this.roomSocket.on('get-room-list', this.GetRoomList.bind(this));
        this.roomSocket.on('get-player-list', this.GetPlayerList.bind(this));
        this.roomSocket.on('start-game', this.OnGameStarted.bind(this));
        this.roomSocket.on('room-is-ready', this.OnRoomReady.bind(this));
    }

    CreateRoom(roomName){
        this.roomSocket.emit('create-room', { roomName: roomName }, this.OnRoomCreated.bind(this));
    }

    OnRoomCreated(data){
        this.Send('SocketRoomCreated', JSON.stringify(data));
    }

    JoinRoom(roomID){
        this.roomSocket.emit('join-room', { roomID: roomID }, this.OnRoomJoined.bind(this));
    }

    OnRoomJoined(data){
        this.Send('SocketRoomJoined', JSON.stringify(data));
    }

    LeaveRoom(roomID){
        this.roomSocket.emit('leave-room', { roomID: roomID }, this.OnLeftRoom.bind(this));
    }

    OnLeftRoom(){
        this.Send('SocketLeftRoom');
    }

    GetRoomList(){
        this.roomSocket.emit('get-room-list', this.OnGotRoomList.bind(this));
    }

    OnGotRoomList(data){
        this.Send('SocketGotRoomList', JSON.stringify(data));
    }

    GetPlayerList(roomID){
        this.roomSocket.emit('get-player-list', { roomID: roomID }, this.OnGotPlayerList.bind(this));
    }

    OnGotPlayerList(data){
        this.Send('SocketGotPlayerList', JSON.stringify(data));
    }

    UpdatePlayer(data){
        this.roomSocket.emit('update-player', { updateData: data });
    }

    OnRoomReady(){
        this.Send('SocketRoomReady');
    }

    StartGame(roomID){
        this.roomID = roomID;
        this.roomSocket.emit('start-game', { roomID: roomID}, this.OnGameStarted.bind(this));
    }

    OnGameStarted(){
        this.gameClient.SetPlayerID(this.connectionID);
        this.gameClient.StartReceiver({
            socket: this.roomSocket,
            roomID: this.roomID
        });

        this.Send('SocketStartedGame');
    }

    OnConnected(){
        this.socket.emit('set-config', { config: this.config });
        this.socket.emit('get-connection-id', this.OnGotConnectionID.bind(this));
    }

    OnGotConnectionID(connectionID){
        this.connectionID = connectionID;
        this.JoinLobby();
    }

    OnDisconnected(){
        this.roomID = null;
        this.Send('SocketDisconnected');
    }

    OnConnectedToRoom(){
        this.Send('SocketConnected', this.connectionID);
    }

}

export default WebSocketLobby;