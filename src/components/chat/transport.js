import io from "socket.io-client";

/**
 * Transport for sending and receiving messages using socket.io library.
 */
class Transport {

    init() {
        this.serviceUrl = "https://spotim-demo-chat-server.herokuapp.com";
        this.chatEventName = 'spotim/chat';

        this.socket = io(this.serviceUrl);
        this.socket.on("connect", function() {
            console.log("connected to chat server!");
        });
        this.socket.on("disconnect", function() {
            console.log("disconnected from chat server!");
        });

        const self = this;
        this.socket.on(this.chatEventName, function (message) {
            self.onMessage(message);
        });
    }

    /**
     * Send message.
     *
     * @param {Object} message
     */
    sendMessage(message) {
        this.socket.emit(this.chatEventName, message);
    }

    /**
     * Override this handler in your application or component.
     *
     * @param {Object} message
     */
    onMessage(message) {}
}

export default Transport;