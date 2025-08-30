const express = require('express');
const morgan = require('morgan');
const app = express();
const COUNTRY_DATA = [
  {
  path: '/english',
  flagURL: '/images/english.png',
  alt: "US Flag",
  title: 'Go to US English site'
},
{
  path: '/french',
  flagURL: '/images/french.png',
  alt: 'Drapeau de la france',
  title: 'Aller sur le site français'
},
{
  path: '/serbian',
  flagURL: '/images/serbia.png',
  alt: "Застава Србије",
  title: 'Идите на српски сајт'
}];
const LANGUAGE_CODES = {
  english: 'en-US',
  french: 'fr-FR',
  serbian: "sr-Cryl-rs"
}

const PORT = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(morgan('common'));

app.locals.currentPathClass = (path, currentPath) => {
  return path === currentPath ? 'current' : '';
}

app.get('/', (req, res) => {
  res.redirect('/english');
});

app.get('/:lang', (req, res, next) => {
  let lang = req.params.lang
  let languageCode = LANGUAGE_CODES[lang]
  if (!languageCode) {
    next(new Error(`Language not supported: ${lang}`));
  } else {
    res.render(`hello-${lang}`, {
    countries: COUNTRY_DATA,
    language: languageCode,
    currentPath: req.path,
  });
  }
});

app.use((err, req, res, next) => {
  res.status(404).send(err.message)
})

app.listen(PORT, 'localhost', () => {
  console.dir(`Listening on port ${PORT}.`);
});