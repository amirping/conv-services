const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('server up'))

app.get('/service_1', (req, res) => {

  const units = ['l','dl','cl','ml']
  const fromU = req.query.fromU
  const toU = req.query.toU
  let quantity = req.query.quantity

  // test for quanity 
  if(quantity.includes('/')){
    const numbers = quantity.split('/');
    let newQ = numbers[0] / numbers[1]
    quantity = newQ
  }

  if(fromU && toU.length && quantity){
    if(units.includes(fromU) && units.includes(toU) && !isNaN(quantity)){

      let cof = 1

      const indexOfFrom = units.indexOf(fromU)
      const indexOfTo = units.indexOf(toU)

      let multiple = Math.abs(indexOfFrom - indexOfTo)

      if(indexOfTo < indexOfFrom ){
        while(multiple != 0){
          if(multiple === 1) {
            cof = '0.'+ cof
          }
          else{
            cof = '0' + cof 
          }

          multiple--
        }
      }
      else{
        while (multiple != 0){
          cof += '0'
          multiple--
        }
      }

      res.json(
        { 
          status: true,
          value: quantity * cof,
          
        }
      )
    }
    else{
      res.json({
        status:false,
        messae:'invalid arg'
      })
    }
  } else {
      res.json({
        status:false,
        message:'missing arg'
      })
    }

})

app.get('/service_2', (req, res) => {

  res.json(
      { success }
    )
})

app.get('/service_3', (req, res) => {

  res.json(
      { success }
    )
})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
