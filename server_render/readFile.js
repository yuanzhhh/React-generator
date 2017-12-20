const fs = require('fs');

module.exports = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) reject(err);

        resolve(data);
    });
})