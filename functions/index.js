const app = require("express")();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const password = process.env.PASSWORD;
const uri =
  "mongodb+srv://lupelazzo:" +
  password +
  "@cluster0.uxnsaal.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongodb ---");
  } catch (error) {
    console.error(error);
  }
}
connect();

// Model and schema Dilemma
const dilemmaSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  title: String,
  conArgs: [{ type: { type: String }, title: String, point: Number }],
  proArgs: [{ type: { type: String }, title: String, point: Number }],
  totalPro: Number,
  totalCons: Number,
  totalPoints: Number,
});
const Dilemma = mongoose.model("Dilemma", dilemmaSchema);

app.use(cors());
//Body Parser Middleware
//parse application'
app.use(bodyParser.urlencoded({ extended: false }));
//parse app json
app.use(bodyParser.json());

/* Get all dilemmas */
app.get("/dilemmas", async (req, res) => {
  try {
    const dilemmasData = await Dilemma.find({});
    return res.json(dilemmasData);
  } catch (e) {
    console.log("Error with getting dillemmas", e);
    res.status(500).json({ message: e.message });
  }
});

/* Get a dilemma */

app.get("/dilemma/:id", async (req, res) => {
  try {
    const dilemmaFound = await Dilemma.findById(req.params.id);
    if (Object.keys(dilemmaFound).length === 0) {
      console.error(`Id not found ${req.params.id}`);
      res.status(404).json({ error: "Not found id" });
    }
    return res.json(dilemmaFound);
  } catch (error) {
    console.error(`Error getting dilemma`, error.message);
    res.status(500).json({ message: error.message });
  }
});

/* Delete a dilemma */

app.delete("/dilemma/:id", async (req, res) => {
  try {
    await Dilemma.deleteOne({ _id: req.params.id });
    res.json({ message: `Dilemma ${req.params.id} deleted successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.code, message: error.message });
  }
});

/* Update a dilemma */

app.put("/dilemma/:id", async (req, res) => {
  try {
    await Dilemma.findOneAndUpdate(
      { _id: req.params.id },
      {
        _id: req.params.id,
        title: req.body.title,
        conArgs: req.body.conArgs,
        proArgs: req.body.proArgs,
        totalPro: req.body.totalPro,
        totalCons: req.body.totalCons,
        totalPoints: req.body.totalPoints,
      }
    );
    res.json({ message: `Dilemma updated successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.code, message: error.message });
  }
});

/* Create a dilemma */

app.post("/dilemma", (req, res) => {
  //  crea dilemmas en el array de dilemmas
  const newDilemma = new Dilemma({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    conArgs: req.body.conArgs,
    proArgs: req.body.proArgs,
    totalPro: req.body.totalPro,
    totalCons: req.body.totalCons,
    totalPoints: req.body.totalPoints,
  });

  newDilemma
    .save()
    .then((result) => {
      res.json({ message: `Document ${result._id} was created succesfully` });
      return result;
    })
    .catch((err) => {
      console.error("Error creating dilemma", err);
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.code });
    });
});

//Start server
app.listen(3005, () => {
  console.log("server started on port 3005...");
});
