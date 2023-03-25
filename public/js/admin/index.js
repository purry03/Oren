// eslint-disable-next-line no-undef
const socket = io();

socket.on('connect', () => {
	console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on('log', (data) => { 
	$('pre').append(`\n${data}`);
});