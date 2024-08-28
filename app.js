import  express  from "express";
import bodyParser from "body-parser";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
  res.render('home', { posts: posts });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/new', (req, res) => {
    res.render('new');
  });
  
app.post('/new', (req, res) => {
    const post = {
      id: Date.now().toString(),
      title: req.body.title,
      content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
  });

app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render('edit', { post: post });
  });
  
app.post('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
  });
  
app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect('/');
  });
  