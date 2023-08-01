# movie_project

# 📑 목차

- [프로젝트 소개](#-프로젝트-소개)
- [기술 스택](#-기술-스택)
- [주요 기능 및 상세](#-주요-기능-및-상세)

# 👋 프로젝트 소개

<div align="center">
  <img width="200" alt="image" src="./client/src/images/reviewIcon5.png">
</div>
<div align="center">
<h1>FilmView.</h1>
</div>
<br></br>
  
#### 쉼표는 숙소를 직접 등록하거나 예약할 수 있는 통합 숙박예약 서비스입니다.

### [쉼표 바로가기](https://shimpyo.o-r.kr/)

### [쉼표 시연영상](https://www.youtube.com/watch?v=RbrhiM4ybgI)

<br/>

# 📅 프로젝트 기간

> 2023. 06 ~ 2023. 07

# 👪 멤버 구성

| 이름   | 역할    | 기능                                              |
|-------|---------|---------------------------------------------------|
| 박현준 | 팀원    | 숙소 목록 조회, 숙소 단건 세부사항 조회, 관심 숙소, 결제 |
| 신성우 | 팀원    | 숙소 및 객실 CRUD, 호스팅 페이지(예약현황 조회) |
| 정채운 | 팀원    | AWS EC2 서버 구축, 배포 자동화, SSL/TLS 인증서, 코드 스플릿팅, <br> 사용자 인증 및 계정 관리, 예약내역, 내 정보, 관심숙소 페이지 |

# 🔧 기술 스택

- Core:React18, TypeScript, Recoil
- CSS: Styled-Component, MaterialUI
- Code Management:Git, GitHub
- DevOps:AWS EC2, NGINX, GitHub Actions
- Communication: Slack, GoogleDocs 

# 💻 주요 기능 및 상세

## 📌 주요 기능
#### 로그인 - <a href="https://github.com/jchwoon/shimpyo_front/wiki/Login" >상세보기 - WIKI 이동</a>
- 소셜로그인
- ID찾기, PW찾기
- 로그인 시 access, refresh 토큰 발급
#### 회원가입 - <a href="https://github.com/jchwoon/shimpyo_front/wiki/Member" >상세보기 - WIKI 이동</a>
- ID, 패스워드, 닉네임 유효성 검사
- ID, 닉네임 중복체크
#### 계정 페이지 - <a href="https://github.com/jchwoon/shimpyo_front/wiki/Member" >상세보기 - WIKI 이동</a>
- 회원 탈퇴
- 회원정보 변경
#### 예약내역 페이지 - <a href="https://github.com/Project-Shimpyo/front/wiki/Login" >상세보기 - WIKI 이동</a>
- 예약내역, 이용내역, 취소내역 카테고리 화
- 페이지 네이션
- 이용내역에 대한 리뷰 작성
#### 예약상세 페이지 - <a href="https://github.com/Project-Shimpyo/front/wiki/Login" >상세보기 - WIKI 이동</a>
- 해당 숙소에 대한 상세 조회
- 인원 수정, 예약 취소,
- 이미지 슬라이드
#### 관심 숙소 페이지 - <a href="https://github.com/Project-Shimpyo/front/wiki/Login" >상세보기 - WIKI 이동</a>
- 관심 숙소 조회 및 삭제
- 숙소 클릭시 해당 숙소의 detail페이지로 이동
- 최대 20개 제한
#### 메인페이지 <a href="https://github.com/Project-Shimpyo/front/wiki/Main" >상세보기 - WIKI 이동</a>
- 검색을 통한 숙소 필터링
- ❤ 클릭시 관심 숙소 저장
#### 상세 페이지 <a href="https://github.com/Project-Shimpyo/front/wiki/Detail" >상세보기 - WIKI 이동</a>
- 해당 숙소 세부 조회
- 해당 숙소 예약 가능 여부 확인
- 해당 숙소 예약 및 결제
#### 숙소 관리 페이지 - <a href="https://github.com/Project-Shimpyo/front/wiki/Host" >상세보기 - WIKI 이동</a>
- 등록한 숙소에 대한 수정, 삭제
- 해당 숙소에 예약된 건수 확인
#### 숙소 등록 페이지 - <a href="https://github.com/Project-Shimpyo/front/wiki/Host" >상세보기 - WIKI 이동</a>
- 단계에 따른 숙소 등록(사진, 숙소 기본 정보, 편의 시설, 위치, 객실)
#### 숙소 수정 페이지 - <a href="https://github.com/Project-Shimpyo/front/wiki/Host" >상세보기 - WIKI 이동</a>
- 사진, 숙소 기본 정보, 편의 시설, 위치, 객실을 각각 수정 가능

<br/>
