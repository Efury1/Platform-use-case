const { exec } = require("child_process");

const command = "sass src:dist --watch";

const sassProcess = exec(command);

sassProcess.stdout.on("data", (data) => {
  if (data.includes("Compiled")) {
    console.log(`✅ Success: ${data.trim()}`);
  } else {
    console.log(data.trim());
  }
});

sassProcess.stderr.on("data", (data) => {
  console.log(`❌ Failed: ${data.trim()}`);
});

sassProcess.on("close", (code) => {
  console.log(`Sass watch exited with code ${code}`);
});




