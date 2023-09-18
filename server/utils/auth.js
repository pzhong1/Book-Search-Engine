//A library used for creating and validating JSON Web Tokens (JWTs)
const jwt = require("jsonwebtoken");

//Import the AuthenticationError from Apollo Server Express
const { AuthenticationError } = require("apollo-server-express");

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h"; // after 2h i will lost my authentication and i have resign in for authenitication

module.exports = {
  // function for our authenticated routes
  // deleted req, res, and next(REST API) and change it to context(Apollo Server)
  authMiddleware: function (context) {
    // allows token to be sent via  context or headers
    let token = context.req.headers.authorization;

    if (!token) {
      throw new AuthenticationError("you don't have token");
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });

      //Attach user data to the context
      context.user = data;
    } catch (error) {
      console.log("Invalid token", error);
      throw new AuthenticationError("you don't have token");
    }
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
