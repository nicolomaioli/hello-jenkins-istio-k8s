import express from "express";

const PORT = process.env.PORT || 3000;
const COLOR = process.env.COLOR || "green";
const NAME = `${COLOR}-machine`;

const app = express();

app.get("/", (_req, res) => {
  res.status(200).json({
    color: `${COLOR}`,
  });
});

app.listen(PORT, () => {
  console.log(`"${NAME}" listening on port ${PORT}`);
});
