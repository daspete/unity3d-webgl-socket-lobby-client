# unity3d-webgl-socket-lobby-client

This is the client of the Unity3D-WebGL-Socket-Lobby-System.
To get the system run, you also need two more packages:

* [the server package](https://github.com/daspete/unity3d-webgl-socket-lobby-server)
* [the Unity3D AssetStore package]()

## Requirements
* NodeJS with the `gulp-cli` package installed

## Installation
Clone this repository to a destination of your choice.

## Unity3D game file destination
Copy your Unity3D webgl game files
 
* webgl.jsgz
* webgl.datagz
* webgl.memgz
* UnityLoader.js

to the `/unity` folder of your cloned repository.

## Editing the client

### Gulp watcher
To start the gulp watcher, go to the path, where you cloned this repo and type in
`gulp`

### GameClient
There is already a little example game client at `/src/Game/MyGameClient.js`

#### Socket event listeners
At the `StartClient` function, you can set your socket event listeners.

For example, if you want to create a new event listener called `player-was-hit`, then you can just write

```
this.socket.on('player-was-hit', function(){
    console.log('Player was hit');
});
```

So everytime, the server sends the event 'player-was-hit' this function will be called.

#### Send socket messages
To send datas to other players, you need to use the `this.socket.emit` function.

For example, if you want to send a message `player-hit-another`, you can write

```
this.socket.emit('player-hit-another', {
    playerID: window.webglSocketLobby.connectionID,
    hitTarget: 'the player id of the hit target'
});
```

#### Send datas to the unity game
When you got a socket message, the unity game itself also needs to know about it. We can send a message to the unity WebGL game with `this.SendToGame`, where we set the receiver function and the datas for it. Just keep in mind, that the data needs to be stringified to get recognized in the game itself.

So, for example, if we got hit by an ememy, we could just write

```
this.SendToGame('SocketPlayerWasHit', JSON.stringify({
    'playerID': 'player id of the enemy',
    'damage': 10
}));
```

