!function e(t,o,n){function i(r,s){if(!o[r]){if(!t[r]){var u="function"==typeof require&&require;if(!s&&u)return u(r,!0);if(c)return c(r,!0);var a=new Error("Cannot find module '"+r+"'");throw a.code="MODULE_NOT_FOUND",a}var h=o[r]={exports:{}};t[r][0].call(h.exports,function(e){var o=t[r][1][e];return i(o?o:e)},h,h.exports,e,t,o,n)}return o[r].exports}for(var c="function"==typeof require&&require,r=0;r<n.length;r++)i(n[r]);return i}({1:[function(e,t,o){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(o,"__esModule",{value:!0});var i=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),c=function(){function e(){n(this,e),this.unityWebSocketLobbyGameObject="WebGLSocketLobby",this.config={},this.socket=null,this.roomSocket=null,this.connectionTimeout=10,this.currentConnectionTimeout=0,this.connectionID="",this.gameServerUrl=""}return i(e,[{key:"Send",value:function(e,t){SendMessage(this.unityWebSocketLobbyGameObject,e,t)}},{key:"SetConfig",value:function(e){this.config=JSON.parse(e)}},{key:"Connect",value:function(e){this.gameServerUrl="http://"+e+"/";var t=document.createElement("script");t.setAttribute("src",this.gameServerUrl+"socket.io/socket.io.js"),document.head.appendChild(t),this.SocketIOCheck()}},{key:"SocketIOCheck",value:function(){return"undefined"==typeof io?(this.currentConnectionTimeout++,void(this.currentConnectionTimeout==this.connectionTimeout?this.Send("SocketConnectionTimeout"):setTimeout(this.SocketIOCheck.bind(this),1e3))):void this.ConnectToGameServer()}},{key:"ConnectToGameServer",value:function(){this.currentConnectionTimeout=0,this.socket=io(this.gameServerUrl),this.socket.on("connect",this.OnConnected.bind(this)),this.socket.on("disconnect",this.OnDisconnected.bind(this))}},{key:"JoinLobby",value:function(){this.roomSocket=io.connect(this.gameServerUrl+"rooms"),this.roomSocket.on("connect",this.OnConnectedToRoom.bind(this)),this.roomSocket.on("get-room-list",this.GetRoomList.bind(this)),this.roomSocket.on("get-player-list",this.GetPlayerList.bind(this)),this.roomSocket.on("start-game",this.OnGameStarted.bind(this)),this.roomSocket.on("room-is-ready",this.OnRoomReady.bind(this))}},{key:"CreateRoom",value:function(e){this.roomSocket.emit("create-room",{roomName:e},this.OnRoomCreated.bind(this))}},{key:"OnRoomCreated",value:function(e){this.Send("SocketRoomCreated",JSON.stringify(e))}},{key:"JoinRoom",value:function(e){this.roomSocket.emit("join-room",{roomID:e},this.OnRoomJoined.bind(this))}},{key:"OnRoomJoined",value:function(e){this.Send("SocketRoomJoined",JSON.stringify(e))}},{key:"LeaveRoom",value:function(e){this.roomSocket.emit("leave-room",{roomID:e},this.OnLeftRoom.bind(this))}},{key:"OnLeftRoom",value:function(){this.Send("SocketLeftRoom")}},{key:"GetRoomList",value:function(){this.roomSocket.emit("get-room-list",this.OnGotRoomList.bind(this))}},{key:"OnGotRoomList",value:function(e){this.Send("SocketGotRoomList",JSON.stringify(e))}},{key:"GetPlayerList",value:function(e){this.roomSocket.emit("get-player-list",{roomID:e},this.OnGotPlayerList.bind(this))}},{key:"OnGotPlayerList",value:function(e){this.Send("SocketGotPlayerList",JSON.stringify(e))}},{key:"UpdatePlayer",value:function(e){this.roomSocket.emit("update-player",{updateData:e})}},{key:"OnRoomReady",value:function(){this.Send("SocketRoomReady")}},{key:"StartGame",value:function(e){this.roomSocket.emit("start-game",{roomID:e},this.OnGameStarted.bind(this))}},{key:"OnGameStarted",value:function(){this.Send("SocketStartedGame")}},{key:"OnConnected",value:function(){this.socket.emit("set-config",{config:this.config}),this.socket.emit("get-connection-id",this.OnGotConnectionID.bind(this))}},{key:"OnGotConnectionID",value:function(e){this.connectionID=e,this.JoinLobby()}},{key:"OnDisconnected",value:function(){this.Send("SocketDisconnected")}},{key:"OnConnectedToRoom",value:function(){this.Send("SocketConnected",this.connectionID)}}]),e}();o.default=c},{}],2:[function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=e("./WebSocketLobby/WebSocketLobby.js"),c=n(i);window.webglSocketLobby=new c.default},{"./WebSocketLobby/WebSocketLobby.js":1}]},{},[2]);
//# sourceMappingURL=app.js.map
