const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const factoryRoutes = require('./routes/factoryRoutes');
const chocolateRoutes = require('./routes/chocolateRoutes');
const cartRoutes = require('./routes/cartRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const imagesPath = path.join(__dirname, 'images');
console.log(`Serving images from ${imagesPath}`);
app.use('/images', express.static(imagesPath));

app.use('/api', factoryRoutes);
app.use('/api', chocolateRoutes);
app.use('/api', cartRoutes);
app.use('/api', commentRoutes); 
app.use('/api', userRoutes); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
