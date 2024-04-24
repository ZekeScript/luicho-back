const { existsSync, promises } = require('fs')

class UserManager {
  constructor (path) {
    this.path = path
  }

  async getUsers () {
    try {
      if (existsSync(this.path)) {
        const users = await promises.readFile(this.path, 'utf8')
        return JSON.parse(users)
      } else {
        return []
      }
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async createUser (user) {
    try {
      const users = await this.getUsers()
      const updatedUsers = [...users, user]
      await promises.writeFile(this.path, JSON.stringify(updatedUsers))
    } catch (error) {
      console.log(error)
    }
  }

  // TODO: made a delete function
}

const userManager = new UserManager('./users.json')

const user1 = {
  fistname: 'Juan',
  lastname: 'Perez'
}

const user2 = {
  fistname: 'Pedro',
  lastname: 'Gomez'
}

const test = async () => {
  console.log(await userManager.getUsers())
  await userManager.createUser(user1)
  await userManager.createUser(user2)
  console.log(await userManager.getUsers())
}

test()
