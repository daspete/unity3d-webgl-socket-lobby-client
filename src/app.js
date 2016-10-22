import WebSocketLobby from './WebSocketLobby/WebSocketLobby.js';
import MyGameClient from './Game/MyGameClient.js';


window.webglSocketLobby = new WebSocketLobby(new MyGameClient());

