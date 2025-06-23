require('dotenv').config();
const express           = require('express');
const bodyParser        = require('body-parser');
const cors              = require('cors');
const path              = require('path');

const authRoutes        = require('./routes/authRoutes');
const postRoutes        = require('./routes/postRoutes');
const userRoutes        = require('./routes/userRoutes');
const commentRoutes     = require('./routes/commentRoutes');
const { authenticateToken } = require('./middleware/auth');
const followRoutes      = require('./routes/followRoutes');
const likeRoutes        = require('./routes/likeRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve uploads (profile pics, post images)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// public auth
app.use('/auth', authRoutes);

// protected posts API
app.use('/api/posts', authenticateToken, postRoutes);

app.use('/api/comments', commentRoutes);

app.use('/api/likes', likeRoutes);

// protected users API
app.use('/api/users', authenticateToken, userRoutes);

app.use('/api/follows', followRoutes);

app.use('/api/news', newsRoutes);

// -----------------------------------------
process.setMaxListeners(20);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
