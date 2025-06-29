// Chapter Scripts - Shared across all chapters
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    initTooltips();
    
    // Initialize tabs
    initTabs();
    
    // Initialize collapsible sections
    initCollapsibles();
    
    // Add copy button to code blocks
    addCopyButtonsToCodeBlocks();
    
    // Add smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Add table of contents
    generateTableOfContents();
});

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function(e) {
            const tooltipText = this.querySelector('.tooltiptext');
            if (tooltipText) {
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            }
        });
        
        tooltip.addEventListener('mouseleave', function(e) {
            const tooltipText = this.querySelector('.tooltiptext');
            if (tooltipText) {
                tooltipText.style.visibility = 'hidden';
                tooltipText.style.opacity = '0';
            }
        });
    });
}

// Initialize tabs
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs-container');
    
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        const tabContents = container.querySelectorAll('.tab-content');
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                if (tabContents[index]) {
                    tabContents[index].classList.add('active');
                }
            });
        });
        
        // Activate first tab by default
        if (tabs.length > 0 && tabContents.length > 0) {
            tabs[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    });
}

// Initialize collapsible sections
function initCollapsibles() {
    const collapsibles = document.querySelectorAll('.collapsible');
    
    collapsibles.forEach(collapsible => {
        const header = collapsible.querySelector('.collapsible-header');
        const content = collapsible.querySelector('.collapsible-content');
        const icon = header.querySelector('.collapsible-icon');
        
        if (header && content) {
            header.addEventListener('click', () => {
                const isOpen = content.style.maxHeight;
                
                // Close all other collapsibles in the same group
                if (collapsible.dataset.group) {
                    document.querySelectorAll(`.collapsible[data-group="${collapsible.dataset.group}"]`).forEach(item => {
                        if (item !== collapsible) {
                            const otherContent = item.querySelector('.collapsible-content');
                            const otherIcon = item.querySelector('.collapsible-icon');
                            if (otherContent) otherContent.style.maxHeight = null;
                            if (otherIcon) otherIcon.textContent = '+';
                            item.classList.remove('active');
                        }
                    });
                }
                
                // Toggle current collapsible
                if (isOpen) {
                    content.style.maxHeight = null;
                    if (icon) icon.textContent = '+';
                    collapsible.classList.remove('active');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    if (icon) icon.textContent = '−';
                    collapsible.classList.add('active');
                }
            });
        }
    });
}

// Add copy button to code blocks
function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.title = 'Copy to clipboard';
        copyButton.innerHTML = '<i class="far fa-copy"></i>';
        
        // Position button
        block.style.position = 'relative';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '10px';
        copyButton.style.right = '10px';
        copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '4px';
        copyButton.style.padding = '5px 8px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.color = '#fff';
        copyButton.style.transition = 'all 0.3s';
        
        copyButton.addEventListener('mouseenter', () => {
            copyButton.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        copyButton.addEventListener('mouseleave', () => {
            copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        // Add click event
        copyButton.addEventListener('click', () => {
            const code = block.querySelector('code') || block;
            const textArea = document.createElement('textarea');
            textArea.value = code.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Show copied feedback
            const originalTitle = copyButton.title;
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.title = 'Copied!';
            
            setTimeout(() => {
                copyButton.innerHTML = '<i class="far fa-copy"></i>';
                copyButton.title = originalTitle;
            }, 2000);
        });
        
        // Add button to block
        block.appendChild(copyButton);
    });
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Initialize interactive elements
function initInteractiveElements() {
    // Add animation to content cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.content-card, .section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Handle animation classes
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.content-card, .section').forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.9) && 
                            (rect.bottom >= 0);
            
            if (isVisible) {
                el.classList.add('animate');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });
}

// Generate table of contents
function generateTableOfContents() {
    const tocContainer = document.getElementById('table-of-contents');
    if (!tocContainer) return;
    
    const headings = document.querySelectorAll('h2, h3');
    if (headings.length === 0) {
        tocContainer.style.display = 'none';
        return;
    }
    
    let tocHTML = '<h3>Table of Contents</h3><ul class="toc-list">';
    let currentLevel = 2; // Start with h2
    
    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.substring(1));
        const id = heading.id || `heading-${index}`;
        heading.id = id;
        
        // Add margin based on heading level
        const marginLeft = (level - 2) * 20;
        
        if (level > currentLevel) {
            tocHTML += '<ul class="toc-sublist">';
        } else if (level < currentLevel) {
            tocHTML += '</li>'.repeat(currentLevel - level);
            if (currentLevel - level > 1) {
                tocHTML += '</ul>';
            }
        } else if (index > 0) {
            tocHTML += '</li>';
        }
        
        tocHTML += `<li style="margin-left: ${marginLeft}px"><a href="#${id}">${heading.textContent}</a>`;
        currentLevel = level;
    });
    
    // Close any open lists and list items
    tocHTML += '</li>'.repeat(currentLevel - 1) + '</ul>';
    tocContainer.innerHTML = tocHTML;
    
    // Make TOC sticky on scroll
    const toc = document.querySelector('.toc-container');
    if (toc) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 200) {
                toc.classList.add('sticky');
            } else {
                toc.classList.remove('sticky');
            }
        });
    }
}

// Helper function to debounce function calls
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Make functions available globally
window.initTooltips = initTooltips;
window.initTabs = initTabs;
window.initCollapsibles = initCollapsibles;
