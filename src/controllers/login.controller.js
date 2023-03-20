const loginService = require('../services/login.service');

const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
 return res.status(400).json({
    message: 'Some required fields are missing',
  }); 
  }
  
  const token = await loginService.logIn({ email, password });
  if (token.message) return res.status(token.status).send({ message: token.message });
  console.log({ token });

  res.status(200).send({ token });
};

module.exports = {
  logIn,
};