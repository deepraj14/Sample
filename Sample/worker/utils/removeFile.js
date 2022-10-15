const fs = require("fs");

if (!fs.existsSync("./temp")) {
  fs.mkdirSync("./temp");
}

const deleteFile = (job) => {
  if (fs.existsSync(`./temp/${job.folder_name}`)) {
    fs.rmSync(`./temp/${job.folder_name}`, { recursive: true });
  }
};

module.exports = { deleteFile };
