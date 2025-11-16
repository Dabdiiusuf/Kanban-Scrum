const db = require("../firebase");

exports.getTickets = async (req, res) => {
  try {
    const snapshot = await db.collection("scrumTodo").get();
    const tickets = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const { text, status } = req.body;
    console.log("POST /api/scrumTodo body:", req.body);
    const cleanText = (text ?? "").trim();
    if (!cleanText) return res.status(400).json({ error: "text is required" });

    const newticket = {
      text: cleanText,
      status: status || "todo",
      createdAt: Date.now(),
    };

    const ref = await db.collection("scrumTodo").add(newticket);
    const snap = await ref.get();
    return res.status(201).json({ id: ref.id, ...snap.data() });
  } catch (err) {
    console.error(err.stack);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const docRef = db.collection("scrumTodo").doc(id);
    await docRef.update(updates);
    const updated = await docRef.get();

    res.json({ id, ...updated.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("scrumTodo").doc(id).delete();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
