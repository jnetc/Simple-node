const fs      = require('fs')
const crypto  = require('crypto')

  // Use fs promises for asynchronously
const fsPromises = fs.promises

module.exports = class Model {
  constructor(file) {
      // Check filename
    if (!file) {
      console.log('Add filename');
      return
    }
    this.file = file
      // Checkin for access to file
    try {
      fs.accessSync(`./data/${this.file}`)
    } catch (error) {
      fs.writeFileSync(`./data/${this.file}`, '[]')
    }
  }

    // Add inputs values to file
  async add(obj) {
    obj.id = this.randomId()
    const data = await this.getAll()
    data.push(obj)
    await this.save(data)
  }
  
    // Get all data from file
  async getAll() {
    const data = await fsPromises.readFile(`./data/${this.file}`, {encoding: 'utf8'})
    return JSON.parse(data)
  }

    // Save data to file
  async save(data) {
    await fsPromises.writeFile(`./data/${this.file}`, JSON.stringify(data, null, 2))
  }

    // Remove data from file
  async delete(id) {
    const data = await this.getAll()
    return data.filter(item => item.id !== id)
  }

    // Get course by ID
  async getByID(id){
    const data = await this.getAll()    
    return data.find(item => item.id === id)
  }

    // Edit course
  async edit(id, obj){
      // Get all data
    const data = await this.getAll()   
      // Find by ID object 
    const course = data.find(item => item.id === id)
      // Update in corrent object data
    Object.assign(course, obj)
      // Save updated data
    await this.save(data)
  }

    // Generate random ID
  randomId () {
    return crypto.randomBytes(10).toString('hex')
  }
}