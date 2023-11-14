const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./controllers/CategoriesController");
const articlesController = require("./controllers/ArticlesController");
//Template Engine
app.set('view engine', 'ejs');

//Static
app.use(express.static("public"));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database Connection
connection.authenticate().then(() => {
    console.log("Conexão feita com sucesso");
}).catch((error) => {
    console.log(error);
});

//Passando as rotas do controller de categorias sem usar prefixo (só a / mesmo).
app.use("/", categoriesController);

app.use("/", articlesController);


app.get("/", (req, res) => {
    res.render("index");
});

app.listen(8080, () => {
    console.log("O servidor está rodando! http://localhost:8080")
});