const express = require('express');
const app = express();
const path = require('path');
const Swal = require('sweetalert2')
const bcryptjs = require('bcryptjs');
const connection = require('./db/database');
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');


const session = require('cookie-session');
app.use(session({
    secret: 'jC?p7nh9RMaCHEYS8igQdwPdTFUq7OjV9c-OPo!-K0ESeJGoR!BYND9V8J!UsJULcwvAs9Gq-MT',
    resave: true,
    saveUninitialized: true
}));

app.listen(PORT, () => {
    console.log('EL SERVIDOR ESTA CORRIENDO EN EL PUERTO ' + PORT);
});

//GET Methods
app.get('/', (req, res) => {
    if (req.session.sessionStarted) {
        res.render('index', {
            login: true,
            name: req.session.nameUser
        });
    } else {
        res.render('index', {
            login: false,
            name: 'Iniciar sesión'
        });
    }
    res.end();
});

app.get('/smartphones', (req, res) => {
    res.render('smartphones');
});

app.get('/nosotros', (req, res) => {
    res.render('nosotros');
});

app.get('/contacto', (req, res) => {
    res.render('contacto');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

//POST Methods
app.post('/registration-user', async (req, res) => {
    const { nameBody, usernameBody, mailBody, addressBody, passwordBody } = req.body;
    let passwordHash = await bcryptjs.hash(passwordBody, 8);
    connection.query('INSERT INTO users SET ?', { 
        name: nameBody, 
        username: usernameBody, 
        mail: mailBody, 
        address: addressBody, 
        password: passwordHash 
    }, (error, results) => {
        if (error) {
            res.json({ success: false, message: "Error durante el registro. Inténtalo nuevamente." });
        } else {
            res.json({ success: true, message: "Registro exitoso", redirect: "/" });
        }
    });
});

app.post('/verification-user', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        connection.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
            if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
                res.json({ success: false, message: "Usuario y/o contraseña incorrectos" });
            } else {
                req.session.sessionStarted = true;
                req.session.nameUser = results[0].username;
                req.session.idUsername = results[0].id_user;
                res.json({ success: true, message: "Inicio de sesión exitoso", redirect: "/" });
            }
        });
    } else {
        res.json({ success: false, message: "Ingrese un usuario y contraseña" });
    }
});

//session-out
app.get('/logout', (req, res) => {
    req.session = null;
    res.json({ success: true, message: "Se cerró tu sesión", redirect: "/" });
});
