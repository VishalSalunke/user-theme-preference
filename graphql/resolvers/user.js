const { ApolloError } = require("apollo-server-errors");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { email, password, fullName } }) {
      // check if user exists with same email id
      const oldUser = await User.findOne({ email: email });

      if (oldUser) {
        throw new ApolloError(
          `user with the email ${email} already exists`,
          "USER_ALREADY_EXISTS"
        );
      }

      // Encrypt password
      const encryptedPassword = await bycrypt.hash(password, 10);

      //build mongoose model
      const newUser = new User({
        email: email.toLowerCase(),
        password: encryptedPassword,
        fullName: fullName,
      });

      // create & jwt
      const token = jwt.sign(
        {
          user_id: newUser._id,
          email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "2d",
        }
      );
      newUser.token = token;

      // save user in DB
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      // check if user exits
      const user = await User.findOne({ email });
      // verify password
      if (user && (await bycrypt.compare(password, user.password))) {
        //create new token
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "2d",
          }
        );
        //attach token
        user.token = token;

        return {
          id: user._id,
          ...user._doc,
        };
      } else {
        // return error user if does not exits
        throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
      }
    },
    async updateUserTheme(_, { themeInput: { theme, email } }) {
      const user = await User.findOne({ email });
      if (user) {
        user.theme = theme;
        // save user in DB
        const res = await user.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } else {
        // return error user if does not exits
        throw new ApolloError("Invalid user", "INVALID_USER");
      }
    },
  },
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
};
