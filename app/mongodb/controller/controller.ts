const db = require("../model/index.ts");
const Tutorial = db.tutorial;

// Create document
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Title is empty!",
    });
  }

  // Set document
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  // Save document
  tutorial
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Create document failure.",
      });
    });
};

// Retrieve all documents
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  // Retrieve all documents
  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Retrieve document failure.",
      });
    });
};

// Retrieve single document
exports.findOne = (req, res) => {
  const id = req.params.id;

  // Retrieve single document by id
  Tutorial.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Cannot find document. (id: " + id + ")",
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Retrieve single document failure. (id: " + id + ")",
      });
    });
};

// Update document by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data is empty!",
    });
  }

  // Set id
  const id = req.params.id;

  // Update document by id
  Tutorial.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Cannot update document. (id: " + id + ")",
        });
      }
      res.send({
        message: "Document updated.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Update document failure. (id: " + id + ")",
      });
    });
};

// Delete document by id
exports.delete = (req, res) => {
  const id = req.params.id;

  // Delete document by id
  Tutorial.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Cannot delete document. (id: " + id + ")",
        });
      }
      res.send({
        message: "Document deleted.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Delete document failure. (id: " + id + ")",
      });
    });
};
