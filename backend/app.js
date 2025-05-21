const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes/routes');

app.use(express.json()); 
app.use(cors());
app.use('/api', routes);

app.listen(3000, () => {
    console.log('API is running on port 3000');
});
