const http = require("http");
//require adalah import , didalam require itu adalah fromnya

const url = require("url");

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

const products = [
  {
    id: 1,
    product_name: "apel",
    category: "fruit",
  },
  {
    id: 2,
    product_name: "jeruk",
    category: "fruit",
  },
  {
    id: 3,
    product_name: "manggis",
    category: "fruit",
  },
];

http
  .createServer((req, res) => {
    const httpMethod = req.method;
    const parsedURL = url.parse(req.url, true);

    const path = parsedURL.path.split("/")[1];
    console.log(path);

    if (httpMethod == "GET") {
      if (path == "users") {
        res.write(JSON.stringify(users));
        res.end();
      } else if (path == "products") {
        res.write(JSON.stringify(products));
        res.end();
      }
    } else if (httpMethod == "POST" && path == "users") {
      let resData = "";
      req.on("data", (data) => {
        console.log(data.toString());
        resData += data;
        users.push(JSON.parse(resData));
      });
      res.statusCode = 201; //status code created
      res.end("data users added");
    } else if (httpMethod == "PATCH" && path == "users") {
      req.on("data", (data) => {
        const parsedData = JSON.parse(data);
        console.log(parsedURL);
        const id = parsedURL.path.split("/")[2];
        console.log(id);

        const findIndex = users.findIndex((val) => {
          return val.id == id;
        });

        if (findIndex == -1) {
          res.statusCode = 400; //bad request
          res.end("user id " + id + " not found");
          return;
        }

        users[findIndex] = {
          ...users[findIndex],
          ...parsedData,
        };

        console.log(users[findIndex]);
        res.end("data edited");
      });
    } else if (httpMethod == "DELETE" && path == "users") {
      const id = parsedURL.path.split("/")[2];
      const findIndex = users.findIndex((val) => {
        return val.id == id;
      });

      if (findIndex == -1) {
        res.statusCode = 400; //bad request
        res.end("user id " + id + " not found");
        return;
      }

      users.splice(findIndex, 1);
      res.end("data deleted");
    }
  })
  .listen(PORT, () => {
    console.log("server is running");
  });
