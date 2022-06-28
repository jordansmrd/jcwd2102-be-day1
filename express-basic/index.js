const express = require("express");
const app = express();

app.use(express.json());

const PORT = 2000;

const users = [
  {
    id: 1,
    username: "udin",
    email: "udin@mail.com",
  },
  {
    id: 2,
    username: "steven",
    email: "steven@mail.com",
  },
  {
    id: 3,
    username: "ujang",
    email: "ujang@mail.com",
  },
];

app.get("/", (req, res) => {
  res.send("this is express");
});

app.get("/users", (req, res) => {
  let qparam = req.query.username;
  console.log(qparam);
  tempUsers = users;
  if (qparam) {
    tempUsers = tempUsers.filter((val) => {
      return val.username == qparam;
    });
  }

  res.status(200).json({
    message: "user fetched",
    result: tempUsers,
  });
});

app.post("/users", (req, res) => {
  const data = req.body;

  console.log(data);
  if (!data.username) {
    res.status(400).json({
      message: "insert the username",
    });
  }
  users.push(data);

  res.status(201).json({
    message: "user added",
    result: data,
  });
});

app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;

  const findIndex = users.findIndex((val) => {
    return val.id == userId;
  });
  console.log(findIndex);

  if (findIndex == -1) {
    res.status(400).json({
      message: `user id ${userId} not found`,
    });
    return;
  }

  users.splice(findIndex, 1);

  res.status(200).json({
    message: "user deleted",
  });
});

app.listen(PORT, () => {
  console.log("server running in port ", PORT);
});
