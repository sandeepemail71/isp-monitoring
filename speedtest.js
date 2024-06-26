const axios = require("axios");
const { exec } = require("child_process");

const apiUrl = "https://isp-monitoring-48ee36e4594e.herokuapp.com/speedtest";

const commandToRun = "speedtest-cli --json";

exec(commandToRun, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }

  try {
    const results = JSON.parse(stdout);
    console.log(results);
    const downloadSpeedMbps = results.download / 1e6; // Convert from bits per second to Mbps
    const uploadSpeedMbps = results.upload / 1e6; // Convert from bits per second to Mbps

    console.log("Speed Test Results (Mbps):");
    console.log(`Download speed: ${downloadSpeedMbps.toFixed(2)} Mbps`);
    console.log(`Upload speed: ${uploadSpeedMbps.toFixed(2)} Mbps`);
    const postData = {
      timeStamp: Date.now(),
      clientName: "BLR_HOME",
      uploadSpeed: uploadSpeedMbps.toFixed(2),
      downloadSpeed: downloadSpeedMbps.toFixed(2),
    };

    axios
      .post(apiUrl, postData)
      .then((response) => {
        // Handle the response data here
        console.log("Response Data:");
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error.message);
      });
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError.message);
  }
});
