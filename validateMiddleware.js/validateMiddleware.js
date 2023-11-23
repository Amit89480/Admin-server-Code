const { z } = require("zod");


// here we are creating a middleware function to validate the user registration

const validateMiddleware = (schema) =>  {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({ message: error.issues[0].message });
    }
  };
};


module.exports = { validateMiddleware };