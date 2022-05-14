const os = require('os')

const user = os.userInfo()

const all = os.networkInterfaces()

console.log(user)
console.log(all)
console.log(os.uptime())
console.log(os.arch())
console.log(os.cpus())
console.log(os.EOL)