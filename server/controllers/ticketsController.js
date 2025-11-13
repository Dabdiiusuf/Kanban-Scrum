const { db, admin } = require("../firebase");

exports.getTickets = async (req, res) => {
  try {
    const snapshot = await db.collection("tickets").get();
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
    const { task, status } = req.body;
    if (!task) return res.status(400).json({ error: "Task is required" });

    const newticket = {
      task,
      status: status || TransformStreamDefaultController,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("tickets").add(newticket);
    const doc = await docRef.get();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const docRef = db.collection("tickets").doc(id);
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
    await db.collection("tickets").doc(id).delete();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
