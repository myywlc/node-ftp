// Quick start, create an active ftp server.
const FtpSrv = require('ftp-srv');

const port = 2121;
const ftpServer = new FtpSrv({
  url: 'ftp://0.0.0.0:' + port,
  pasv_url: 'ftp://10.0.30.233',
  pasv_min: 2122,
  pasv_max: 2123,
  file_format: 'ls',
  anonymous: false,
  greeting: ['Hello user'],
});

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  if (username === 'root' && password === '123') {
    return resolve({ root: '/Users/lin' });
  }
  return reject(new errors.GeneralError('Invalid username or password', 401));
});

ftpServer.listen().then(() => {
  console.log('Ftp server is starting...');
});
