const mongoose = require('mongoose');
 
if (process.argv.length < 3) {
  console.error('Por favor, proporciona la contraseña como argumento: node mongo.js <password>');
  process.exit(1);
}
 
const password = process.argv[2];
const url= `mongodb+srv://620131017:${password}@cluster0.ulzhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose
  .connect(url)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  });
 
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});
 
const Contact = mongoose.model('Contact', contactSchema);
 
if (process.argv.length === 3) {
  Contact.find({})
    .then((contacts) => {
      console.log('Phonebook:');
      contacts.forEach((contact) => {
        console.log(`${contact.name} ${contact.number}`);
      });
    })
    .catch((error) => {
      console.error('Error al recuperar los contactos:', error.message);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}
 
if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
 
  const contact = new Contact({ name, number });
 
  contact
    .save()
    .then(() => {
      console.log(`added ${name} ${number} to phonebook`);
    })
    .catch((error) => {
      console.error('Error al guardar el contacto:', error.message);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}
 
if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.error('Uso incorrecto del programa. Ejemplos:');
  console.error('  Para listar contactos: node mongo.js <password>');
  console.error('  Para agregar un contacto: node mongo.js <password> <name> <number>');
  process.exit(1);
}