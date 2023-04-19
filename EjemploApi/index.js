const express = require("express");
const hbs = require("hbs");

var methodOverride = require('method-override')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method", { methods: ["GET"] }));
//Lectura de datos desde formularios

app.set("view engine", "hbs");
/* const pool = new Pool({host:"localhost",
                        user:"susanamunoz",
                        database:"vespertino"}) */

app.get("/", async (req, res) => {
  /*  const resultado = await pool.query("select * from productos"); */
  const resultado = await fetch("http://localhost:4000/api/v1/productos");
  const data = await resultado.json();
  res.render("index", { productos: data });
});

app.post("/", async (req, res) => {
  const { nombre, categoria, cantidad } = req.body;
  const cuerpo = { nombre: nombre, categoria: categoria, cantidad: cantidad }
  const resultado = await fetch("http://localhost:4000/api/v1/productos", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(cuerpo)
    
  });
  const data = await resultado.json();
  res.render("index", { productos: data });
  //await pool.query('insert into productos (nombre, categoria, cantidad) values($1,$2,$3)',[nombre, categoria, parseInt(cantidad)])
  //const resultado = await pool.query("select * from productos");
  //res.render("index",{"productos":resultado.rows})
});

app.delete("/:id", async(req,res)=>{
  const {id} = req.params
  await fetch(`http://localhost:4000/api/v1/productos/${id}`,
  {
    method: "delete",
    headers: { "Content-Type": "application/json" }
  });
  res.redirect("/");
})

app.put("/:id/:nombre/:categoria/:cantidad", async (req, res) => {
    console.log(req.params)
     const { id, nombre, categoria, cantidad } = req.params;
    const body = { nombre: nombre, categoria: categoria, cantidad: cantidad}
    const resultado = await fetch("http://localhost:4000/api/v1/producto/"+id, {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });
    const data = await resultado.json();
    res.render("index", { productos: data }); 
    //await pool.query('insert into productos (nombre, categoria, cantidad) values($1,$2,$3)',[nombre, categoria, parseInt(cantidad)])
    //const resultado = await pool.query("select * from productos");
    //res.render("index",{"productos":resultado.rows})
  });



app.listen(3000);
