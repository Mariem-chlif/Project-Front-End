import { io } from 'socket.io-client';

let SocketProvider = io(`http://localhost:5000`);

export default SocketProvider;
