const app = require('./app');

//accdemos al archivo dentro de la carpeta
require('./firebase')

//settings
app.listen(app.get('port'));
console.log('Server on port: ', app.get('port'))

