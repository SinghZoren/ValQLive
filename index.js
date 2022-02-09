const tmi = require('tmi.js'),
    { channel, username, password } = require('./settings.json');

const options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity : {
        username: "ValQLive",
        password: "oauth:qjdl2z3b5ytpuleil8kw87oqrv7q5i"
    },
    channels: ['zeradent', 'aridonnie']
};  

const client = new tmi.Client(options);
client.connect().catch(console.error);

client.on('connected', () => {
    client.say(channel, `${username} has connected!`);
});

const queue = [];
const newuser = [];
var block = false;


client.on('message', (channel, user, message, self) => {
    if(self) return;

    const streamer = channel.slice(1) === user.username;

    if(message == '!owen') {
        client.say(channel, 'Ring Ring... Ring Ring... Hello, Its your friend Owen How are you so bad that you cant get a kill. bozo suck on dezz nuts.');
    }

    if(message == '!queue') {

        client.say(channel, `${queue}`);

    }

    if(user.mod || user['user-type'] == 'mod'){

    if(message == '!clearqueue') {

        while(queue.length > 1) {
            queue.length = 0
        }

        console.log('Queue Cleared');

        client.say(channel, 'Cleared Queue.');
        
    }

    if(message == '!next') {

        queue.shift();

        client.say(channel, `${queue[0]} Is Next In The Queue.`);
    }

    }

    if(message == '!leavequeue') {
        var indexofname = queue.indexOf(`${user.username}`)
        queue.splice(indexofname, 1);
        client.say(channel, 'Successfully Left The Queue.');
    }

    if(message == '!joinqueue') {

        if(queue.includes(`${user.username}`)) {
            client.say(channel, 'Already Queued.')
        } 
        else{ 
            client.say(channel, `@${user.username}, Joined The Queue!`);
        
            queue.push(`${user.username}`);

            console.log(queue);
        }
        }

        if(streamer) {

            if(message == '!clearqueue') {
        
                while(queue.length > 1) {
                    queue.splice(0, queue.length);
                }
        
                console.log('Queue Cleared');
        
                client.say(channel, 'Cleared Queue.');
                
            }
        
            if(message == '!next') {
        
                queue.shift();
        
                client.say(channel, `${queue[0]} Is Next In The Queue.`);
            }
            }
    }

    
)   