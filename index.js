const dns = require("dns-socket");
const async = require("async");

const defaults = {
  timeout: 10000,
  server: "208.67.222.222",
  port: 53,
};

function queryFactory(domain, socket, opts) {
  return function query() {
    return new Promise(function(resolve, reject) {
      socket.on("error", e => {
        reject(e);
      });
      socket.query({
        questions: [{
          type: "TXT",
          name:  domain + ".contacts.abuse.net",
        }]
      }, opts.port, opts.server, function(err, res) {

        if (err) return reject(err);
        if(res.answers.length === 0) return resolve(false);

        let abusenet = res.answers[0].data.toString();
        resolve(true);

      });
    });
  };
}

module.exports.lookup = (addr, opts) => {
  opts = Object.assign({}, defaults, opts);
  const socket = dns({timeout: opts.timeout});
  return queryFactory(addr, socket, opts)().then(result => {
    socket.destroy();
    return JSON.stringify(result);
  });
};