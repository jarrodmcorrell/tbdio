const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Replace 'YOUR_MONGODB_CONNECTION_STRING' with your actual MongoDB connection string
const MONGODB_URI = 'YOUR_MONGODB_CONNECTION_STRING';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const CounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model('Counter', CounterSchema);

app.use(express.json());

app.get('/api/count', async (req, res) => {
  try {
    const counter = await Counter.findOne();
    res.json({ count: counter ? counter.count : 0 });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/increment', async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }

    counter.count += 1;
    await counter.save();

    res.json({ count: counter.count });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
    d