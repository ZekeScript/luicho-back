const fs = require('fs')

class UsersManager {
  constructor (path) {
    this.path = path
  }

  async getUsers () {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, 'utf8')
        return JSON.parse(users)
      } else {
        return []
      }
    } catch (error) {
      console.log(error)
    }
  }

  async createUser (user) {
    try {
      const users = await this.getUsers()
      users.push(user)
      await fs.promises.writeFile(this.path, JSON.stringify(users))
    } catch (error) {
      console.log(error)
    }
  }

  async deleteFile () {
    try {
      await fs.promises.unlink(this.path)
      console.log('File deleted')
    } catch (error) {
      console.log(error)
    }
  }
}

// TODO: made a delete function

const userMgr = new UsersManager('./users.json')

const user1 = {
  fistname: 'Juan',
  lastname: 'Perez'
}

const user2 = {
  fistname: 'Pedro',
  lastname: 'Gomez'
}

const test = async () => {
  console.log(await userMgr.getUsers())
  await userMgr.createUser(user1)
  await userMgr.createUser(user2)
  console.log(await userMgr.getUsers())
  // await userMgr.deleteFile()
}

test()
