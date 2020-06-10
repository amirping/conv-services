const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

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
        message:'invalid arg'
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
  const units = ['g','ml']
  const material = ['sucre','farine ordinaire','maizena','riz','couscous','cacao','amande poudre','noix de coco rapee']
  
  const quantity = parseInt(req.query.quantity)
  const toMaterial = req.query.toMaterial

  const possibleQuantity = [25,50,100,150,200,250,500];

  const concersionDictionary = {
    'sucre' : [
      20,
      45,
      90,
      135,
      180,
      225,
      450,
    ],
    'farine ordinaire' : [13,25,50,75,100,125,250],
    'riz' : [20,45,90,135,180,225,450],
    'maizena' : [11,22,45,70,90,115,230],
    'couscous' : [20,40,80,120,160,200,400],
    'cacao' : [12,25,50,75,100,125,250],
    'amande poudre' :[12,25,50,75,100,125,250],
    'noix de coco rapee' : ['',20,40,60,80,100,200]
  }

  if (quantity && toMaterial && possibleQuantity.includes(quantity) && material.includes(toMaterial)) {
    const indexQuantity = possibleQuantity.indexOf(quantity)
    const value  = concersionDictionary[toMaterial][indexQuantity]
    res.json({
      value:value,
      status:true
    })
  } else {
    res.json({
      message:'missing or invalid arguments',
      status: false
    })
  }
})

app.get('/service_3', (req, res) => {

  const units = ['humain','cl','ml']
  const fromU = req.query.fromU
  const toU = req.query.toU
  let quantity = req.query.quantity

  // test for quanity 
  if(quantity.includes('/')){
    const numbers = quantity.split('/');
    let newQ = numbers[0] / numbers[1]
    quantity = newQ
  }

  const dico = [
    {humain:'1 pincee',cl:'','ml':1},
    {humain:'1/2 cuil a cafe',cl:'','ml':2},
    {humain:'1 cuil a cafe',cl:0.5,'ml':5},
    {humain:'1 cuil a dessert',cl:1,'ml':10},
    {humain:'1 cuil a soupe',cl:1.5,'ml':15}
  ]


  if(fromU && toU.length && quantity){
    if(units.includes(fromU) && units.includes(toU)){
      const rowExact = dico.filter((x) => x[fromU] == quantity)
      if(rowExact.length > 0){
        const val  = rowExact[0][toU]
        res.json(
          {
            status:true,
            value:val
          }
        )
      }
      else{
        res.json(
          {
            status:false,
            message:'Converting error'
          }
          )
      }
      
    }
    else{
      res.json(
        {
          status:false,
          message:'invalid arguments'
        }
      )
    }
  }
  else {
      res.json(
        { 
          message:'missing arguments',
          status: false
        }
      )
    }

})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
