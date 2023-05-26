// import { io } from 'socket.io-client';
// var socket;

// export default {
// 	_instance: null,
// 	get instance() {
// 		if (!this._instance) {
// 			this._instance = {
// 				setConnection({ role, id }) {
// 					console.log('new');
// 					console.log('new', role);
// 					return io(`http://localhost:5000/${role}`, { query: `user_id=${id}` });
// 				}
// 			};
// 		}
// 		return this._instance;
// 	}
// };
