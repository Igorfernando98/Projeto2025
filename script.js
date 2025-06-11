// Script para adicionar interatividade à página de perfil profissional

document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada para os elementos da página
    animateOnScroll();
    
    // Adicionar comportamento de rolagem suave para links de navegação
    setupSmoothScroll();
    
    // Adicionar efeito de destaque para habilidades
    setupSkillsHighlight();
    
    // Adicionar animação para elementos da seção de carreira
    setupCareerAnimations();
    
    // Configurar o formulário de contato
    setupContactForm();
    
    // Atualizar o ano no footer
    updateFooterYear();
});

// Função para animar elementos quando eles entram na viewport
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Configuração do observador de interseção
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Criar observador para seções
    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Criar observador para itens da timeline
    const timelineObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateX(0)';
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Criar observador para itens de habilidades
    const skillsObserver = new IntersectionObserver(function(entries, observer) {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                delay += 100;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar estilos iniciais e observar elementos
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
    
    skillItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        skillsObserver.observe(item);
    });
}

// Função para configurar rolagem suave
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
                
                // Adicionar classe ativa ao item de menu
                document.querySelectorAll('.nav-menu li a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Destacar item de menu ativo com base na posição de rolagem
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu li a').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === `#${sectionId}`) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    });
}

// Função para destacar habilidades ao passar o mouse
function setupSkillsHighlight() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Função para animar elementos da seção de carreira
function setupCareerAnimations() {
    // Animar itens da lista de carreira
    const careerItems = document.querySelectorAll('.career-list li, .certification-list li');
    const educationItems = document.querySelectorAll('.education-item');
    const techSkillItems = document.querySelectorAll('.tech-skill-category');
    const careerSections = document.querySelectorAll('.career-section');
    
    // Configuração do observador
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Observador para seções de carreira
    const careerSectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observador para itens de lista
    const listObserver = new IntersectionObserver(function(entries, observer) {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateX(0)';
                }, delay);
                delay += 100;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observador para itens de educação
    const educationObserver = new IntersectionObserver(function(entries, observer) {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                delay += 200;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observador para categorias de habilidades técnicas
    const techSkillsObserver = new IntersectionObserver(function(entries, observer) {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, delay);
                delay += 150;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar estilos iniciais e observar elementos
    careerSections.forEach(section => {
        careerSectionObserver.observe(section);
    });
    
    careerItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        listObserver.observe(item);
    });
    
    educationItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        educationObserver.observe(item);
    });
    
    techSkillItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px) scale(0.95)';
        item.style.transition = 'all 0.6s ease';
        techSkillsObserver.observe(item);
    });
}

// Atualizar o ano atual no footer
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.textContent = footerYear.textContent.replace('2023', currentYear);
    }
}

// Configuração do formulário de contato com EmailJS
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Inicializar EmailJS com a chave pública
    emailjs.init('xAwJyddZWOnXoFION');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário para exibição local
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value || 'Não informado';
        const message = document.getElementById('message').value;
        
        // Criar elemento de carregamento
        const loadingElement = document.createElement('div');
        loadingElement.className = 'success-message';
        loadingElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i><p>Enviando mensagem...</p>';
        
        // Esconder o formulário e mostrar carregamento
        contactForm.style.display = 'none';
        contactForm.parentNode.insertBefore(loadingElement, contactForm.nextSibling);
        
        // Modificar o campo de mensagem para incluir todas as informações
        const messageField = document.getElementById('message');
        const originalMessage = messageField.value;
        
        // Criar uma mensagem completa com todos os dados
        const completeMessage = `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\n\nMensagem Original:\n${originalMessage}`;
        
        // Temporariamente substituir o valor do campo de mensagem
        messageField.value = completeMessage;
        
        // Usar sendForm para enviar diretamente os dados do formulário
        emailjs.sendForm('service_qzvecqd', 'template_h4of20h', contactForm, 'xAwJyddZWOnXoFION')
            .then(function(response) {
                console.log('Sucesso!', response.status, response.text);
                
                // Restaurar o valor original da mensagem
                messageField.value = originalMessage;
                
                // Remover o elemento de carregamento
                loadingElement.remove();
                
                // Criar mensagem de sucesso com os dados enviados
                const successElement = document.createElement('div');
                successElement.className = 'success-message';
                successElement.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Mensagem enviada com sucesso!</p>
                    <p>Obrigado por entrar em contato, ${name}.</p>
                    <div class="message-details">
                        <p><strong>Dados enviados:</strong></p>
                        <p><strong>Nome:</strong> ${name}</p>
                        <p><strong>E-mail:</strong> ${email}</p>
                        <p><strong>Telefone:</strong> ${phone}</p>
                        <p><strong>Mensagem:</strong> ${originalMessage}</p>
                    </div>
                `;
                
                // Mostrar mensagem de sucesso
                contactForm.parentNode.insertBefore(successElement, contactForm.nextSibling);
                
                // Limpar o formulário
                contactForm.reset();
                
                // Restaurar o formulário após 8 segundos (aumentado para dar tempo de ler os detalhes)
                setTimeout(function() {
                    successElement.remove();
                    contactForm.style.display = 'block';
                }, 8000);
            })
            .catch(function(error) {
                console.error('Erro ao enviar email:', error);
                
                // Restaurar o valor original da mensagem
                messageField.value = originalMessage;
                
                // Remover o elemento de carregamento
                loadingElement.remove();
                
                // Criar mensagem de erro
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.innerHTML = '<i class="fas fa-exclamation-circle"></i><p>Erro ao enviar mensagem.</p><p>Por favor, tente novamente mais tarde.</p>';
                
                // Mostrar mensagem de erro
                contactForm.parentNode.insertBefore(errorElement, contactForm.nextSibling);
                
                // Restaurar o formulário após 5 segundos
                setTimeout(function() {
                    errorElement.remove();
                    contactForm.style.display = 'block';
                }, 5000);
            });
    });
}