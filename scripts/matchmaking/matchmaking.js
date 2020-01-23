var Queue = (
    function () {
        var instance;

        function  createInstance() {
            var object = [];
            return object;
        }

        return {
            getInstance: function () {
                if(!instance){
                    instance = createInstance();
                }
                return instance;
            }
        };
    }
)();

class Matchmaking
{   
    constructor(socket)
    {
        this.socket = socket;
        this.state = socket.state;
    }

    start()
    {
        var queue = Queue.getInstance();
        
        console.log(queue);
        queue.push(this.socket['userId']);
        console.log("MMqueue " + queue);
    }
}

module.exports = {
    Matchmaking : Matchmaking
};