const shell = require('./index');
const path = require('path');

shell(path.resolve(__dirname, './test.sh'))
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
