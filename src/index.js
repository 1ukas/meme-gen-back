'using strict'
const express = require('express');
const cors = require('cors');
const path = require('path');
const expressFormidable = require('express-formidable');

const app = express();

const memeData = require('./routes/memeData');

app.use(cors());
app.use(expressFormidable());
app.use(express.static(path.join(__dirname, 'public')));

app.use(memeData);

// Handle 404:
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.info(`Server is running on port: ${PORT}`));