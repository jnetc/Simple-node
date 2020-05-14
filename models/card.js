const Model = require('./model')

class Card extends Model {

  async addToCard(obj) {
      // Get all courses
    const data = await this.getAll()

      // Find current course
    const card = data.find(c => c.id === obj.id)
      // Check for card
    if (!card) {
        // Add new card
      obj.count = 1
      obj.total = +obj.price
      data.push(obj)
    } else {
        // Add +1 / total 
      card.count++
      card.total += +card.price
    }
      // Save to file
    await this.save(data)
  }

  async delFromCard(id){
      // Get all courses
    const data = await this.getAll()
      // Find by index
    const idx = data.findIndex(i => i.id === id)
    
    if (data[idx].count > 1) {
        // Subtract count / total
      data[idx].count--
      data[idx].total -= +data[idx].price
    } else {
        // Delete course from card
      data.splice(idx, 1)
    }
      // Save to fail
    await this.save(data)
  }
}
module.exports = new Card('card.json')