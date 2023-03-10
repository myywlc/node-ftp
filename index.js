const address = require('address');
const FtpSrv = require('ftp-srv');

const ip = address.ip();
const hostname = '0.0.0.0';
const port = 2121;
const ftpServer = new FtpSrv({
  url: `ftp://${hostname}:${port}`,
  pasv_url: `ftp://${ip}`,
  pasv_min: port + 1,
  pasv_max: port + 10,
  file_format: 'ls',
  anonymous: false,
  greeting: ['Hello user'],
});

console.log(ip, 'ip');

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  console.log(username, 'username');
  console.log(password, 'password');
  if (username === 'root' && password === '123') {
    return resolve({ root: '/Users/lin' });
  }
  return reject(new errors.GeneralError('Invalid username or password', 401));
});

ftpServer.on('closing', () => {
  console.log('Ftp server is closing');
});

ftpServer.on('closed', ({}) => {
  console.log('Ftp server is closed');
});

ftpServer.on('server-error', ({ error }) => {
  console.log('Ftp server error', error);
});

// ftpServer.on('disconnect', ({ connection, id, newConnectionCount }) => {
//   console.log('Ftp server disconnect', id, newConnectionCount);
// });

ftpServer.listen().then(() => {
  console.log('Ftp server is starting...');
}).catch(e => {
  console.log(e);
});

