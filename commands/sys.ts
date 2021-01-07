import { client } from '../index';

export const run = async (m, a) => (a[1] == 'ping') ? `Pong! WebSocket Latency: ${client.ws.ping}ms` : (a[1] == 'help') ? '__About me__\nI am a small Discord bot created by Splatterxl#8999 to be an accurate-as-possible interpretarion of the Bash (command line) interface. Please note that this is the only command available right now.\n\n__Commands__\nsys: The system commands you\'d expect from a Discord bot.\n  - sys ping: Pings the WebSocket\n  - sys help: Brings up this help menu' : 'sys: unknown system command';
