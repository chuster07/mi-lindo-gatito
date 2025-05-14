const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Crear una nueva instancia del cliente con configuración básica
const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
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
    console.log('1. Abre WhatsApp en tu teléfono');
    console.log('2. Ve a los tres puntos (⋮) o Configuración');
    console.log('3. Selecciona "WhatsApp Web"');
    console.log('4. Escanea el código QR que aparece abajo:');
    console.log('\n');
    qrcode.generate(qr, { small: false });
    console.log('\n');
});

// Cuando el cliente está listo
client.on('ready', () => {
    console.log('¡Cliente WhatsApp conectado exitosamente!');
});

// Manejar mensajes entrantes
client.on('message', async (message) => {
    try {
        console.log('Mensaje recibido:', message.body);
        console.log('De:', message.from);

        // Ignorar mensajes del sistema
        if (message.from === 'status@broadcast') {
            console.log('Mensaje del sistema ignorado');
            return;
        }

        // Obtener el contenido del mensaje en minúsculas
        const mensaje = message.body.toLowerCase();
        console.log('Mensaje procesado:', mensaje);

        // Respuestas automáticas basadas en palabras clave
        let respuesta = '';

        // Alimentación
        if (mensaje.includes('alimento') || mensaje.includes('alimentación') || mensaje.includes('comida') || mensaje.includes('dieta')) {
            respuesta = '¡Hola! La alimentación de los gatos es fundamental para su salud. Te recomiendo ofrecerles alimento balanceado de alta calidad, alternando entre comida seca y húmeda. Evita darles comida para perros, chocolate, cebolla, ajo o huesos. Si tienes dudas sobre marcas o tipos de dieta (natural, casera, BARF), ¡pregúntame!';
        }
        // Cuidados
        else if (mensaje.includes('cuidado') || mensaje.includes('higiene') || mensaje.includes('vacuna') || mensaje.includes('desparasitación')) {
            respuesta = 'El cuidado de tu gato incluye visitas regulares al veterinario, vacunación, desparasitación y una buena higiene. Es importante cepillar su pelaje, mantener limpia su caja de arena y ofrecerle juguetes para su bienestar mental. ¿Te gustaría consejos sobre algún aspecto en particular?';
        }
        // Juguetes/Juego
        else if (mensaje.includes('juguete') || mensaje.includes('juego') || mensaje.includes('rascador')) {
            respuesta = 'El juego es esencial para el desarrollo físico y mental de los gatos. Los juguetes interactivos, rascadores y pelotas son ideales. Recuerda dedicar tiempo diario a jugar con tu gato para fortalecer el vínculo y evitar el estrés.';
        }
        // Blog
        else if (mensaje.includes('blog') || mensaje.includes('artículo') || mensaje.includes('noticia')) {
            respuesta = 'En nuestro blog encontrarás artículos sobre comportamiento felino, curiosidades, consejos de salud y mucho más. Puedes visitarlo aquí: https://tusitio.com/pages/blog.html';
        }
        // Contacto
        else if (mensaje.includes('contacto') || mensaje.includes('hablar') || mensaje.includes('consultar') || mensaje.includes('ayuda')) {
            respuesta = 'Puedes contactarnos por este WhatsApp o a través del formulario en nuestra web. También respondemos consultas sobre salud, comportamiento y productos recomendados.';
        }
        // Saludo
        else if (mensaje.includes('hola') || mensaje.includes('buenos días') || mensaje.includes('buenas')) {
            respuesta = '¡Hola! Soy un experto en gatos. ¿Sobre qué tema felino te gustaría recibir información o ayuda?';
        }
        // Agradecimiento
        else if (mensaje.includes('gracias')) {
            respuesta = '¡Gracias por contactarnos! Si tienes más preguntas sobre gatos, estaré encantado de ayudarte.';
        }
        // Respuesta general
        else {
            respuesta = '¡Gracias por tu mensaje! Si tienes una consulta específica sobre alimentación, cuidados, juguetes, blog o cualquier otro tema felino, dime y te ayudo como experto.';
        }

        console.log('Enviando respuesta:', respuesta);
        // Enviar la respuesta
        await message.reply(respuesta);
        console.log('Respuesta enviada exitosamente');
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