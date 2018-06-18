const myFunc = require('./libs/myFunc');
const crypto = require("crypto");
const fs = require("fs");

const cliFunc = {
    "key:generate": () => {
        crypto.randomBytes(48, (err, buffer) => {
            let content = require("./config/app.json");
            content.appKey = buffer.toString('hex');
            fs.writeFileSync("./config/app.json", JSON.stringify(content));
        });
    },
    "port:config": (port) => {
        let content = require("./config/app.json");
        content.port = port;
        fs.writeFileSync("./config/app.json", JSON.stringify(content));
    }
}

let func = '';
let params = [];
process.argv.forEach((val, index) => {
    if (index == 2) {
        func = val;
    }
    else if (index > 2) {
        params.push(val);
    }
});

if (!myFunc.isEmpty(cliFunc[func])) {
    cliFunc[func](...params);
} 