const ping = require("ping");
const axios = require("axios");

const apiUrl = "https://isp-monitoring-48ee36e4594e.herokuapp.com/monitor";
// const apiUrl = "http://localhost:3000/monitor";
// Define an array of DNS server hostnames or IP addresses to ping
const GOOGLE = {
  serverName: "Google",
  server: "8.8.8.8",
};
const OPEN_DNS = {
  serverName: "OpenDNS",
  server: "8.8.4.4",
};
const CLOUDFLARE = {
  serverName: "Cloudflare",
  server: "1.1.1.1",
};
const QUAD9 = {
  serverName: "Quad9",
  server: "9.9.9.9",
};

const dnsServers = [GOOGLE, OPEN_DNS, CLOUDFLARE, QUAD9];

// Ping all DNS servers in parallel
async function pingAllDnsServers() {
  const pingPromises = dnsServers.map(async ({ server, serverName }) => {
    try {
      const res = await ping.promise.probe(server);
      console.log(res);
      return { server, serverName, alive: res.alive, responseTime: res.time, errorMsg: "" };
    } catch (error) {
      return { server, serverName, alive: false, errorMsg: error.message };
    }
  });

  const results = await Promise.all(pingPromises);

  const postData = results?.reduce(
    (acc, { serverName, alive, errorMsg }) => {
      acc[serverName] = { alive: alive ? 1 : 0, errorMsg };
      return acc;
    },
    {
      timeStamp: Date.now(),
    }
  );

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
}

// Call the function to ping all DNS servers concurrently
pingAllDnsServers();
