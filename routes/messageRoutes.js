import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// POST /api/messages
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "الرجاء كتابة الرسالة" });
    }

    const newMessage = await Message.create({ message });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء حفظ الرسالة" });
  }
});

// GET /api/messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء جلب الرسائل" });
  }
});
// DELETE /api/messages/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ error: "الرسالة غير موجودة" });
    }

    res.status(200).json({
      success: true,
      message: "تم حذف الرسالة بنجاح",
      data: deletedMessage,
    });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء حذف الرسالة" });
  }
});

export default router;
