const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://mongodb:27017/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session Configuration
const sessionSecretKey = '2f83d650e8de84cf5f390c1a0769e1663de8362c9772df22de1c258cbfc23dc5'; // Replace with your generated secret key

app.use(
  session({
    secret: sessionSecretKey,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://mongodb:27017/expense-tracker', // Replace with your MongoDB connection string
      collection: 'sessions',
    }),
  })
);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user._id;
      res.redirect('/dashboard');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }

  // Render the dashboard.html page or implement your logic here

  // Example:
  res.sendFile(__dirname + '/views/dashboard.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

