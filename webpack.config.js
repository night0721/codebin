module.exports = {
  target: "webworker",
  entry: "pages/index.js",
  externals: ["child_process", "dns", "fs", "net", "tls"],
};
