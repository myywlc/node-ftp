const address = require('address');
const FtpSrv = require('ftp-srv');

const ip = address.ip();
const hostname = '0.0.0.0';
const port = 2121;
const ftpServer = new FtpSrv({
  url: `ftp://${hostname}:${port}`,
  pasv_url: `ftp://${ip}`,
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
}).catch(e => {
  console.log(e);
});
