const User = require("../models/user");

module.exports = {
  createUser: async (req, res) => {
    try {
      // check if email already exist
      const findUser = await User.findOne({ email: req.body.email });
      if (findUser) {
        res.status(409).send("Пользователь с таким ящиком уже существует");
      } else {
        const newUser = await new User(req.body).save();
        res.status(200).send(newUser);
      }
    } catch (error) {
      res.send(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ status: "success", message: "Пользователь успешно удален" });
    } catch (error) {
      res.send(error);
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.send(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send(user);
    } catch (error) {
      res.send(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send(error);
    }
  }
};
