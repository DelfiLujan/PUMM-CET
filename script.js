// JavaScript
// Smooth scrolling for navigation
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

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});

// Phishing quiz functionality
document.getElementById('phishing-quiz').addEventListener('click', function(e) {
    if (e.target.classList.contains('quiz-option')) {
        const options = this.querySelectorAll('.quiz-option');
        const resultDiv = document.getElementById('phishing-result');
        
        // Remove previous selections
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Mark selected option
        e.target.classList.add('selected');
        
        // Check answer and provide feedback
        if (e.target.dataset.answer === 'correct') {
            e.target.classList.add('correct');
            resultDiv.innerHTML = `
                <div class="result correct">
                    <strong>¡Correcto! 🎉</strong><br>
                    Este mensaje tiene varias señales de phishing:
                    <ul>
                        <li>• Urgencia extrema ("URGENTE!", "ahora")</li>
                        <li>• Amenaza de suspensión de cuenta</li>
                        <li>• URL acortada sospechosa (bit.ly)</li>
                        <li>• Solicita acción inmediata</li>
                    </ul>
                    <strong>Consejo:</strong> Los servicios legítimos nunca te pedirán verificar información a través de enlaces en emails.
                </div>
            `;
        } else {
            e.target.classList.add('incorrect');
            resultDiv.innerHTML = `
                <div class="result incorrect">
                    <strong>No es correcto 🤔</strong><br>
                    Este mensaje parece legítimo. Los emails de phishing suelen tener:
                    <ul>
                        <li>• Urgencia artificial</li>
                        <li>• Amenazas de cierre de cuenta</li>
                        <li>• Enlaces sospechosos</li>
                        <li>• Errores de ortografía</li>
                    </ul>
                    <strong>Intenta de nuevo</strong> buscando estas señales de alerta.
                </div>
            `;
        }
        
        resultDiv.style.display = 'block';
    }
});

// Password strength checker functionality
document.getElementById('password-input').addEventListener('input', function(e) {
    const password = e.target.value;
    const strengthMeter = document.getElementById('strength-meter');
    const feedback = document.getElementById('password-feedback');
    
    if (password.length === 0) {
        strengthMeter.innerHTML = '';
        feedback.innerHTML = '';
        return;
    }
    
    const strength = checkPasswordStrength(password);
    
    // Update strength meter
    strengthMeter.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill ${strength.class}" style="width: ${strength.score}%"></div>
        </div>
        <div class="strength-text ${strength.class}">${strength.text}</div>
    `;
    
    // Update feedback
    feedback.innerHTML = `
        <div class="password-analysis">
            <div class="analysis-section">
                <h4>Análisis de tu contraseña:</h4>
                <div class="criteria">
                    ${password.length >= 12 ? '✅' : '❌'} Al menos 12 caracteres (actual: ${password.length})
                </div>
                <div class="criteria">
                    ${/[a-z]/.test(password) ? '✅' : '❌'} Contiene minúsculas
                </div>
                <div class="criteria">
                    ${/[A-Z]/.test(password) ? '✅' : '❌'} Contiene mayúsculas
                </div>
                <div class="criteria">
                    ${/\d/.test(password) ? '✅' : '❌'} Contiene números
                </div>
                <div class="criteria">
                    ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? '✅' : '❌'} Contiene símbolos especiales
                </div>
            </div>
            <div class="suggestions">
                <h4>Sugerencias:</h4>
                <ul>
                    ${generatePasswordSuggestions(password).map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
});

// Password strength checking function
function checkPasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 12) score += 25;
    else if (password.length >= 8) score += 15;
    else score += 5;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/\d/.test(password)) score += 15;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 20;
    
    // Bonus for length
    if (password.length >= 16) score += 10;
    
    // Penalty for common patterns
    if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
    if (/123|abc|qwe|password|admin/.test(password.toLowerCase())) score -= 20;
    
    // Determine strength level
    if (score >= 80) {
        return { score, text: 'Muy Fuerte', class: 'very-strong' };
    } else if (score >= 60) {
        return { score, text: 'Fuerte', class: 'strong' };
    } else if (score >= 40) {
        return { score, text: 'Moderada', class: 'moderate' };
    } else if (score >= 20) {
        return { score, text: 'Débil', class: 'weak' };
    } else {
        return { score, text: 'Muy Débil', class: 'very-weak' };
    }
}

// Generate password improvement suggestions
function generatePasswordSuggestions(password) {
    const suggestions = [];
    
    if (password.length < 12) {
        suggestions.push('Aumenta la longitud a al menos 12 caracteres');
    }
    
    if (!/[a-z]/.test(password)) {
        suggestions.push('Agrega letras minúsculas');
    }
    
    if (!/[A-Z]/.test(password)) {
        suggestions.push('Agrega letras mayúsculas');
    }
    
    if (!/\d/.test(password)) {
        suggestions.push('Agrega números');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        suggestions.push('Agrega símbolos especiales (!@#$%^&*)');
    }
    
    if (/(.)\1{2,}/.test(password)) {
        suggestions.push('Evita repetir el mismo caracter consecutivamente');
    }
    
    if (/123|abc|qwe|password|admin/.test(password.toLowerCase())) {
        suggestions.push('Evita patrones comunes como "123", "abc", "password"');
    }
    
    if (suggestions.length === 0) {
        suggestions.push('¡Excelente! Tu contraseña es muy segura');
        suggestions.push('Recuerda usar una contraseña única para cada cuenta');
        suggestions.push('Considera usar un gestor de contraseñas');
    }
    
    return suggestions;
}

// Tips toggle functionality
function toggleTip(tipId) {
    const tipContent = document.getElementById(tipId);
    const tipButton = tipContent.parentElement;
    
    // Close all other tips
    document.querySelectorAll('.tip-content').forEach(tip => {
        if (tip.id !== tipId) {
            tip.classList.remove('active');
            tip.parentElement.classList.remove('active');
        }
    });
    
    // Toggle current tip
    if (tipContent.classList.contains('active')) {
        tipContent.classList.remove('active');
        tipButton.classList.remove('active');
    } else {
        tipContent.classList.add('active');
        tipButton.classList.add('active');
    }
}

// Mobile navigation toggle (if you add a hamburger menu later)
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button when scrolling down
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('🔒 CiberSeguridad - Página cargada correctamente');
    
    // Add click handlers for any dynamic elements
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add hover effects to tip buttons
    document.querySelectorAll('.tip-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
});