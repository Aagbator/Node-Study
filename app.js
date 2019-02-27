const http = require('http');
const path = require('path');
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts', 
    defaultLayout:'main-layout', 
    extname: 'hbs'}));
app.set('view engine', 'hbs'); 
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((res, req, next) => {
    // req.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    req.status(404).render('404',{pageTitle: 'Page Not Found'});
});


// const server = http.createServer(app);
// server.listen(3200);

app.listen(3200);