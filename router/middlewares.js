const fs = require('fs')

module.exports = {
  checkfile (file)  {
    return (req, res, next) => {
      const check =  fs.access(`./data/${file}`, (err) => console.log(err))
      if (!check) {
         fs.writeFile(`./data/${file}`, '[]', (err) => console.log('File created!'))
      }
      next()
    }
  }
}