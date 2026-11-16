const Message = require("../models/Message");

exports.createMessage = async (req, res, next) => {
  try {
    const msg = await Message.create(req.body);
    res.status(201).json({ message: "Message received", id: msg._id });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    res.json(await Message.find().sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
};

exports.markRead = async (req, res, next) => {
  try {
    const m = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );
    res.json(m);
  } catch (err) {
    next(err);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
