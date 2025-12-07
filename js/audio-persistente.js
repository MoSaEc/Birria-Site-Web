/**
 * Sistema de Reproducción de Audio Persistente con localStorage
 * Permite que la música de fondo continúe reproduciéndose entre páginas
 */

// Configuración
const AUDIO_CONFIG = {
    audioInicial: 'multimedia/alfa.mp3',
    audioBucle: 'multimedia/beta.mp3',
    storageKeys: {
        isPlaying: 'audioIsPlaying',
        currentTime: 'audioCurrentTime',
        currentAudio: 'currentAudioFile',
        hasTransitioned: 'hasTransitionedToBeta'
    }
};

// Variables globales
let audioInicial = null;
let audioBucle = null;
let isInitialized = false;

// Inicializar el sistema de audio
function initAudioSystem() {
    if (isInitialized) return;

    // Crear banner de notificación
    createAudioNotification();

    // Crear elementos de audio si no existen
    if (!document.getElementById('audioInicial')) {
        audioInicial = document.createElement('audio');
        audioInicial.id = 'audioInicial';
        audioInicial.innerHTML = `<source src="${AUDIO_CONFIG.audioInicial}" type="audio/mpeg">`;
        document.body.appendChild(audioInicial);
    } else {
        audioInicial = document.getElementById('audioInicial');
    }

    if (!document.getElementById('audioBucle')) {
        audioBucle = document.createElement('audio');
        audioBucle.id = 'audioBucle';
        audioBucle.loop = true;
        audioBucle.innerHTML = `<source src="${AUDIO_CONFIG.audioBucle}" type="audio/mpeg">`;
        document.body.appendChild(audioBucle);
    } else {
        audioBucle = document.getElementById('audioBucle');
    }

    setupEventListeners();
    restoreAudioState();
    createAudioControls();

    // Intentar reproducir automáticamente
    tryAutoplay();

    isInitialized = true;
}

// Configurar listeners de eventos
function setupEventListeners() {
    // Cuando termina alfa, comenzar beta
    audioInicial.addEventListener('ended', function () {
        localStorage.setItem(AUDIO_CONFIG.storageKeys.hasTransitioned, 'true');
        localStorage.setItem(AUDIO_CONFIG.storageKeys.currentAudio, 'beta');
        audioBucle.currentTime = 0;
        audioBucle.play().catch(handlePlayError);
    });

    // Guardar estado cada segundo
    audioInicial.addEventListener('timeupdate', saveAudioState);
    audioBucle.addEventListener('timeupdate', saveAudioState);

    // Guardar estado al pausar
    audioInicial.addEventListener('pause', saveAudioState);
    audioBucle.addEventListener('pause', saveAudioState);

    // Guardar estado al reproducir
    audioInicial.addEventListener('play', saveAudioState);
    audioBucle.addEventListener('play', saveAudioState);

    // Guardar estado antes de salir de la página
    window.addEventListener('beforeunload', saveAudioState);
}

// Restaurar estado del audio desde localStorage
function restoreAudioState() {
    const isPlaying = localStorage.getItem(AUDIO_CONFIG.storageKeys.isPlaying) === 'true';
    const currentTime = parseFloat(localStorage.getItem(AUDIO_CONFIG.storageKeys.currentTime)) || 0;
    const currentAudio = localStorage.getItem(AUDIO_CONFIG.storageKeys.currentAudio) || 'alfa';
    const hasTransitioned = localStorage.getItem(AUDIO_CONFIG.storageKeys.hasTransitioned) === 'true';

    if (currentAudio === 'alfa' && !hasTransitioned) {
        audioInicial.currentTime = currentTime;
        if (isPlaying) {
            audioInicial.play().catch(handlePlayError);
        }
    } else {
        // Ya pasó a beta
        audioBucle.currentTime = currentTime;
        if (isPlaying) {
            audioBucle.play().catch(handlePlayError);
        }
    }
}

// Guardar estado del audio en localStorage
function saveAudioState() {
    const currentAudio = localStorage.getItem(AUDIO_CONFIG.storageKeys.currentAudio) || 'alfa';

    if (currentAudio === 'alfa' && !audioInicial.paused) {
        localStorage.setItem(AUDIO_CONFIG.storageKeys.isPlaying, 'true');
        localStorage.setItem(AUDIO_CONFIG.storageKeys.currentTime, audioInicial.currentTime.toString());
        localStorage.setItem(AUDIO_CONFIG.storageKeys.currentAudio, 'alfa');
    } else if (currentAudio === 'beta' && !audioBucle.paused) {
        localStorage.setItem(AUDIO_CONFIG.storageKeys.isPlaying, 'true');
        localStorage.setItem(AUDIO_CONFIG.storageKeys.currentTime, audioBucle.currentTime.toString());
        localStorage.setItem(AUDIO_CONFIG.storageKeys.currentAudio, 'beta');
    } else {
        localStorage.setItem(AUDIO_CONFIG.storageKeys.isPlaying, 'false');
    }
}

// Manejar errores de reproducción
function handlePlayError(error) {
    console.log('Autoplay bloqueado por el navegador. Haz clic en el botón de play.');
    localStorage.setItem(AUDIO_CONFIG.storageKeys.isPlaying, 'false');
    showAudioNotification();
}

// Crear notificación para activar audio
function createAudioNotification() {
    const notification = document.createElement('div');
    notification.id = 'audioNotification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <span>🎵 <strong>Música de fondo disponible</strong> - Haz clic para activar</span>
            <button id="enableAudioBtn" style="padding: 0.5rem 1rem; background: white; color: #722F37; border: none; border-radius: 20px; cursor: pointer; font-weight: 600;">
                ▶️ Activar Música
            </button>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #722F37 0%, #A0353C 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        display: none;
        max-width: 90%;
        animation: slideDown 0.5s ease;
    `;

    document.body.appendChild(notification);

    // Agregar animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                transform: translateX(-50%) translateY(-100px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Evento del botón
    setTimeout(() => {
        const btn = document.getElementById('enableAudioBtn');
        if (btn) {
            btn.addEventListener('click', function () {
                startAudioPlayback();
                notification.style.display = 'none';
            });
        }
    }, 100);
}

// Crear controles flotantes de audio
function createAudioControls() {
    // Verificar si ya existe
    if (document.getElementById('audioControlsFloat')) return;

    const controlDiv = document.createElement('div');
    controlDiv.id = 'audioControlsFloat';
    controlDiv.innerHTML = `
        <button id="audioToggleBtn" title="Pausar/Reproducir música">
            <span id="audioIcon">🔊</span>
        </button>
    `;
    document.body.appendChild(controlDiv);

    // Estilos del control flotante
    const style = document.createElement('style');
    style.textContent = `
        #audioControlsFloat {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        }
        
        #audioToggleBtn {
            background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(255, 140, 66, 0.5);
            transition: all 0.3s ease;
            font-size: 1.5rem;
        }
        
        #audioToggleBtn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(255, 140, 66, 0.7);
        }
        
        #audioToggleBtn:active {
            transform: translateY(-1px);
        }

        #audioIcon {
            display: block;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
    `;
    document.head.appendChild(style);

    // Funcionalidad del botón
    const toggleBtn = document.getElementById('audioToggleBtn');
    const audioIcon = document.getElementById('audioIcon');

    toggleBtn.addEventListener('click', function () {
        const currentAudio = localStorage.getItem(AUDIO_CONFIG.storageKeys.currentAudio) || 'alfa';
        const activeAudio = currentAudio === 'alfa' ? audioInicial : audioBucle;

        if (activeAudio.paused) {
            activeAudio.play().catch(handlePlayError);
            audioIcon.textContent = '🔊';
            localStorage.setItem(AUDIO_CONFIG.storageKeys.isPlaying, 'true');
        } else {
            activeAudio.pause();
            audioIcon.textContent = '🔇';
            localStorage.setItem(AUDIO_CONFIG.storageKeys.isPlaying, 'false');
        }
    });

    // Actualizar icono basado en estado
    updateAudioIcon();
}

// Actualizar icono del control
function updateAudioIcon() {
    const audioIcon = document.getElementById('audioIcon');
    if (!audioIcon) return;

    const currentAudio = localStorage.getItem(AUDIO_CONFIG.storageKeys.currentAudio) || 'alfa';
    const activeAudio = currentAudio === 'alfa' ? audioInicial : audioBucle;

    if (activeAudio && !activeAudio.paused) {
        audioIcon.textContent = '🔊';
    } else {
        audioIcon.textContent = '🔇';
    }
}

// Intentar reproducción automática
function tryAutoplay() {
    const isPlaying = localStorage.getItem(AUDIO_CONFIG.storageKeys.isPlaying) === 'true';
    const currentAudio = localStorage.getItem(AUDIO_CONFIG.storageKeys.currentAudio) || 'alfa';

    if (currentAudio === 'alfa') {
        audioInicial.play().then(() => {
            console.log('Audio alfa iniciado automáticamente');
            localStorage.setItem(AUDIO_CONFIG.storageKeys.isPlaying, 'true');
        }).catch((error) => {
            console.log('Autoplay bloqueado, mostrando notificación');
            showAudioNotification();
        });
    } else if (isPlaying) {
        audioBucle.play().catch((error) => {
            console.log('Autoplay bloqueado, mostrando notificación');
            showAudioNotification();
        });
    }
}

// Mostrar notificación de audio
function showAudioNotification() {
    const notification = document.getElementById('audioNotification');
    if (notification) {
        notification.style.display = 'block';
        // Auto-ocultar después de 10 segundos
        setTimeout(() => {
            if (notification.style.display === 'block') {
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.style.display = 'none';
                    notification.style.opacity = '1';
                }, 500);
            }
        }, 10000);
    }
}

// Iniciar reproducción de audio (al hacer clic)
function startAudioPlayback() {
    const currentAudio = localStorage.getItem(AUDIO_CONFIG.storageKeys.currentAudio) || 'alfa';
    const hasTransitioned = localStorage.getItem(AUDIO_CONFIG.storageKeys.hasTransitioned) === 'true';

    if (hasTransitioned || currentAudio === 'beta') {
        // Ya pasó a beta, reproducir beta
        audioBucle.currentTime = parseFloat(localStorage.getItem(AUDIO_CONFIG.storageKeys.currentTime)) || 0;
        audioBucle.play().then(() => {
            console.log('Beta iniciado');
            localStorage.setItem(AUDIO_CONFIG.storageKeys.isPlaying, 'true');
            localStorage.setItem(AUDIO_CONFIG.storageKeys.currentAudio, 'beta');
        }).catch(handlePlayError);
    } else {
        // Iniciar con alfa
        audioInicial.currentTime = parseFloat(localStorage.getItem(AUDIO_CONFIG.storageKeys.currentTime)) || 0;
        audioInicial.play().then(() => {
            console.log('Alfa iniciado');
            localStorage.setItem(AUDIO_CONFIG.storageKeys.isPlaying, 'true');
            localStorage.setItem(AUDIO_CONFIG.storageKeys.currentAudio, 'alfa');
        }).catch(handlePlayError);
    }
}


// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudioSystem);
} else {
    initAudioSystem();
}

// Actualizar icono periódicamente
setInterval(updateAudioIcon, 1000);
