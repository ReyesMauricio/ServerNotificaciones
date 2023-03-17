require('dotenv').config()
const { Router } = require('express');
const admin = require('firebase-admin');
const router = Router()

function initFirebase(){
    const serviceAccount = require(__dirname + '/firebase.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase iniciado')
}

initFirebase()

function sendMessage(message){
    admin.messaging().send(message).then(response =>
    {
        console.log('Enviado exitosamente', response)
    }).catch(error =>
    {
        console.log("Error al enviar mensaje", error);
    })
}

function sendPushNotification(notification){
    const message = {
        topic: notification.topic,
        notification:
        {
            title: notification.titulo,
            body: notification.mensaje
        }
    }

    sendMessage(message)
}



router.get('/', (req, res) =>{
    res.render('index')
});

router.post('/send-notification', (req, res) =>{
    console.log(req.body);
    const notification = {
        topic: "test",
        titulo: req.body.titulo,
        mensaje: req.body.mensaje
    }
    sendPushNotification(notification);
    res.render('index')
})

module.exports = router;