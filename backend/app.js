const express = require('express');
const app = express();
const routes = require('./src/routes/routes');

app.use(express.json()); 
app.use('/api', routes);

app.listen(3000, () => {
    console.log('API is running on port 3000');
});
