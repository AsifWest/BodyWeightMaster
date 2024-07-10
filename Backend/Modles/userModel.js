const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Static signup method
userSchema.statics.signup = async function(email, password) {

  //validation of email and pass
  if(!email || !password) {
    throw Error('Fill the details Nigga')
  }
  if(!validator.isEmail(email)) {
    throw Error('Enter a valid Email LOOSER')
  }

  if(!validator.isStrongPassword(password)) {
    throw Error('Your password is weak just like you')
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  // Hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
}

//static login method

userSchema.statics.login = async function (email, password) {
  if(!email || !password) {
    throw Error('Fill the details Nigga')
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password)
  if(!match) {
    throw Error('Wrong Passward Nigga')
  }
  return user

}

module.exports = mongoose.model('User', userSchema);
