const express = require('express');
const app = express();
const fetchUser = require('./middleware/fetchUser');

const port = 8000; // Change this to the desired port number
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const jwt = require('jsonwebtoken');
const JWT_SECRET = "bhushanlinalmanasiniket";

require('./db/conn');
const User = require('./models/dbmodel');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// --------------- Register new user ------------------
app.post('/register', async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        console.log("itheeee");
        return res.json({ error: 'Please fill all details' });
    }

    try {
        const isEmailExist = await User.findOne({ email: email });

        if (isEmailExist) {
            return res.json({ success: "false", error: "Email already exist" });
        }

        const user = new User(req.body);

        // <---- pre method will run here as a middleware before save to decrypt password----> 

        await user.save();

        res.json({ success: "true" });        // This returns to json variable of 'signup.jsx' as a response if user registered successfully

    } catch (error) {
        res.json({ error });
    }
})

// --------------- Login existing user ------------------
app.post("/signin", async (req, res) => {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ error: "Please fill all details" });
    }

    try {
        const isValidEmail = await User.findOne({ email });

        // if email entered by user is INVALID
        if (!isValidEmail) {
            return res.json({ success: "false", error: "Invalid Credentials from backend" });
        }
        else {
            if (password != isValidEmail.password) {
                return res.json({ success: "false", error: "Invalid Credentials" });
            }

            let tokenCreated = jwt.sign({ _id: isValidEmail._id }, JWT_SECRET);
            res.json({ success: "true", token: tokenCreated });
        }
    } catch (error) {
        console.log("hiaihai", error);
        res.json({ error: error });
    }
})

app.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const userId =  req.user._id;    
        // console.log("app.js", userId);
        const user = await User.findById({_id:userId});
        // console.log(user.firstname);
        res.send(user);
    } catch (error) {

    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// ---------------------------------------
