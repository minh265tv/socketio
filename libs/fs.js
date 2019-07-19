const fs = require('fs');
const path = require('path');

module.exports = {
    find: (dir, file) => {
        let data = fs.readFileSync(path.join(dir, file));
        return JSON.parse(data);
    },
    write: (dir, file, data) => {
        let res = JSON.stringify(data);
        fs.writeFileSync(path.join(dir, file), res);
    }
}