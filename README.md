# 프로젝트 매니저 포트폴리오 웹사이트

모던하고 세련된 디자인의 프로젝트 매니저 포트폴리오 웹사이트입니다. HTML, CSS, 바닐라 JavaScript를 사용하여 구현되었으며, 반응형 디자인을 지원합니다.

## 주요 기능

### 1. 섹션 구성
- **히어로 섹션**: 인상적인 소개와 프로필 이미지
- **프로젝트 섹션**: 프로젝트 경험을 카드 형태로 표시
- **보유 역량 섹션**: 핵심 역량을 카드 형태로 표시
- **연락처 섹션**: 연락 정보 및 문의 폼

### 2. 관리자 기능
- **로그인 시스템**: SHA-256 해시 기반 인증
- **CRUD 기능**: 프로젝트 및 역량 추가/수정/삭제
- **우선순위 관리**: Drag & Drop으로 카드 순서 조정
- **이미지 업로드**: Base64 인코딩으로 이미지 저장 및 표시

### 3. 사용자 경험
- **반응형 디자인**: PC, 태블릿, 모바일 지원
- **부드러운 애니메이션**: 스크롤 및 호버 효과
- **인라인 편집**: 페이지에서 직접 항목 추가/수정
- **시각적 피드백**: 드래그 앤 드롭 시각 효과

## 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 모던 스타일링 및 애니메이션
- **JavaScript (ES6+)**: 바닐라 JavaScript
- **Web Crypto API**: SHA-256 해시 함수
- **LocalStorage**: 데이터 영구 저장
- **FileReader API**: 이미지 파일 처리

## 설치 및 실행

### 1. 파일 다운로드
```bash
git clone [repository-url]
cd portfolio
```

### 2. 로컬 서버 실행
파일을 직접 브라우저에서 열거나, 로컬 서버를 사용하는 것을 권장합니다.

**Python 사용 시:**
```bash
python -m http.server 8000
```

**Node.js 사용 시:**
```bash
npx http-server
```

**VS Code Live Server 확장 사용:**
- VS Code에서 `index.html` 파일 우클릭 → "Open with Live Server"

### 3. 브라우저에서 열기
```
http://localhost:8000
```

## 사용 방법

### 관리자 로그인

1. 상단 네비게이션의 🔐 버튼 클릭
2. 로그인 정보 입력:
   - 사용자명: `admin`
   - 비밀번호: `admin123`

### 프로젝트/역량 관리

#### 항목 추가
1. 관리자 모드에서 각 섹션의 "+ 추가" 버튼 클릭
2. 인라인 폼에 정보 입력
3. 이미지 업로드 (선택사항)
4. "저장" 버튼 클릭

#### 항목 수정
1. 카드의 ✏️ 버튼 클릭
2. 폼에서 정보 수정
3. "저장" 버튼 클릭

#### 항목 삭제
1. 수정 모드에서 "삭제" 버튼 클릭
2. 확인 메시지에서 확인

#### 우선순위 조정
1. 관리자 모드에서 카드를 드래그
2. 원하는 위치에 드롭
3. 우선순위가 자동으로 재계산되어 저장됨

### 이미지 업로드

- 지원 형식: 모든 이미지 형식 (JPG, PNG, GIF 등)
- 최대 크기: 5MB
- 저장 방식: Base64 인코딩으로 로컬스토리지에 저장
- 미리보기: 업로드 전 이미지 미리보기 제공

## 파일 구조

```
portfolio/
├── index.html          # 메인 HTML 파일
├── styles.css         # 스타일시트
├── script.js          # JavaScript 로직
└── README.md          # 프로젝트 문서
```

## 주요 기능 상세

### 데이터 저장
- 모든 데이터는 브라우저의 LocalStorage에 저장됩니다
- 새로고침 후에도 데이터가 유지됩니다
- 브라우저 데이터를 삭제하면 초기 데이터로 복원됩니다

### 보안
- 사용자명과 비밀번호는 SHA-256 해시로 저장됩니다
- 관리자 기능은 로그인 후에만 사용 가능합니다
- 로그인 상태는 세션 스토리지에 저장됩니다 (브라우저 탭 닫으면 로그아웃)

### 반응형 디자인
- 데스크톱: 그리드 레이아웃으로 여러 카드 표시
- 태블릿: 2열 레이아웃
- 모바일: 1열 레이아웃, 햄버거 메뉴

## 커스터마이징

### 계정 정보 변경
`script.js` 파일의 `ADMIN_CREDENTIALS` 객체에서 계정 정보를 변경할 수 있습니다:

```javascript
const ADMIN_CREDENTIALS = {
    usernameHash: '해시값',  // 원하는 사용자명의 SHA-256 해시
    passwordHash: '해시값'   // 원하는 비밀번호의 SHA-256 해시
};
```

해시값 계산 방법:
```javascript
// 브라우저 콘솔에서 실행
async function getHash(text) {
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
getHash('새사용자명').then(console.log);
getHash('새비밀번호').then(console.log);
```

### 색상 테마 변경
`styles.css` 파일의 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```css
:root {
    --primary-color: #2563eb;    /* 주 색상 */
    --secondary-color: #1e40af;  /* 보조 색상 */
    /* ... */
}
```

## 브라우저 호환성

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 라이선스

이 프로젝트는 개인 포트폴리오 용도로 자유롭게 사용할 수 있습니다.

## 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

**개발자**: 프로젝트 매니저 포트폴리오  
**버전**: 1.0.0  
**최종 업데이트**: 2024

