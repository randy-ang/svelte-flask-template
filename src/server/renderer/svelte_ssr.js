let input = "";

process.stdin.on("data", function (data) {
  input += data.toString();
});

process.stdin.on("end", function () {
  const App = require("./build/App");
  const output = App.render(JSON.parse(input));
  process.stdout.write(JSON.stringify(output));
  process.stdout.end();
});
