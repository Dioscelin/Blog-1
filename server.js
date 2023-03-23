const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definición del esquema de la publicación
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: true }
});

const Post = mongoose.model('Post', postSchema);

// Rutas de la aplicación
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index', { posts });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', upload.single('image'), async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    image: req.file.filename
  });

  await post.save();
  res.redirect('/');
});

// Configuración del servidor
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(3000, () => console.log('Servidor iniciado en el puerto 3000'));
