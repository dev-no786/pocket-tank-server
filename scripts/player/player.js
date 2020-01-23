const PlayerStatus = {
    AUTH_PENDING : "auth_pending",
    AUTH_PROGRESS : "auth_progress",
    AUTH_COMPLETE : "auth_complete",
    AUTH_FAILED : "auth_failed",
    LOBBY : "lobby",
    GAMEPLAY : "gameplay"
}

var Matchmaking = require('../matchmaking/matchmaking.js');

class Player{

    constructor(socket)
    {
        this.socket = socket;
        this.state = PlayerStatus.AUTH_PENDING;
    }

    init()
    {
        this.socket.on('auth', this.onAuthRequest);
        this.socket.on('startMatchmaking', this.startMatchmaking);

        // this.socket.emit('auth');
        console.log("auth status: "+ this.state);
        this.socket.emit('authAwait');
        // this.socket.emit('getState', {state : this.state});
    }

    onAuthRequest(msg) {
        this.socket = this;

        this.userId = msg['userId'];
        this.state = PlayerStatus.AUTH_PROGRESS;
        console.log("auth status: " +this.state);
        console.log("authenticating user id ..");
        
        if (this.userId != 0)
        {
            console.log("Welcome back user"+ this.userId);
        }
        else
        {
            this.userId = 101;
            console.log("New user"+ this.userId + " joined");
        }
        
        this.socket.emit('authOk', { userId : this.userId});
    }

    startMatchmaking(){
        this.socket = this;

        var matchmaking = new Matchmaking.Matchmaking(this.socket);

        matchmaking.start();
    }    
}

module.exports = {
    Player: Player
};