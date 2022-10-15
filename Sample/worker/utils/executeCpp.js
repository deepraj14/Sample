const { exec } = require("child_process"); //TODO: use spawn

// *** Execute the generated Python file *** //
const executeCpp = (job) => {
  return new Promise((resolve, reject) => {
    exec(
      `g++ ./temp/${job.folder_name}/Main.cpp -o ./temp/${job.folder_name}/a && sudo -u executionuser "./temp/${job.folder_name}/a" < ./temp/${job.folder_name}/input.txt`,
      { timeout: job.timeout },
      (error, stdout, stderr) => {
        if (stderr) {
          reject({ stderr, stdout });
        }
        if (error) {
          reject({ error });
        }
        resolve({ stderr, stdout });
      }
    );
  });
};

module.exports = { executeCpp };
