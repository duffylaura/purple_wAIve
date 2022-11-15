const path = require("path");

//instanciate and new instance of express and require it here
const express = require("express");
//instanciate and new instance of express-session and require it
const session = require("express-session");

const exphbs = require("express-handlebars");

// Create a new sequelize store using the express-session package so we can store session data so user can stay logged
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();

//This uses varibale allows us to use  Heroku's process.env.PORT value when deployed and 3001 when run locally.
const PORT = process.env.PORT || 3001;

//including session info to create session id that persisests and contains info if user has logged in or not.it allows use to store user info that is asscoiated with the users session id and it persists as log as the browser is open, but when they user closes the browser and new session object is created. this object is the session storage object
const sess = {
    secret: "Super secret secret",
    //cookie is set to an empty object so we can store data in it
    cookie: {},
    ////Forces the session to be saved back to the session store, even if the session was never modified during the request.
    resave: false,
    //save unitialized is to prevent object objects from being saved by people who just visit site and not login
    saveUninitialized: true,
    //sequelize store npm packagestoring the cookies info into the database so that it remebers if the user is loggedin. so allows the loggin in status to persist even after browser close.
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

//equipping handlebars with our helper function
const hbs = exphbs.create({ helpers });

//equipping app with handlebars template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//cloudinary
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dbjhly3lm',
    api_key: '715498181786272',
    api_secret: 'j8EFe2UdyYyud04oilZC7ex0xEw'
});

//middleware to be used
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log(`now listening at http://localhost:${PORT}/`)
    );
});
