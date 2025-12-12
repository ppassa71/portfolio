// 모바일 메뉴 토글
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // 햄버거 아이콘 애니메이션
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// 네비게이션 링크 클릭 시 메뉴 닫기
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// 스크롤 시 네비게이션 스타일 변경
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// 스무스 스크롤 (네비게이션 링크)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// CTA 버튼 스무스 스크롤
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector('#contact');
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Contact 폼 제출 처리
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 가져오기
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // 여기서 실제로는 서버로 데이터를 전송해야 합니다
        // 예시: fetch API를 사용하여 서버로 전송
        console.log('폼 제출:', formData);
        
        // 성공 메시지 표시
        alert('메시지가 성공적으로 전송되었습니다!');
        
        // 폼 초기화
        contactForm.reset();
    });
}

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ==================== 데이터 관리 ====================

// 로컬스토리지에서 데이터 로드
function loadData() {
    const projectsData = localStorage.getItem('projects');
    const skillsData = localStorage.getItem('skills');
    
    if (!projectsData) {
        // 초기 데이터 설정
        const initialProjects = [
            {
                id: 1,
                title: '디지털 전환 프로젝트',
                description: '기업의 디지털 전환을 주도한 대규모 프로젝트입니다. 일정 관리, 리스크 관리, 이해관계자 커뮤니케이션을 성공적으로 수행했습니다.',
                tags: ['프로젝트 관리', '일정 관리', '팀 리더십'],
                priority: 3,
                color: 1
            },
            {
                id: 2,
                title: '애자일 스프린트 관리',
                description: '애자일 방법론을 적용한 소프트웨어 개발 프로젝트입니다. 스프린트 계획, 일일 스탠드업, 회고를 통해 팀 생산성을 향상시켰습니다.',
                tags: ['애자일', '스크럼', '협업'],
                priority: 2,
                color: 2
            },
            {
                id: 3,
                title: '크로스 펑셔널 팀 리딩',
                description: '다양한 부서의 팀원들을 하나로 모아 프로젝트를 완수했습니다. 효과적인 커뮤니케이션과 리소스 최적화로 목표를 달성했습니다.',
                tags: ['팀 빌딩', '커뮤니케이션', '리소스 관리'],
                priority: 1,
                color: 3
            }
        ];
        localStorage.setItem('projects', JSON.stringify(initialProjects));
    }
    
    if (!skillsData) {
        // 초기 역량 데이터 설정
        const initialSkills = [
            {
                id: 1,
                title: '프로젝트 일정 관리',
                description: '복잡한 프로젝트 일정을 체계적으로 관리하고, 마일스톤 달성을 위한 효율적인 리소스 배분을 수행합니다.',
                tags: ['일정 관리', '리소스 배분', '마일스톤'],
                priority: 3
            },
            {
                id: 2,
                title: '팀 리더십',
                description: '다양한 배경의 팀원들을 하나로 모아 공동의 목표를 달성하기 위해 효과적인 리더십을 발휘합니다.',
                tags: ['리더십', '팀 빌딩', '동기부여'],
                priority: 2
            },
            {
                id: 3,
                title: '리스크 관리',
                description: '프로젝트 진행 중 발생할 수 있는 리스크를 사전에 식별하고 대응 전략을 수립하여 프로젝트 성공률을 높입니다.',
                tags: ['리스크 관리', '전략 수립', '문제 해결'],
                priority: 1
            }
        ];
        localStorage.setItem('skills', JSON.stringify(initialSkills));
    }
}

// 데이터 저장
function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function saveSkills(skills) {
    localStorage.setItem('skills', JSON.stringify(skills));
}

// 데이터 가져오기
function getProjects() {
    return JSON.parse(localStorage.getItem('projects') || '[]');
}

function getSkills() {
    return JSON.parse(localStorage.getItem('skills') || '[]');
}

// 우선순위로 정렬 (높은 우선순위가 먼저)
function sortByPriority(items) {
    return [...items].sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

// ==================== 프로젝트 렌더링 ====================

function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const projects = sortByPriority(getProjects());
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const card = createProjectCard(project);
        projectsGrid.appendChild(card);
    });
    
    // 관리자 모드에 따라 드래그 가능 속성 설정
    if (isAdminMode) {
        enableDragAndDrop();
    }
    
    // 애니메이션 적용
    const cards = projectsGrid.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);
    card.setAttribute('data-priority', project.priority || 0);
    card.draggable = isAdminMode; // 관리자 모드에서만 드래그 가능
    
    const colorClasses = {
        1: 'project-1',
        2: 'project-2',
        3: 'project-3'
    };
    
    // 이미지가 있으면 이미지 표시, 없으면 기본 색상 표시
    const imageHtml = project.image 
        ? `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">`
        : `<div class="project-image-placeholder ${colorClasses[project.color] || 'project-1'}"></div>`;
    
    card.innerHTML = `
        <div class="project-image">
            ${imageHtml}
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="#" class="project-link">자세히 보기 →</a>
        </div>
        <button class="edit-btn admin-only" onclick="editItem(${project.id}, 'project')" style="display: none;">✏️</button>
        <button class="delete-btn-card admin-only" onclick="deleteItem(${project.id}, 'project')" style="display: none;">🗑️</button>
    `;
    
    // 드래그 이벤트 추가
    setupDragAndDrop(card, 'project', project.id);
    
    return card;
}

// ==================== 역량 렌더링 ====================

function renderSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    const skills = sortByPriority(getSkills());
    
    skillsGrid.innerHTML = '';
    
    skills.forEach(skill => {
        const card = createSkillCard(skill);
        skillsGrid.appendChild(card);
    });
    
    // 관리자 모드에 따라 드래그 가능 속성 설정
    if (isAdminMode) {
        enableDragAndDrop();
    }
    
    // 애니메이션 적용
    const cards = skillsGrid.querySelectorAll('.skill-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.setAttribute('data-id', skill.id);
    card.setAttribute('data-priority', skill.priority || 0);
    card.draggable = isAdminMode; // 관리자 모드에서만 드래그 가능
    
    // 이미지가 있으면 이미지 표시
    const imageHtml = skill.image 
        ? `<div class="skill-image" style="margin-bottom: 1rem;"><img src="${skill.image}" alt="${skill.title}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 10px;"></div>`
        : '';
    
    card.innerHTML = `
        ${imageHtml}
        <h3 class="skill-title">${skill.title}</h3>
        <p class="skill-description">${skill.description}</p>
        <div class="skill-tags">
            ${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <button class="edit-btn admin-only" onclick="editItem(${skill.id}, 'skill')" style="display: none;">✏️</button>
        <button class="delete-btn-card admin-only" onclick="deleteItem(${skill.id}, 'skill')" style="display: none;">🗑️</button>
    `;
    
    // 드래그 이벤트 추가
    setupDragAndDrop(card, 'skill', skill.id);
    
    return card;
}

// ==================== Drag & Drop 기능 ====================

let draggedElement = null;
let draggedType = null;

function setupDragAndDrop(card, type, id) {
    // 드래그 시작
    card.addEventListener('dragstart', (e) => {
        if (!isAdminMode) {
            e.preventDefault();
            return;
        }
        draggedElement = card;
        draggedType = type;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', card.outerHTML);
        card.classList.add('dragging');
        e.dataTransfer.setDragImage(card, 0, 0);
    });
    
    // 드래그 종료
    card.addEventListener('dragend', (e) => {
        card.classList.remove('dragging');
        // 모든 카드에서 드래그 오버 효과 제거
        const allCards = type === 'project' 
            ? document.querySelectorAll('.project-card')
            : document.querySelectorAll('.skill-card');
        allCards.forEach(c => {
            c.classList.remove('drag-over');
        });
    });
    
    // 드래그 오버 (다른 카드 위에 있을 때)
    card.addEventListener('dragover', (e) => {
        if (!isAdminMode) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const afterElement = getDragAfterElement(
            type === 'project' ? document.getElementById('projectsGrid') : document.getElementById('skillsGrid'),
            e.clientY
        );
        
        const allCards = type === 'project' 
            ? document.querySelectorAll('.project-card')
            : document.querySelectorAll('.skill-card');
        
        allCards.forEach(c => c.classList.remove('drag-over'));
        
        if (afterElement == null) {
            card.classList.add('drag-over');
        } else {
            afterElement.classList.add('drag-over');
        }
    });
    
    // 드롭
    card.addEventListener('drop', (e) => {
        if (!isAdminMode) return;
        e.preventDefault();
        
        if (draggedElement && draggedElement !== card) {
            const grid = type === 'project' 
                ? document.getElementById('projectsGrid')
                : document.getElementById('skillsGrid');
            
            const afterElement = getDragAfterElement(grid, e.clientY);
            const draggedId = parseInt(draggedElement.getAttribute('data-id'));
            const targetId = parseInt(card.getAttribute('data-id'));
            
            if (afterElement == null) {
                grid.appendChild(draggedElement);
            } else {
                grid.insertBefore(draggedElement, afterElement);
            }
            
            // 우선순위 재계산 및 저장
            updatePriorities(type);
        }
        
        card.classList.remove('drag-over');
    });
    
    // 드래그 리브 (카드 영역을 벗어날 때)
    card.addEventListener('dragleave', (e) => {
        card.classList.remove('drag-over');
    });
}

// 드래그 위치 계산 함수
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.project-card:not(.dragging), .skill-card:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// 우선순위 업데이트 함수
function updatePriorities(type) {
    const grid = type === 'project' 
        ? document.getElementById('projectsGrid')
        : document.getElementById('skillsGrid');
    
    const cards = Array.from(grid.querySelectorAll(
        type === 'project' ? '.project-card' : '.skill-card'
    ));
    
    const items = type === 'project' ? getProjects() : getSkills();
    const maxPriority = cards.length;
    
    // 카드 순서대로 우선순위 재할당 (높은 숫자가 먼저 표시되므로 역순)
    cards.forEach((card, index) => {
        const id = parseInt(card.getAttribute('data-id'));
        const item = items.find(i => i.id === id);
        
        if (item) {
            item.priority = maxPriority - index;
            card.setAttribute('data-priority', item.priority);
        }
    });
    
    // 저장
    if (type === 'project') {
        saveProjects(items);
    } else {
        saveSkills(items);
    }
}

// ==================== 로그인 및 관리자 모드 ====================

// SHA-256 해시 함수
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// 기본 관리자 계정 정보 (사용자명과 비밀번호 모두 SHA-256 해시로 저장)
// 원본 사용자명: 'admin'
// 해시된 사용자명: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
// 원본 비밀번호: 'admin123'
// 해시된 비밀번호: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
const ADMIN_CREDENTIALS = {
    usernameHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // 'admin'의 SHA-256 해시
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9' // 'admin123'의 SHA-256 해시
};

let isAdminMode = false;
const adminToggle = document.getElementById('adminToggle');
const adminToggleText = document.getElementById('adminToggleText');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const adminModal = document.getElementById('adminModal');
const adminForm = document.getElementById('adminForm');

// 로그인 상태 확인
function checkLoginStatus() {
    const loginStatus = sessionStorage.getItem('isAdminLoggedIn');
    if (loginStatus === 'true') {
        isAdminMode = true;
        enableAdminMode();
    } else {
        disableAdminMode();
    }
}

// 관리자 모드 활성화
function enableAdminMode() {
    isAdminMode = true;
    document.body.classList.add('admin-mode');
    adminToggle.classList.add('logged-in');
    adminToggleText.textContent = '🚪';
    adminToggle.title = '로그아웃';
    
    // 관리 버튼 표시
    const adminOnlyElements = document.querySelectorAll('.admin-only');
    adminOnlyElements.forEach(el => {
        el.style.display = el.classList.contains('add-btn') ? 'block' : 'inline-block';
    });
    
    // 카드에 드래그 가능 속성 추가
    enableDragAndDrop();
}

// 관리자 모드 비활성화
function disableAdminMode() {
    isAdminMode = false;
    document.body.classList.remove('admin-mode');
    adminToggle.classList.remove('logged-in');
    adminToggleText.textContent = '🔐';
    adminToggle.title = '관리자 로그인';
    
    // 관리 버튼 숨김
    const adminOnlyElements = document.querySelectorAll('.admin-only');
    adminOnlyElements.forEach(el => {
        el.style.display = 'none';
    });
    
    // 드래그 비활성화
    disableDragAndDrop();
    
    // 모달 닫기
    loginModal.classList.remove('active');
    adminModal.classList.remove('active');
}

// 드래그 활성화
function enableDragAndDrop() {
    const projectCards = document.querySelectorAll('.project-card');
    const skillCards = document.querySelectorAll('.skill-card');
    
    projectCards.forEach(card => {
        card.draggable = true;
    });
    
    skillCards.forEach(card => {
        card.draggable = true;
    });
}

// 드래그 비활성화
function disableDragAndDrop() {
    const projectCards = document.querySelectorAll('.project-card');
    const skillCards = document.querySelectorAll('.skill-card');
    
    projectCards.forEach(card => {
        card.draggable = false;
    });
    
    skillCards.forEach(card => {
        card.draggable = false;
    });
}

// 로그인 모달 열기/닫기
function openLoginModal() {
    loginModal.classList.add('active');
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('username').focus();
}

function closeLoginModal() {
    loginModal.classList.remove('active');
    loginForm.reset();
    document.getElementById('loginError').style.display = 'none';
}

// 관리자 토글 버튼 클릭 이벤트
adminToggle.addEventListener('click', () => {
    if (isAdminMode) {
        // 로그아웃
        if (confirm('로그아웃 하시겠습니까?')) {
            sessionStorage.removeItem('isAdminLoggedIn');
            disableAdminMode();
        }
    } else {
        // 로그인 모달 열기
        openLoginModal();
    }
});

// 로그인 폼 제출
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // 입력한 사용자명과 비밀번호를 SHA-256으로 해시화
    const usernameHash = await sha256(username);
    const passwordHash = await sha256(password);
    
    // 해시화된 사용자명과 비밀번호 비교
    if (usernameHash === ADMIN_CREDENTIALS.usernameHash && passwordHash === ADMIN_CREDENTIALS.passwordHash) {
        // 로그인 성공
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        enableAdminMode();
        closeLoginModal();
    } else {
        // 로그인 실패
        errorDiv.style.display = 'block';
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
});

// 로그인 모달 닫기 이벤트
document.getElementById('closeLoginModal').addEventListener('click', closeLoginModal);
document.getElementById('cancelLoginBtn').addEventListener('click', closeLoginModal);

// 로그인 모달 외부 클릭 시 닫기
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeLoginModal();
    }
});

// 이미지 파일을 Base64로 변환
function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 이미지 미리보기 표시
function showImagePreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    
    input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB 제한
                alert('이미지 크기는 5MB 이하여야 합니다.');
                input.value = '';
                return;
            }
            const base64 = await convertImageToBase64(file);
            preview.innerHTML = `
                <img src="${base64}" alt="미리보기">
                <button type="button" class="remove-image" onclick="removeImagePreview('${inputId}', '${previewId}')">이미지 제거</button>
            `;
            preview.classList.add('active');
        }
    });
}

// 이미지 미리보기 제거
function removeImagePreview(inputId, previewId) {
    document.getElementById(inputId).value = '';
    document.getElementById(previewId).innerHTML = '';
    document.getElementById(previewId).classList.remove('active');
}

// 인라인 폼 열기/닫기
function openInlineForm(type, itemId = null) {
    // 로그인 확인
    if (!isAdminMode) {
        alert('관리자 권한이 필요합니다. 먼저 로그인해주세요.');
        openLoginModal();
        return;
    }
    
    const projectForm = document.getElementById('projectForm');
    const skillForm = document.getElementById('skillForm');
    
    // 다른 폼 숨기기
    if (type === 'project') {
        skillForm.style.display = 'none';
        projectForm.style.display = 'block';
        projectForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        const formTitle = projectForm.querySelector('.form-title');
        formTitle.textContent = itemId ? '프로젝트 수정' : '프로젝트 추가';
        
        const deleteBtn = document.getElementById('deleteProjectForm');
        deleteBtn.style.display = itemId ? 'block' : 'none';
        
        if (itemId) {
            // 수정 모드: 기존 데이터 로드
            const projects = getProjects();
            const project = projects.find(p => p.id === parseInt(itemId));
            
            if (project) {
                document.getElementById('projectFormId').value = project.id;
                document.getElementById('projectFormTitle').value = project.title;
                document.getElementById('projectFormDescription').value = project.description;
                document.getElementById('projectFormTags').value = project.tags.join(', ');
                document.getElementById('projectFormPriority').value = project.priority || 0;
                document.getElementById('projectFormColor').value = project.color || 1;
                
                // 이미지가 있으면 미리보기 표시
                const preview = document.getElementById('projectImagePreview');
                if (project.image) {
                    preview.innerHTML = `<img src="${project.image}" alt="미리보기"><button type="button" class="remove-image" onclick="removeImagePreview('projectFormImage', 'projectImagePreview')">이미지 제거</button>`;
                    preview.classList.add('active');
                } else {
                    preview.innerHTML = '';
                    preview.classList.remove('active');
                }
            }
        } else {
            // 추가 모드: 폼 초기화
            document.getElementById('projectInlineForm').reset();
            document.getElementById('projectFormId').value = '';
            document.getElementById('projectFormPriority').value = 0;
            document.getElementById('projectFormColor').value = 1;
            document.getElementById('projectImagePreview').innerHTML = '';
            document.getElementById('projectImagePreview').classList.remove('active');
        }
    } else {
        projectForm.style.display = 'none';
        skillForm.style.display = 'block';
        skillForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        const formTitle = skillForm.querySelector('.form-title');
        formTitle.textContent = itemId ? '역량 수정' : '역량 추가';
        
        const deleteBtn = document.getElementById('deleteSkillForm');
        deleteBtn.style.display = itemId ? 'block' : 'none';
        
        if (itemId) {
            // 수정 모드: 기존 데이터 로드
            const skills = getSkills();
            const skill = skills.find(s => s.id === parseInt(itemId));
            
            if (skill) {
                document.getElementById('skillFormId').value = skill.id;
                document.getElementById('skillFormTitle').value = skill.title;
                document.getElementById('skillFormDescription').value = skill.description;
                document.getElementById('skillFormTags').value = skill.tags.join(', ');
                document.getElementById('skillFormPriority').value = skill.priority || 0;
                
                // 이미지가 있으면 미리보기 표시
                const preview = document.getElementById('skillImagePreview');
                if (skill.image) {
                    preview.innerHTML = `<img src="${skill.image}" alt="미리보기"><button type="button" class="remove-image" onclick="removeImagePreview('skillFormImage', 'skillImagePreview')">이미지 제거</button>`;
                    preview.classList.add('active');
                } else {
                    preview.innerHTML = '';
                    preview.classList.remove('active');
                }
            }
        } else {
            // 추가 모드: 폼 초기화
            document.getElementById('skillInlineForm').reset();
            document.getElementById('skillFormId').value = '';
            document.getElementById('skillFormPriority').value = 0;
            document.getElementById('skillImagePreview').innerHTML = '';
            document.getElementById('skillImagePreview').classList.remove('active');
        }
    }
}

function closeInlineForm(type) {
    if (type === 'project') {
        document.getElementById('projectForm').style.display = 'none';
        document.getElementById('projectInlineForm').reset();
    } else {
        document.getElementById('skillForm').style.display = 'none';
        document.getElementById('skillInlineForm').reset();
    }
}

// 프로젝트 폼 제출
document.getElementById('projectInlineForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const itemId = document.getElementById('projectFormId').value;
    const title = document.getElementById('projectFormTitle').value;
    const description = document.getElementById('projectFormDescription').value;
    const tags = document.getElementById('projectFormTags').value.split(',').map(t => t.trim()).filter(t => t);
    const priority = parseInt(document.getElementById('projectFormPriority').value) || 0;
    const color = parseInt(document.getElementById('projectFormColor').value) || 1;
    const imageInput = document.getElementById('projectFormImage');
    
    let image = null;
    if (imageInput.files[0]) {
        image = await convertImageToBase64(imageInput.files[0]);
    } else {
        // 수정 모드에서 이미지가 이미 있으면 유지
        if (itemId) {
            const projects = getProjects();
            const existingProject = projects.find(p => p.id === parseInt(itemId));
            if (existingProject && existingProject.image) {
                image = existingProject.image;
            }
        }
    }
    
    const projects = getProjects();
    
    if (itemId) {
        // 수정
        const index = projects.findIndex(p => p.id === parseInt(itemId));
        if (index !== -1) {
            projects[index] = { ...projects[index], title, description, tags, priority, color, image };
        }
    } else {
        // 추가
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        projects.push({ id: newId, title, description, tags, priority, color, image });
    }
    
    saveProjects(projects);
    renderProjects();
    closeInlineForm('project');
});

// 역량 폼 제출
document.getElementById('skillInlineForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const itemId = document.getElementById('skillFormId').value;
    const title = document.getElementById('skillFormTitle').value;
    const description = document.getElementById('skillFormDescription').value;
    const tags = document.getElementById('skillFormTags').value.split(',').map(t => t.trim()).filter(t => t);
    const priority = parseInt(document.getElementById('skillFormPriority').value) || 0;
    const imageInput = document.getElementById('skillFormImage');
    
    let image = null;
    if (imageInput.files[0]) {
        image = await convertImageToBase64(imageInput.files[0]);
    } else {
        // 수정 모드에서 이미지가 이미 있으면 유지
        if (itemId) {
            const skills = getSkills();
            const existingSkill = skills.find(s => s.id === parseInt(itemId));
            if (existingSkill && existingSkill.image) {
                image = existingSkill.image;
            }
        }
    }
    
    const skills = getSkills();
    
    if (itemId) {
        // 수정
        const index = skills.findIndex(s => s.id === parseInt(itemId));
        if (index !== -1) {
            skills[index] = { ...skills[index], title, description, tags, priority, image };
        }
    } else {
        // 추가
        const newId = skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;
        skills.push({ id: newId, title, description, tags, priority, image });
    }
    
    saveSkills(skills);
    renderSkills();
    closeInlineForm('skill');
});

// 취소 버튼
document.getElementById('cancelProjectForm').addEventListener('click', () => {
    closeInlineForm('project');
});

document.getElementById('cancelSkillForm').addEventListener('click', () => {
    closeInlineForm('skill');
});

// 삭제 버튼
document.getElementById('deleteProjectForm').addEventListener('click', () => {
    const itemId = document.getElementById('projectFormId').value;
    if (itemId && confirm('정말 삭제하시겠습니까?')) {
        deleteItem(parseInt(itemId), 'project');
        closeInlineForm('project');
    }
});

document.getElementById('deleteSkillForm').addEventListener('click', () => {
    const itemId = document.getElementById('skillFormId').value;
    if (itemId && confirm('정말 삭제하시겠습니까?')) {
        deleteItem(parseInt(itemId), 'skill');
        closeInlineForm('skill');
    }
});

// 이미지 미리보기 초기화
showImagePreview('projectFormImage', 'projectImagePreview');
showImagePreview('skillFormImage', 'skillImagePreview');

// 삭제
function deleteItem(id, type) {
    // 로그인 확인
    if (!isAdminMode) {
        alert('관리자 권한이 필요합니다. 먼저 로그인해주세요.');
        openLoginModal();
        return;
    }
    
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    if (type === 'project') {
        const projects = getProjects().filter(p => p.id !== id);
        saveProjects(projects);
        renderProjects();
        closeInlineForm('project');
    } else {
        const skills = getSkills().filter(s => s.id !== id);
        saveSkills(skills);
        renderSkills();
        closeInlineForm('skill');
    }
}

// 수정
function editItem(id, type) {
    // 로그인 확인
    if (!isAdminMode) {
        alert('관리자 권한이 필요합니다. 먼저 로그인해주세요.');
        openLoginModal();
        return;
    }
    
    openInlineForm(type, id);
}

// 추가 버튼 이벤트
document.getElementById('addProjectBtn').addEventListener('click', () => {
    if (!isAdminMode) {
        alert('관리자 권한이 필요합니다. 먼저 로그인해주세요.');
        openLoginModal();
        return;
    }
    openInlineForm('project');
});

document.getElementById('addSkillBtn').addEventListener('click', () => {
    if (!isAdminMode) {
        alert('관리자 권한이 필요합니다. 먼저 로그인해주세요.');
        openLoginModal();
        return;
    }
    openInlineForm('skill');
});

// 초기화
loadData();
renderProjects();
renderSkills();
checkLoginStatus(); // 로그인 상태 확인
