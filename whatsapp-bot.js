const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Crear una nueva instancia del cliente con opciones mejoradas
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Manejar errores de conexión
client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
    console.log('Intentando reconectar...');
});

// Generar el código QR para conectar
client.on('qr', (qr) => {
    console.log('Escanea este código QR con tu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Cuando el cliente está listo
client.on('ready', () => {
    console.log('¡Cliente WhatsApp conectado exitosamente!');
});

// Manejar mensajes entrantes
client.on('message', async (message) => {
    try {
        // Ignorar mensajes del sistema
        if (message.from === 'status@broadcast') return;

        // Obtener el contenido del mensaje en minúsculas
        const mensaje = message.body.toLowerCase();

        // Respuestas automáticas basadas en palabras clave
        let respuesta = '';

        if (mensaje.includes('hola') || mensaje.includes('buenos días') || mensaje.includes('buenas')) {
            respuesta = '¡Hola! Soy un bot automático. ¿En qué puedo ayudarte?';
        } else if (mensaje.includes('precio') || mensaje.includes('costo')) {
            respuesta = 'Los precios varían según el producto. Por favor, visita nuestra página web para más información.';
        } else if (mensaje.includes('horario') || mensaje.includes('atención')) {
            respuesta = 'Estamos disponibles de lunes a viernes de 9:00 AM a 6:00 PM.';
        } else if (mensaje.includes('gracias')) {
            respuesta = '¡Gracias por contactarnos! Si necesitas más ayuda, no dudes en preguntar.';
        } else {
            respuesta = 'Gracias por tu mensaje. Un agente te responderá pronto.';
        }

        // Enviar la respuesta
        await message.reply(respuesta);
    } catch (error) {
        console.error('Error al procesar el mensaje:', error);
    }
});

// Manejar errores generales
client.on('auth_failure', (error) => {
    console.error('Error de autenticación:', error);
});

// Iniciar el cliente
try {
    client.initialize();
    console.log('Iniciando el bot de WhatsApp...');
} catch (error) {
    console.error('Error al inicializar el cliente:', error);
} 