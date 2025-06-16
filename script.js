document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  // Check for saved theme preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'light-mode') {
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light-mode');
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      localStorage.setItem('theme', '');
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  });

  // Create particles
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.bottom = `-${size}px`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    particlesContainer.appendChild(particle);
  }

  // Avatar hover effect
  const avatar = document.getElementById('avatar');
  avatar.addEventListener('mouseenter', () => {
    avatar.style.transform = 'scale(1.1) rotate(5deg)';
    avatar.style.borderColor = 'var(--secondary)';
  });
  
  avatar.addEventListener('mouseleave', () => {
    avatar.style.transform = 'scale(1)';
    avatar.style.borderColor = 'var(--primary)';
  });

  // GitHub Repos Fetch
  async function fetchGitHubRepos() {
    const username = 'Pulse-External-Team';
    const container = document.getElementById('github-repos');
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      const repos = await response.json();
      
      container.innerHTML = repos.map(repo => `
        <div class="repo-card">
          <div class="repo-content">
            <h3 class="repo-title">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </h3>
            <p class="repo-description">${repo.description || 'No description provided'}</p>
            <div class="repo-meta">
              ${repo.language ? `
                <div class="repo-language">
                  <span class="language-dot" style="background-color: ${getLanguageColor(repo.language)}"></span>
                  ${repo.language}
                </div>
              ` : ''}
              <div><i class="fas fa-star"></i> ${repo.stargazers_count}</div>
              <div><i class="fas fa-code-branch"></i> ${repo.forks_count}</div>
            </div>
          </div>
        </div>
      `).join('');
      
    } catch (error) {
      container.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Could not load GitHub repositories</p>
        </div>
      `;
      console.error('Error fetching GitHub repos:', error);
    }
  }

  // Language color mapping
  function getLanguageColor(language) {
    const colors = {
      'C#': '#178600',
      'Python': '#3572A5',
      'JavaScript': '#f1e05a',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Shell': '#89e051'
    };
    return colors[language] || '#ccc';
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section, .hero').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Load GitHub repos
  fetchGitHubRepos();
});
