const express = require('express')
const {Pool}  = require('pg')
const app = express()
app.use(express.json())

const pool = new Pool({host:"localhost",
                        user:"susanamunoz",
                        database:"vespertino"})

app.get('/api/v1/productos', async(req,res)=>{
 const resultado = await pool.query("select * from productos");
 res.json(resultado.rows)
})

app.post('/api/v1/productos', async(req,res)=>{
    const {nombre, categoria, cantidad} = req.body
    await pool.query('insert into productos (nombre, categoria, cantidad) values($1,$2,$3)',[nombre, categoria, parseInt(cantidad)])
    const resultado = await pool.query("select * from productos");
    res.json(resultado.rows)
})

app.put('/api/v1/productos/:id', async(req,res)=>{
    const {id} =  req.params
    const {nombre, categoria, cantidad} = req.body
    await pool.query('update  productos set nombre=$1, categoria=$2, cantidad=$3 where id=$4',[nombre, categoria, parseInt(cantidad), parseInt(id)])
    const resultado = await pool.query("select * from productos");
    res.json(resultado.rows)
})
app.listen(4000)