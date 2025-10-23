import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

const signJWT = (payload, secret = SECRET, options = { expiresIn: '7d' }) => {
  return jwt.sign(payload, secret, options); 
}

const verifyJWT = (token) => {

  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    console.log(err)
    return null;
  }
}


export { signJWT, verifyJWT };
