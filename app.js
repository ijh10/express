import express from "express";
import employees from "#db/employees";

const server = express();

// port is the location on someones computer where an application is living.
const port = 3000;

// serve client request
server.get("/", async (req, res) => {
  res.send("Hello employees!");
});
// req = request and res = response

server.get("/employees", async (req, res) => {
  res.send(employees);
});
server.get("/employees/random", async (req, res) => {
  const random = Math.floor(Math.random() * 10);
  const found = employees[random];
  res.send(found);
});
// express runs and these are called "route handlers" all the servers.get are route handlers. its listening for them. it runs them from top to bottom order
server.get("/employees/:id", async (req, res) => {
  // :id = its dynamic meaning we need to pull off the real vaule of the id
  const id = req.params.id;
  // params modifed the request. we are trying to get a single employee but we need to modify it
  // whenever we see : we will need to use params
  const found = employees.find((employee) => {
    //the id param is a string but we need to find the id of the employee which is a number. we need to convert the string to a number
    return employee.id === parseInt(id);
  });
  if (found) {
    res.send(found);
  } else {
    res.status(404);
    res.send("not working");
  }
});
server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
export default server;
