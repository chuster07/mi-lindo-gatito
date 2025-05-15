// Array de imágenes de gatos para la galería
const catImages = [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    'https://images.unsplash.com/photo-1533738363-b7f9aef128ce',
    'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13',
    'https://images.unsplash.com/photo-1543852786-1cf6624b9987',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    'https://images.unsplash.com/photo-1548247416-ec66f4900b2e'
];

// Función para cargar la galería de imágenes
function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    catImages.forEach(imageUrl => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Gato adorable';
        img.loading = 'lazy';
        
        imgContainer.appendChild(img);
        imgContainer.appendChild(overlay);
        galleryGrid.appendChild(imgContainer);
    });
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (!isValid) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }
            
            // Simular envío del formulario
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            // Simular delay de envío
            setTimeout(() => {
                console.log('Datos del formulario:', data);
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                this.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }

    // Animación de aparición al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos que queremos animar
    document.querySelectorAll('.servicio-card, .contacto-info, .contacto-form').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Navbar responsive
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let isScrolling;

    window.addEventListener('scroll', () => {
        // Limpiar el timeout anterior
        clearTimeout(isScrolling);

        const currentScroll = window.pageYOffset;
        
        // Mostrar/ocultar navbar
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            navbar.classList.remove('scroll-down');
        } else if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;

        // Agregar clase 'scrolled' cuando se hace scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Detener la animación después de que el scroll se detenga
        isScrolling = setTimeout(() => {
            navbar.classList.remove('scrolling');
        }, 100);
    });

    // Menú móvil
    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    navbar.appendChild(menuBtn);

    menuBtn.addEventListener('click', () => {
        const nav = navbar.querySelector('nav');
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.navbar nav a').forEach(link => {
        link.addEventListener('click', () => {
            const nav = navbar.querySelector('nav');
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // Agregar estilos CSS para el menú móvil
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        .menu-btn {
            display: none;
            background: none;
            border: none;
            color: var(--lila-suave);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
        }

        @media (max-width: 768px) {
            .menu-btn {
                display: block;
            }

            .navbar nav {
                position: fixed;
                top: 64px;
                left: 0;
                right: 0;
                background: var(--morado-oscuro);
                padding: 20px;
                flex-direction: column;
                align-items: center;
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                display: flex;
            }

            .navbar nav.active {
                transform: translateY(0);
                opacity: 1;
            }

            .navbar nav a {
                margin: 10px 0;
                width: 100%;
                text-align: center;
            }
        }

        .navbar.scrolled {
            background: rgba(76,29,149,0.98);
            box-shadow: 0 2px 20px rgba(76,29,149,0.2);
        }

        .navbar.scrolling {
            transition: none;
        }

        .error {
            border-color: #ff4444 !important;
            animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(mobileStyles);
});

// Agregar estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar {
        transition: transform 0.3s ease-in-out;
    }
    
    .navbar.scroll-down {
        transform: translateY(-100%);
    }
    
    .navbar.scroll-up {
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Cargar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadGallery);

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    });
});

// Configuración del bot de WhatsApp
const whatsappConfig = {
    phoneNumber: '50661278681',
    defaultMessage: '¡Hola! 👋 Me gustaría obtener información sobre los servicios de Mi Lindo Gatito. Específicamente me interesa saber sobre:',
    businessHours: {
        start: 8, // 8 AM
        end: 20,  // 8 PM
        timezone: 'America/Costa_Rica'
    }
};

// Función para verificar si estamos en horario laboral
function isBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= whatsappConfig.businessHours.start && hour < whatsappConfig.businessHours.end;
}

// Función para abrir WhatsApp
function openWhatsApp() {
    const message = encodeURIComponent(whatsappConfig.defaultMessage);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappConfig.phoneNumber}&text=${message}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
}

// Agregar evento al botón de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });

        // Actualizar el estado del botón según horario
        if (!isBusinessHours()) {
            whatsappBtn.classList.add('offline');
            whatsappBtn.title = 'Fuera de horario de atención';
        }
    }

    // Inicializar el widget de chat
    initChatWidget();
});

// Widget de chat
function initChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-header">
            <h3>Chat con Mi Lindo Gatito</h3>
            <button class="close-chat">×</button>
        </div>
        <div class="chat-messages">
            <div class="message bot">
                ¡Hola! 👋 ¿En qué puedo ayudarte hoy?
            </div>
        </div>
        <div class="chat-input">
            <input type="text" placeholder="Escribe tu mensaje...">
            <button class="send-message">Enviar</button>
        </div>
    `;

    document.body.appendChild(chatWidget);

    // Funcionalidad del widget
    const closeBtn = chatWidget.querySelector('.close-chat');
    const input = chatWidget.querySelector('input');
    const sendBtn = chatWidget.querySelector('.send-message');
    const messagesContainer = chatWidget.querySelector('.chat-messages');

    closeBtn.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });

    // Base de conocimiento para preguntas frecuentes
    const faqDatabase = {
        'alimentacion': {
            keywords: ['comida', 'alimentar', 'comer', 'dieta', 'pienso', 'croquetas'],
            response: 'La alimentación de tu gato debe ser balanceada y adecuada a su edad. Los gatitos necesitan comida especial para cachorros, mientras que los adultos requieren una dieta equilibrada. Recomendamos consultar con tu veterinario para la mejor opción.'
        },
        'vacunas': {
            keywords: ['vacuna', 'vacunación', 'vacunas', 'inmunización'],
            response: 'Las vacunas esenciales para tu gato son: Triple felina, Leucemia felina y Rabia. El calendario de vacunación debe ser establecido por tu veterinario, pero generalmente comienza a las 8 semanas de edad.'
        },
        'caja': {
            keywords: ['caja', 'arena', 'baño', 'hacer necesidades', 'sanitario'],
            response: 'La caja de arena debe limpiarse diariamente y cambiarse completamente cada 2-3 semanas. Ubícala en un lugar tranquilo y accesible. La arena debe tener 5-7 cm de profundidad.'
        },
        'pelaje': {
            keywords: ['pelo', 'pelaje', 'cepillar', 'muda', 'caída'],
            response: 'El cepillado regular ayuda a prevenir bolas de pelo y mantiene el pelaje saludable. Los gatos de pelo largo necesitan cepillado diario, mientras que los de pelo corto pueden cepillarse 2-3 veces por semana.'
        },
        'comportamiento': {
            keywords: ['comportamiento', 'conducta', 'agresivo', 'maúlla', 'araña'],
            response: 'Los cambios en el comportamiento pueden indicar problemas de salud o estrés. Observa cambios en el apetito, el uso de la caja de arena o el nivel de actividad. Consulta con un veterinario si notas cambios significativos.'
        },
        'esterilizacion': {
            keywords: ['esterilizar', 'castrar', 'esterilización', 'castración'],
            response: 'La esterilización es recomendada entre los 4-6 meses de edad. Ayuda a prevenir problemas de salud y comportamientos no deseados. Consulta con tu veterinario para el momento ideal.'
        },
        'juego': {
            keywords: ['jugar', 'juguetes', 'entretenimiento', 'actividad'],
            response: 'Los gatos necesitan ejercicio y estimulación mental. Juguetes interactivos, rascadores y sesiones de juego diarias son importantes para su bienestar físico y mental.'
        },
        'salud': {
            keywords: ['salud', 'enfermo', 'veterinario', 'síntomas', 'enfermedad'],
            response: 'Signos de alerta incluyen: cambios en el apetito, letargia, vómitos, diarrea, cambios en el uso de la caja de arena. Ante cualquier síntoma, consulta inmediatamente con tu veterinario.'
        }
    };

    // Función para encontrar la mejor respuesta
    function findBestResponse(message) {
        message = message.toLowerCase();
        let bestMatch = null;
        let maxKeywords = 0;

        for (const [category, data] of Object.entries(faqDatabase)) {
            const keywordCount = data.keywords.filter(keyword => message.includes(keyword)).length;
            if (keywordCount > maxKeywords) {
                maxKeywords = keywordCount;
                bestMatch = data.response;
            }
        }

        return bestMatch || 'Lo siento, no tengo información específica sobre eso. Te recomiendo consultar con nuestro veterinario para una respuesta más precisa.';
    }

    function sendMessage() {
        const message = input.value.trim();
        if (message) {
            // Agregar mensaje del usuario
            messagesContainer.innerHTML += `
                <div class="message user">
                    ${message}
                </div>
            `;

            // Buscar y mostrar la mejor respuesta
            const response = findBestResponse(message);
            setTimeout(() => {
                messagesContainer.innerHTML += `
                    <div class="message bot">
                        ${response}
                        <br><br>
                        ¿Necesitas más información? Puedes contactarnos por WhatsApp para una atención más personalizada.
                    </div>
                `;
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);

            input.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Mostrar widget después de 5 segundos
    setTimeout(() => {
        chatWidget.classList.add('active');
    }, 5000);
}

// Navegación suave para anclas internas
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Animación de aparición al hacer scroll
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.servicio-card, .contacto-info, .contacto-form, .galeria-gatos, .footer-section').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Validación y feedback del formulario de contacto
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;
      this.querySelectorAll('input[required], textarea[required]').forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
          valid = false;
        } else {
          input.classList.remove('error');
        }
      });
      if (!valid) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
      }
      const btn = this.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Enviando...';
      setTimeout(() => {
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        this.reset();
        btn.disabled = false;
        btn.textContent = 'Enviar Mensaje';
      }, 1200);
    });
  }

  // Lightbox para galería de gatos
  const galeria = document.querySelector('.galeria-grid');
  if (galeria) {
    galeria.addEventListener('click', function(e) {
      if (e.target.tagName === 'IMG') {
        let overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.85)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 9999;
        overlay.innerHTML = `<img src="${e.target.src}" style="max-width:90vw; max-height:90vh; border-radius:18px; box-shadow:0 8px 32px #000;">`;
        overlay.addEventListener('click', () => document.body.removeChild(overlay));
        document.body.appendChild(overlay);
      }
    });
  }
});

// Estilos para fade-in y error
const style = document.createElement('style');
style.textContent = `
.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
input.error, textarea.error { border-color: #ff4444 !important; animation: shake 0.4s; }
@keyframes shake { 0%,100%{transform:translateX(0);} 25%{transform:translateX(-5px);} 75%{transform:translateX(5px);} }
`;
document.head.appendChild(style); 