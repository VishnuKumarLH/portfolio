// Vintage Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize EmailJS
    emailjs.init("bjCMQgT8ywzhIE4oB"); // Your EmailJS public key
    
    // FAB Menu and Theme Toggle Functionality
    const fabMain = document.getElementById('fabMain');
    const fabMenu = document.getElementById('fabMenu');
    const themeFab = document.getElementById('themeFab');
    const chatFab = document.getElementById('chatFab');
    const desktopThemeToggle = document.getElementById('desktopThemeToggle');
    const themeIcons = document.querySelectorAll('.theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    // Add event listeners to both theme toggle buttons
    function handleThemeToggle() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Update header styling immediately after theme change
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        
        if (scrollTop > 100) {
            if (newTheme === 'dark') {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
            } else {
                header.style.background = 'rgba(253, 246, 227, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(62, 47, 47, 0.1)';
            }
        } else {
            if (newTheme === 'dark') {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
                header.style.boxShadow = 'none';
            } else {
                header.style.background = 'rgba(253, 246, 227, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
    }
    
    // FAB Menu Toggle
    fabMain.addEventListener('click', function() {
        fabMain.classList.toggle('active');
        fabMenu.classList.toggle('active');
    });
    
    // Close FAB menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!fabMain.contains(e.target) && !fabMenu.contains(e.target)) {
            fabMain.classList.remove('active');
            fabMenu.classList.remove('active');
        }
    });
    
    // Add event listeners to theme toggle buttons
    if (themeFab) {
        themeFab.addEventListener('click', function() {
            handleThemeToggle();
            // Close FAB menu after action
            fabMain.classList.remove('active');
            fabMenu.classList.remove('active');
        });
    }
    
    if (desktopThemeToggle) {
        desktopThemeToggle.addEventListener('click', handleThemeToggle);
    }
    
    function updateThemeIcon(theme) {
        themeIcons.forEach(icon => {
            if (theme === 'dark') {
                icon.textContent = '☀️';
            } else {
                icon.textContent = '🌙';
            }
        });
        
        // Update aria labels
        if (themeFab) {
            themeFab.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        }
        if (desktopThemeToggle) {
            desktopThemeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        }
    }
    
    // AI Assistant Chatbot Functionality
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    
    // Enhanced AI Assistant Training Data
    const botResponses = {
        // Skills & Technologies
        skills: "Vishnukumar is proficient in multiple programming languages and technologies:\n\n🐍 **Python**: Advanced level with Flask framework, data structures, and algorithms\n💻 **JavaScript**: Frontend development, DOM manipulation, and interactive web applications\n🌐 **Web Technologies**: HTML5, CSS3, responsive design, and modern web standards\n⚙️ **Backend**: Flask web framework, RESTful APIs, and server-side development\n🔧 **Tools**: Git version control, VS Code, and various development tools\n\nHe's passionate about creating elegant, efficient software solutions with clean code practices.",
        
        python: "Vishnukumar has strong Python skills including:\n• Flask web framework for backend development\n• Data structures and algorithms implementation\n• Object-oriented programming concepts\n• File handling and database operations\n• API development and integration\n\nPython is his primary language for backend development and problem-solving.",
        
        javascript: "His JavaScript expertise includes:\n• Vanilla JavaScript for interactive web features\n• DOM manipulation and event handling\n• Asynchronous programming with promises\n• Modern ES6+ features and syntax\n• Frontend frameworks integration\n• API consumption and AJAX requests",
        
        web: "Vishnukumar specializes in modern web development:\n• Responsive design with CSS Grid and Flexbox\n• Mobile-first development approach\n• Cross-browser compatibility\n• Performance optimization\n• Accessibility best practices\n• Progressive Web App (PWA) concepts",
        
        // Projects in Detail
        projects: "Vishnukumar has developed several impressive projects:\n\n🎤 **Voice Assistant**: AI-powered voice recognition system with natural language processing\n💬 **Chat Room Application**: Real-time messaging platform with user authentication\n🌤️ **Weather App**: Location-based weather forecasting with API integration\n🎬 **Movie Search App**: Dynamic movie database with search and filtering capabilities\n\nEach project demonstrates his full-stack development skills and attention to user experience.",
        
        voice_assistant: "The Voice Assistant project is one of his most advanced works:\n• Speech recognition and text-to-speech functionality\n• Natural language processing for command interpretation\n• Integration with various APIs for information retrieval\n• User-friendly interface with voice feedback\n• Built using Python with speech recognition libraries",
        
        chat_app: "The Chat Room Application showcases his real-time development skills:\n• Real-time messaging with WebSocket technology\n• User authentication and session management\n• Message history and user presence indicators\n• Responsive design for mobile and desktop\n• Built with Flask backend and JavaScript frontend",
        
        weather_app: "The Weather Application demonstrates API integration expertise:\n• Location-based weather data retrieval\n• Interactive weather maps and forecasts\n• Responsive design with beautiful UI\n• Real-time data updates and caching\n• Integration with OpenWeatherMap API",
        
        movie_app: "The Movie Search App highlights his frontend development skills:\n• Dynamic search with real-time filtering\n• Movie details with ratings and reviews\n• Responsive card-based layout\n• API integration with movie databases\n• Smooth animations and user interactions",
        
        // Experience & Background
        experience: "Vishnukumar brings valuable experience to the table:\n\n📚 **Learning Journey**: 2+ years of dedicated programming and development\n🚀 **Project Portfolio**: 5+ completed projects showcasing diverse skills\n🎓 **Academic Background**: Computer Science student with strong theoretical foundation\n💡 **Problem Solving**: Excellent analytical and debugging skills\n🔄 **Continuous Learning**: Always exploring new technologies and best practices\n\nHe focuses on writing clean, maintainable code and creating user-centric solutions.",
        
        // Education & Learning
        education: "Educational Background:\n• Currently pursuing BSc Computer Science\n• Strong foundation in programming fundamentals\n• Data structures and algorithms expertise\n• Software engineering principles\n• Database management concepts\n• Computer networks and system design\n\nHe combines academic knowledge with practical project experience to create robust solutions.",
        
        learning: "Vishnukumar is committed to continuous learning:\n• Stays updated with latest web development trends\n• Practices coding challenges and algorithms\n• Explores new frameworks and technologies\n• Participates in online coding communities\n• Builds personal projects to apply new skills",
        
        // Contact & Professional Info
        contact: "📧 **Email**: vishnu241206@gmail.com\n📱 **Phone**: +91 9500906427\n🌐 **GitHub**: github.com/VishnuKumarLH\n💼 **LinkedIn**: linkedin.com/in/vishnukumar-l-h-ba6239342\n📸 **Instagram**: @iam.__.vishnu\n🎥 **YouTube**: @vzhnu24\n\nFeel free to reach out for collaboration, opportunities, or just to connect!",
        
        email: "You can reach Vishnukumar at vishnu241206@gmail.com for:\n• Job opportunities and internships\n• Project collaborations\n• Technical discussions\n• Freelance work inquiries\n• General networking\n\nHe typically responds within 24 hours.",
        
        github: "Check out his GitHub profile at github.com/VishnuKumarLH to see:\n• Source code for all his projects\n• Contribution history and activity\n• Code quality and documentation\n• Collaboration on open-source projects\n• Technical skills demonstration",
        
        linkedin: "Connect with him on LinkedIn for:\n• Professional networking\n• Career opportunities\n• Industry insights and updates\n• Project showcases and achievements\n• Professional recommendations",
        
        // Location & Availability
        location: "📍 **Based in**: Madurai, Tamil Nadu, India\n🌏 **Available for**: Remote work opportunities worldwide\n💼 **Open to**: Full-time, part-time, and freelance projects\n🚀 **Interested in**: Web development, software engineering, and tech startups\n\nHe's flexible with time zones and enjoys working with international teams.",
        
        // Career & Goals
        career: "Career Aspirations:\n• Full-stack web developer role\n• Software engineering positions\n• Tech startup opportunities\n• Remote work with global teams\n• Continuous skill development\n\nHe's passionate about creating impactful software solutions and growing in the tech industry.",
        
        goals: "Professional Goals:\n• Master modern web development frameworks\n• Contribute to open-source projects\n• Build scalable web applications\n• Develop expertise in cloud technologies\n• Mentor other aspiring developers",
        
        // Personality & Work Style
        personality: "Vishnukumar is known for:\n• Strong problem-solving abilities\n• Attention to detail and code quality\n• Collaborative and team-oriented approach\n• Excellent communication skills\n• Passion for learning new technologies\n• User-focused development mindset",
        
        work_style: "His work approach includes:\n• Clean, well-documented code\n• Test-driven development practices\n• Agile development methodologies\n• Regular code reviews and feedback\n• Continuous integration and deployment\n• User experience-focused design",
        
        // Availability & Hiring
        availability: "Current Availability:\n✅ **Open to opportunities**: Full-time positions\n✅ **Freelance projects**: Available for short-term work\n✅ **Collaborations**: Open to interesting projects\n✅ **Internships**: Seeking learning opportunities\n\nPreferred start date: Flexible based on opportunity",
        
        hire: "Why hire Vishnukumar?\n• Strong technical foundation with practical experience\n• Proven ability to deliver complete projects\n• Excellent problem-solving and debugging skills\n• Great communication and teamwork abilities\n• Passionate about creating quality software\n• Quick learner who adapts to new technologies",
        
        // Default and Help
        help: "I can help you learn about:\n\n🔧 **Technical Skills**: Python, JavaScript, web development\n📁 **Projects**: Voice assistant, chat app, weather app, movie search\n👨‍💻 **Experience**: Background, education, learning journey\n📞 **Contact**: Email, phone, social media profiles\n🌍 **Location**: Based in Madurai, available remotely\n💼 **Career**: Goals, availability, hiring information\n\nJust ask me anything about Vishnukumar's professional profile!",
        
        default: "Hi there! 👋 I'm Vishnukumar's AI assistant. I can help you learn about his skills, projects, experience, and how to get in touch.\n\nTry asking me about:\n• His programming skills and technologies\n• Project details and demonstrations\n• Professional experience and background\n• Contact information and availability\n• Career goals and aspirations\n\nWhat would you like to know?"
    };
    
    // Chat FAB functionality
    if (chatFab) {
        chatFab.addEventListener('click', function() {
            chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
            if (chatContainer.style.display === 'flex') {
                chatInput.focus();
            }
            // Close FAB menu after action
            fabMain.classList.remove('active');
            fabMenu.classList.remove('active');
        });
    }
    
    chatClose.addEventListener('click', function() {
        chatContainer.style.display = 'none';
    });
    
    // Conversation memory for context
    let conversationHistory = [];
    let isTyping = false;
    
    // Send message functionality with enhanced features
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '' || isTyping) return;
        
        // Add user message
        addMessage(message, 'user');
        conversationHistory.push({type: 'user', message: message, timestamp: Date.now()});
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Generate bot response with realistic delay
        const responseDelay = Math.random() * 1500 + 800; // 800-2300ms delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateBotResponse(message);
            addMessage(response, 'bot');
            conversationHistory.push({type: 'bot', message: response, timestamp: Date.now()});
        }, responseDelay);
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        if (isTyping) return;
        isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content typing-content';
        content.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        isTyping = false;
    }
    
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Enhanced AI response generation with smart keyword matching
    function generateBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Debug log for troubleshooting
        console.log('Bot processing message:', lowerMessage);
        
        // Greeting responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || 
            lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon') || lowerMessage.includes('good evening')) {
            return "Hello! 👋 I'm Vishnukumar's AI assistant. I'm here to help you learn about his skills, projects, and professional background. What would you like to know?";
        }
        
        // Help and guidance
        if (lowerMessage.includes('help') || lowerMessage.includes('what can you') || lowerMessage.includes('how can you') || 
            lowerMessage.includes('guide') || lowerMessage.includes('assist')) {
            return botResponses.help;
        }
        
        // Specific technology skills
        if (lowerMessage.includes('python') || lowerMessage.includes('flask') || lowerMessage.includes('tell me about python')) {
            return botResponses.python;
        }
        if (lowerMessage.includes('javascript') || lowerMessage.includes('js') || lowerMessage.includes('frontend') || 
            lowerMessage.includes('javascript projects')) {
            return botResponses.javascript;
        }
        if (lowerMessage.includes('web development') || lowerMessage.includes('html') || lowerMessage.includes('css') || 
            lowerMessage.includes('responsive') || lowerMessage.includes('website') || lowerMessage.includes('web development skills')) {
            return botResponses.web;
        }
        
        // Specific projects
        if (lowerMessage.includes('voice assistant') || lowerMessage.includes('voice') || lowerMessage.includes('speech') || 
            lowerMessage.includes('voice assistant details')) {
            return botResponses.voice_assistant;
        }
        if (lowerMessage.includes('chat room') || lowerMessage.includes('chat app') || lowerMessage.includes('messaging') || 
            lowerMessage.includes('chat room features')) {
            return botResponses.chat_app;
        }
        if (lowerMessage.includes('weather app') || lowerMessage.includes('weather') || lowerMessage.includes('forecast') || 
            lowerMessage.includes('weather app demo')) {
            return botResponses.weather_app;
        }
        if (lowerMessage.includes('movie app') || lowerMessage.includes('movie search') || lowerMessage.includes('movie')) {
            return botResponses.movie_app;
        }
        
        // Contact information
        if (lowerMessage.includes('email') || lowerMessage.includes('mail') || lowerMessage.includes('email address')) {
            return botResponses.email;
        }
        if (lowerMessage.includes('github') || lowerMessage.includes('git') || lowerMessage.includes('code') || 
            lowerMessage.includes('github profile')) {
            return botResponses.github;
        }
        if (lowerMessage.includes('linkedin') || lowerMessage.includes('professional network')) {
            return botResponses.linkedin;
        }
        
        // Career and hiring
        if (lowerMessage.includes('hire') || lowerMessage.includes('hiring') || lowerMessage.includes('recruit') || 
            lowerMessage.includes('job') || lowerMessage.includes('position') || lowerMessage.includes('opportunity')) {
            return botResponses.hire;
        }
        if (lowerMessage.includes('available') || lowerMessage.includes('availability') || lowerMessage.includes('free')) {
            return botResponses.availability;
        }
        if (lowerMessage.includes('career') || lowerMessage.includes('future') || lowerMessage.includes('aspiration')) {
            return botResponses.career;
        }
        if (lowerMessage.includes('goal') || lowerMessage.includes('objective') || lowerMessage.includes('aim')) {
            return botResponses.goals;
        }
        
        // Personal and work style
        if (lowerMessage.includes('personality') || lowerMessage.includes('character') || lowerMessage.includes('person') || 
            lowerMessage.includes('who is') || lowerMessage.includes('tell me about')) {
            return botResponses.personality;
        }
        if (lowerMessage.includes('work style') || lowerMessage.includes('approach') || lowerMessage.includes('methodology')) {
            return botResponses.work_style;
        }
        
        // Learning and education
        if (lowerMessage.includes('learn') || lowerMessage.includes('study') || lowerMessage.includes('course')) {
            return botResponses.learning;
        }
        
        
        // General categories (broader matching)
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('programming') || 
            lowerMessage.includes('language') || lowerMessage.includes('tech') || lowerMessage.includes('development')) {
            return botResponses.skills;
        }
        if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio') || 
            lowerMessage.includes('build') || lowerMessage.includes('create')) {
            return botResponses.projects;
        }
        if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('history')) {
            return botResponses.experience;
        }
        if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('phone') || 
            lowerMessage.includes('connect') || lowerMessage.includes('social')) {
            return botResponses.contact;
        }
        if (lowerMessage.includes('education') || lowerMessage.includes('student') || lowerMessage.includes('degree') || 
            lowerMessage.includes('college') || lowerMessage.includes('university')) {
            return botResponses.education;
        }
        if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('madurai') || 
            lowerMessage.includes('based') || lowerMessage.includes('live')) {
            return botResponses.location;
        }
        
        // Conversational responses
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! 😊 Is there anything else you'd like to know about Vishnukumar? I'm here to help!";
        }
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
            return "Goodbye! 👋 Thanks for your interest in Vishnukumar's profile. Feel free to reach out anytime if you have more questions!";
        }
        if (lowerMessage.includes('awesome') || lowerMessage.includes('great') || lowerMessage.includes('amazing') || 
            lowerMessage.includes('impressive') || lowerMessage.includes('cool')) {
            return "I'm glad you're impressed! 🌟 Vishnukumar would love to discuss potential opportunities with you. Would you like his contact information?";
        }
        
        // Question words - provide helpful guidance
        if (lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why') || 
            lowerMessage.includes('when') || lowerMessage.includes('which')) {
            return "I'd be happy to help answer your question! You can ask me about:\n\n• Technical skills and programming languages\n• Project details and demonstrations\n• Professional experience and background\n• Contact information and availability\n• Career goals and work style\n\nWhat specific aspect interests you most?";
        }
        
        // Default response for unmatched queries
        return botResponses.default;
    }
    
    // Event listeners for sending messages
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    // Toggle mobile menu with enhanced animations
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open (only on mobile)
        if (window.innerWidth <= 768) {
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Background Change on Scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const currentTheme = body.getAttribute('data-theme');
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            if (currentTheme === 'dark') {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
            } else {
                header.style.background = 'rgba(253, 246, 227, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(62, 47, 47, 0.1)';
            }
        } else {
            header.classList.remove('scrolled');
            if (currentTheme === 'dark') {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
                header.style.boxShadow = 'none';
            } else {
                header.style.background = 'rgba(253, 246, 227, 0.95)';
                header.style.boxShadow = 'none';
            }
        }

        // Hide/show header on scroll (optional enhancement)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special animation for project cards
                if (entry.target.classList.contains('project-card')) {
                    const cards = document.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                        }, 100);
                    });
                }
                
                // Special animation for skill badges
                if (entry.target.classList.contains('skills-category')) {
                    const badges = entry.target.querySelectorAll('.skill-badge');
                    badges.forEach((badge, index) => {
                        setTimeout(() => {
                            badge.style.animation = `fadeInUp 0.4s ease-out ${index * 0.05}s both`;
                        }, 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    const projectCardsForObserver = document.querySelectorAll('.project-card');
    const skillsCategories = document.querySelectorAll('.skills-category');
    
    sections.forEach(section => observer.observe(section));
    projectCardsForObserver.forEach(card => observer.observe(card));
    skillsCategories.forEach(category => observer.observe(category));

    // Active Navigation Link Highlighting
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset + 200;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Form validation and styling
    formInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
            validateField(this);
        });

        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });

    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        const fieldGroup = field.parentElement;
        
        // Remove existing error styling
        fieldGroup.classList.remove('error');
        
        // Validation rules
        if (field.hasAttribute('required') && value === '') {
            showFieldError(fieldGroup, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldGroup, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Clear any existing errors
        clearFieldError(fieldGroup);
        return true;
    }

    function showFieldError(fieldGroup, message) {
        fieldGroup.classList.add('error');
        
        // Remove existing error message
        const existingError = fieldGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#D32F2F';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        fieldGroup.appendChild(errorDiv);
    }

    function clearFieldError(fieldGroup) {
        fieldGroup.classList.remove('error');
        const errorMessage = fieldGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Form submission with EmailJS
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Always prevent default for EmailJS
        
        // Validate all fields before submission
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showFormError('Please correct the errors above');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.background = 'linear-gradient(135deg, #888, #666)';
        
        // Send email using EmailJS
        emailjs.sendForm('service_igslx8h', 'template_6s9m5ip', contactForm)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                showFormSuccess();

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    formInputs.forEach(input => {
                        input.parentElement.classList.remove('focused');
                    });
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 3000);

            }, function(error) {
                console.log('FAILED...', error);
                showFormError('Failed to send message. Please try again or contact directly via email.');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            });
    });

    function showFormSuccess() {
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Message Sent Successfully!';
        submitButton.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
        }, 3000);
    }

    function showFormError(message) {
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = message;
        submitButton.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
    }

    // Typing Animation for Hero Section
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - scrolled / hero.offsetHeight;
        }
    });

    // Project Card Hover Effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill Badge Animation on Hover
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(2deg)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Smooth reveal animation for elements
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.about-content, .project-card, .skill-badge, .contact-content');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Profile Photo Error Handling
    const profilePhoto = document.querySelector('.profile-photo');
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    
    if (profilePhoto) {
        profilePhoto.addEventListener('error', function() {
            // Hide the image and show placeholder if photo fails to load
            this.style.display = 'none';
            if (profilePlaceholder) {
                profilePlaceholder.style.display = 'flex';
            }
        });
        
        profilePhoto.addEventListener('load', function() {
            // Hide placeholder when photo loads successfully
            if (profilePlaceholder) {
                profilePlaceholder.style.display = 'none';
            }
        });
    }

    // Initialize page
    revealOnScroll();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-location, .cta-button');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s both`;
            }, 500);
        });
    });

    // Add CSS for error styling
    const style = document.createElement('style');
    style.textContent = `
        .form-group.error .form-input,
        .form-group.error .form-textarea {
            border-color: #f44336;
            background-color: #ffebee;
        }
        
        .form-group.focused .form-label {
            color: var(--gold);
        }
        
        .nav-link.active {
            color: var(--gold);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        body.loaded {
            overflow-x: hidden;
        }
        
        @media (max-width: 768px) {
            .hamburger.active .bar:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .hamburger.active .bar:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active .bar:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Vintage Portfolio JavaScript loaded successfully!');
});
