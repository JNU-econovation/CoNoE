# CoNoE

**CoNoE**는 인공지능 기반 얼굴 인식 출석 체크 기능이 포함된 웹 화상 채팅 서비스입니다. 이 프로젝트는 가상 회의에서 출석 관리를 자동화하고 간소화하는 것을 목표로 합니다.

## 설치 방법

### 백엔드 실행 방법 (`src/backend`)

1. 백엔드 디렉터리로 이동:
   ```bash
   cd src/backend
   ```

2. 필요한 패키지 설치:
   ```bash
   pip install -r requirements.txt
   ```

3. 백엔드 서버 실행:
   ```bash
   python manage.py runserver
   ```

### 프론트엔드 실행 방법 (`src/frontend`)

1. 프론트엔드 디렉터리로 이동:
   ```bash
   cd src/frontend
   ```

2. 필요한 패키지 설치:
   ```bash
   npm install
   ```

3. 프론트엔드 서버 실행:
   ```bash
   npm start
   ```

## 사용 방법

- 백엔드와 프론트엔드 서버가 모두 실행 중이어야 합니다.
- 웹 브라우저에서 `http://localhost:3000`에 접속합니다.
- 회의를 시작하면 시스템이 얼굴 인식을 통해 출석을 자동으로 관리합니다.
