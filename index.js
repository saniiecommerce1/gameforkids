// const prompt = require('prompt-sync')({sigint: true});

const ice = document.getElementById('ice')
const child = document.getElementById('child')

const fire = document.getElementsByClassName('fire')[0]
let block = document.getElementsByClassName('block')[0]
const cross = document.getElementsByClassName('cross')[0]
const box = document.getElementsByClassName('box')[0]

//generate the random pattern
const field = [fire,  block, block, block, block,block,fire, block, block, block, block,block ]

const assignField = [[child], [fire],[], [undefined, fire , undefined, ice]]

for (let item of field) {
  for (let i = 10; i > 0; i++) {
    let randX = Math.floor(Math.random() * 4)
    let randY = Math.floor(Math.random() * 4)


    if (assignField[randX][randY] === undefined) {

      assignField[randX][randY] = (item)
      break;
    }
  }
}


console.log(assignField)

// blockClone = block.cloneNode(true);  //only create one clone 

// box.appendChild(blockClone)

// blockClone = block.cloneNode(true);  //

// box.appendChild(blockClone)  //this way can append multiple same html node

class Field {
  constructor(field) {
    this.field = field
    this.x = this.y = this.prevX = this.prevY = 0
  }


  game(move) {

    if (move === 'd') {

      this.x++;
      this.checkOutBox()
    }

    if (move === 'u') {

      this.x--;
      this.checkOutBox()
    }

    if (move === 'r') {

      this.y++;
      this.checkOutBox()
    }

    if (move === 'l') {

      this.y--;
      this.checkOutBox()
    }

  }

  checkOutBox() {

    let xCheck = (this.x >= 0) && (this.x < this.field.length)
    let yCheck = (this.y >= 0) && (this.y < this.field.length)

    if (xCheck && yCheck) {
      this.checkGameStatus()
    }

    else {

      document.getElementById('game').innerHTML = ("You Moved Out Of The Box")
      this.end()

    }
  }



  checkGameStatus() {

    if (this.field[this.x][this.y].id === 'ice') {
      document.getElementById('game').innerHTML = ("You Won, Finally Enjoyed The IceCream")
      this.field[this.prevX][this.prevY] = cross.cloneNode(true)
      this.field[this.x][this.y] = child
      this.end()
    }

    else if (this.field[this.x][this.y].className === 'fire bg-sky-300 p-2') {
      document.getElementById('game').innerHTML = ("Sorry, You Have Fallen into The fire")
      this.field[this.prevX][this.prevY] = cross.cloneNode(true)
      this.field[this.x][this.y] = child
      this.end()
    }

    else {

      this.field[this.prevX][this.prevY] = cross.cloneNode(true)
      this.field[this.x][this.y] = child

      this.prevX = this.x
      this.prevY = this.y

      console.log(this.field)
    }
  }

  end() {
    const buttonIds = ['left', 'right', 'up', 'down']
    for (let buttonId of buttonIds) {
      document.getElementById(buttonId).disabled = true
      document.getElementById(buttonId).style.opacity = 0.5
    }
    this.x = this.y = this.prevX = this.prevY = 0
  }

  print() {

    box.innerHTML = ''
    this.field = this.field.map((elemArray => {
      const cloneElemArray = elemArray.map(elem => {
        const cloneElementHtml = elem.cloneNode(true)
        box.appendChild(cloneElementHtml)
        return cloneElementHtml;
      })

      return cloneElemArray;

    }))

    console.log(this.field)
  }

}

// const myField = new Field(cloneAssignField);
const myField = new Field(assignField);
myField.print()


//click handler
function moveNavigate(move) {
  myField.game(move)
  myField.print()
}












