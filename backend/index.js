const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger/swaggerConfig');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const commentRoutes = require('./routes/comment.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', commentRoutes);

// UP
app.get('/api/up', (req, res) => {
  res.send("Backend Node.js avec Express et PostgreSQL up");
});

app.listen(3001, () => {
  console.log('✅ Serveur démarré : http://localhost:3001');
  console.log('📚 Swagger : http://localhost:3001/api-docs');
});
