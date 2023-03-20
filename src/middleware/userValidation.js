const userValidation = ({ displayName, email, password }) => {
  if (displayName.length < 8) {
    return { status: 400, message: '"displayName" length must be at least 8 characters long' };
  }

  if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
    return { status: 400, message: '"email" must be a valid email' };
  }
  
  if (password.length < 6) {
    return { status: 400, message: '"password" length must be at least 6 characters long' };
  }
  
  return { status: 201, message: null };
};

module.exports = userValidation;