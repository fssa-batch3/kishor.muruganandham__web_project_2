import { hash as _hash } from 'bcrypt';

const password = 'mypassword';
const saltRounds = 10;

_hash(password, saltRounds, function(err, hash) {
  // Store hash in your password DB.
  console.log(hash);
});
