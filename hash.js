// hash.js
const bcrypt = require('bcryptjs');

const password = 'cfeadmin123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
  } else {
    console.log('Generated Hash:', hash);
  }
});
