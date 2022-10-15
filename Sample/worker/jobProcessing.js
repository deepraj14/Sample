const { createFile } = require("./utils/generateFile");
const { executePy } = require("./utils/executePy");
const { executeJava } = require("./utils/executeJava");
const { executeCpp } = require("./utils/executeCpp");
const { executeJs } = require("./utils/executeJs");
const fs = require("fs");
const { setEx } = require("./redis-worker.js");

async function processJob(job) {
  console.log(`Processing ${job.folder_name}`);

  // *** Create code and input files *** //
  try {
    createFile(job);
  } catch (err) {
    setEx(job.folder_name, `{"stderr":"Internal Server Error","stdout":""}`);
    console.log(
      `Error while creating files, JobId: ${job.folder_name}, Error: ${err}`
    );
  }

  // *** Execute the generated file *** //
  // *** This output returns a promise :-
  //     It is only resolved on a successful and correct code exection.
  //     It is rejected in case there user submits an incorrect/buggy code.
  //     It is also rejected in case of any Internal Server Issue (Like python not installed) *** //
  let output;
  try {
    if (job.language === "py") {
      output = await executePy(job);
    } else if (job.language === "cpp") {
      output = await executeCpp(job);
    } else if (job.language === "java") {
      output = await executeJava(job);
    } else if (job.language === "js") {
      output = await executeJs(job);
    } else {
      output = {
        stderr: "Language is not supported",
        stdout: "",
      };
    }
    // *** If is it correctly resolved, output contains the output of the code *** //
  } catch (err) {
    // *** In case it is rejected, we check if it is because of an incorrect code submission *** //
    if (err.stderr) {
      output = err;
    } else {
      // *** We have to check if the length of output exceeds the max. buffer length, we'll use spawn later for infinite buffer length. *** //
      if (err.error instanceof RangeError) {
        output = {
          stderr: "Your Output is too long.!!",
          stdout: "",
        };
      } else if (err.error.signal == "SIGTERM") {
        // *** If its timeout error, return Your Code took too long to execute *** //
        output = {
          stderr: "Your code took too long to execute.!!",
          stdout: "",
        };
      } else {
        // *** Catch any other internal server error *** //
        console.log(`Error while file execution: ${err.error}`);
        output = {
          stderr:
            "Internal Server Error, maybe the required language isn't installed on the server",
          stdout: "",
        };
      }
    }
  } finally {
    output = JSON.stringify(output);
    setEx(job.folder_name, output);
    fs.writeFileSync(`./temp/${job.folder_name}/output.txt`, output);
  }
}

module.exports = { processJob };
