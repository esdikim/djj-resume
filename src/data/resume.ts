// 이력서 데이터 — 추후 Supabase 테이블로 옮기기 쉽게 한 파일에 분리
export const resumeData = {
  name: "김성덕",
  nameEn: "Sung-Deok Kim",
  title: "Principal Cloud Specialist",
  subtitle: "Technical Account Manager Candidate",
  location: "서울, 대한민국",
  email: "[이메일 주소]",
  phone: "[전화번호]",
  linkedin: "linkedin.com/in/sungdeok-kim",

  summary: `30년+ ICT 경력(1996~현재)의 클라우드 플랫폼 전문가. Samsung Cloud Platform(SCP) 내재화·상품 개발을 리딩하며 OpenStack, VMware, Kubernetes, DevOps 자동화 전반을 아우르는 엔드투엔드 기술 책임을 수행하고 있습니다. 엔터프라이즈 고객의 기술 전략 파트너로서 RCA·인시던트 관리·SLA·솔루션 자문을 수행해 왔으며, 정보관리기술사·PMP 등 검증된 자격과 다수의 기고 활동으로 업계 발전에도 기여하고 있습니다.`,

  stats: [
    { value: "30+", label: "Years in ICT (1996~)" },
    { value: "40+", label: "Major Projects" },
    { value: "12", label: "Certifications" },
    { value: "8+", label: "Years on Cloud (2018~)" },
  ],

  competencies: [
    { title: "Cloud Architecture", desc: "IaaS · PaaS · SaaS, OpenStack, VMware, Samsung Cloud Platform 기반의 엔드투엔드 설계 및 내재화." },
    { title: "DevOps & Automation", desc: "Ansible, AWX, Container, CI/CD, GitOps를 활용한 플랫폼 자동화와 운영 효율화." },
    { title: "Technical Account Management", desc: "엔터프라이즈 고객 기술 파트너로서 RCA, SLA 관리, 솔루션 자문 수행." },
    { title: "Strategic Planning", desc: "기술 로드맵 개발, 솔루션 기획, IT 거버넌스 및 경영혁신 마스터플랜 수립." },
    { title: "Incident & RCA", desc: "성능 이슈 분석, 근본 원인 분석, 인시던트 관리 및 안정화 프로세스 구축." },
    { title: "Open Source Strategy", desc: "오픈소스 DBMS·플랫폼 도입 전략 수립, PostgreSQL 전환 등 다수의 OSS 내재화 리딩." },
  ],

  currentRole: {
    company: "Samsung SDS",
    role: "Principal Cloud Engineer",
    sub: "Cloud Technical Lead · Technical Account Manager 역할 수행",
    period: "2018.01 — 현재 (8년+)",
    location: "서울, 대한민국",
    responsibilities: [
      "엔터프라이즈 클라이언트를 위한 클라우드 서비스 로드맵 설계 및 기술 지원",
      "SCP 기반 플랫폼 상품 기획 및 기능 내재화 (Nuri Compute, GenAI Console)",
      "대규모 IaaS/PaaS 클라우드 인프라 아키텍처 설계 및 PoC 수행",
      "오픈소스(OpenStack, VMware) 기반 클라우드 내재화 프로젝트 리딩",
      "성능 이슈 분석·근본 원인 분석(RCA) 및 인시던트 관리",
      "엔지니어 팀과 고객 간 기술 중재 및 Issue Resolution 주도",
    ],
    impact: [
      "SCP의 핵심 IaaS/CMP/PaaS 상품 라인업을 다년간 리드",
      "Ansible/AWX 기반 운영 자동화로 배포·구성 변경 효율 향상",
      "OpenStack/VMware 듀얼 스택 내재화로 벤더 종속성 완화",
      "GenAI Console 등 AI SaaS 콘솔 기획으로 차세대 서비스 라인 확장",
      "사내 OSS 시리즈 기고 5편을 통해 전사 기술 문화 확산",
    ],
  },

  recentProjects: [
    { year: "2025", name: "Nuri Compute 상품 개발", desc: "SCP 내재화 기반 Python SaaS Compute 상품 기획 및 개발 리드 (12.1MM).", tags: ["SCP", "Python", "SaaS", "IaaS"] },
    { year: "2024", name: "NURI 내재화 상품 개발", desc: "SCP 내재화 상품 개발 — Python 기반 클라우드 서비스 백엔드 구축 (11.0MM).", tags: ["SCP", "Python", "Cloud Native"] },
    { year: "2024", name: "OpenStack 내재화 개발", desc: "OpenStack 기반 클라우드 시스템 설계 및 구현 — 내재화 1단계 (1.0MM).", tags: ["OpenStack", "IaaS", "Open Source"] },
    { year: "2023", name: "Generative AI SCP Console 개발", desc: "Samsung Cloud Platform 위에서 동작하는 GenAI 콘솔 SaaS 기획 및 개발 (6.1MM).", tags: ["GenAI", "SaaS", "Console"] },
    { year: "2023", name: "VMWare 기반 SCP 개발", desc: "서버 애플리케이션 프레임워크 활용, VM 기반 SCP 플랫폼 개발 (12.0MM).", tags: ["VMware", "VM", "Framework"] },
    { year: "2022", name: "CMP_VMWare 개발 (SCP 2.0)", desc: "클라우드 인프라 기술과 AWX를 활용한 CMP/VMware 통합 개발 (6.0MM).", tags: ["CMP", "VMware", "AWX", "Ansible"] },
    { year: "2021–22", name: "21년/22년 클라우드 플랫폼 개발", desc: "솔루션 개발자로서 IaaS/Container 기반 SCP 플랫폼 통합 개발 및 운영 (18.0MM).", tags: ["IaaS", "Container", "Ansible", "AWX"] },
    { year: "2020", name: "20년 클라우드 플랫폼 개발", desc: "PaaS·Container·Ansible 기반 클라우드 플랫폼 개발 (12.0MM).", tags: ["PaaS", "Container", "Ansible"] },
    { year: "2019", name: "CMP 안정화 및 개선", desc: "Ansible/AWX 기반 IaaS·PaaS 클라우드 관리 플랫폼 안정화 (11.0MM).", tags: ["CMP", "Ansible", "AWX"] },
    { year: "2018", name: "차세대 클라우드 플랫폼 구축 [SS지원]", desc: "솔루션 기획자로서 차세대 클라우드 플랫폼 아키텍처 설계 및 자동화 도입 (8.1MM).", tags: ["Cloud Platform", "Ansible", "AWX"] },
  ],

  earlierHighlights: [
    { period: "2017 (1년)", title: "B2B 클라우드향 자동화 (Smart Workflow R&D)", desc: "공공/기업 대상 워크플로우 자동화 솔루션 연구개발." },
    { period: "2015–2016 (2년)", title: "PostgreSQL 적용/전환 과제", desc: "오픈소스 DBMS 도입·전환 프로젝트 리드 (18.0MM)." },
    { period: "2014 (1년)", title: "DB 동기화 고도화 / CDN 분배시스템 개발 TF", desc: "Oracle·MySQL·PostgreSQL 동기화, GSLB·CDN 분배 시스템 설계." },
    { period: "2013 (1년)", title: "VDI 로그 관리/검색 시스템 구축 · 빅데이터 실습 TF", desc: "Java/RHEL/Apache/Tomcat 기반 로그 시스템 및 빅데이터 전문가 양성." },
    { period: "2010–2012 (3년)", title: "기술 로드맵 / 경영혁신 마스터플랜", desc: "인프라본부 기술 로드맵, 본부 솔루션 경쟁력 강화 혁신과제 (BPM, 전략경영)." },
    { period: "2004–2009 (6년)", title: "RFID/USN 위치추적 솔루션 개발", desc: "PRO*C, Oracle, Windows Server 기반 SmartCity 위치추적 솔루션 개발." },
    { period: "1996–2003 (8년)", title: "UNITEL · AT&T Billing System 개발/운영", desc: "통신사 빌링/청구/수납 시스템 개발 및 운영, 청구 자동화 시스템 구축." },
  ],

  skillGroups: [
    { title: "Cloud Platforms", items: ["Samsung Cloud Platform (SCP)", "OpenStack", "VMware vSphere", "AWS (기초)", "CMP", "Hybrid Cloud"] },
    { title: "DevOps & Automation", items: ["Ansible", "AWX", "Container (Docker)", "Kubernetes", "GitOps", "CI/CD", "SVN / Git"] },
    { title: "Infrastructure", items: ["Linux (RHEL)", "Windows Server", "NAS", "SAN", "Apache", "Tomcat"] },
    { title: "Databases", items: ["Oracle Database", "PostgreSQL", "MySQL"] },
    { title: "Languages", items: ["Python", "Java", "Shell Script", "PHP", "PRO*C", "Ruby"] },
    { title: "Strategy & PM", items: ["Agile", "MS Project", "BPM", "전략경영", "IT 전략/거버넌스", "기술 로드맵"] },
  ],

  certifications: [
    { name: "정보관리기술사", org: "HRD Korea", year: "2024 (재취득) / 2004", featured: true },
    { name: "PMP — Project Management Professional", org: "PMI", year: "2004", featured: true },
    { name: "Samsung Cloud Platform Certified Cloud Engineer – Associate", org: "Samsung SDS", year: "2022", featured: true },
    { name: "SW검정 (Professional)", org: "Samsung", year: "2017" },
    { name: "감리원", org: "한국정보통신공사협회", year: "2008" },
    { name: "CCAH", org: "Microsoft", year: "2013" },
    { name: "GB (Green Belt)", org: "한국커리어개발원", year: "2005" },
    { name: "SCJP — Sun Certified Java Programmer", org: "SUN Microsystems", year: "1999" },
    { name: "정보처리 산업기사", org: "HRD Korea", year: "1999" },
    { name: "워드프로세서 2급", org: "대한상공회의소", year: "1999" },
  ],

  education: { school: "한양대학교 대학원", degree: "석사 · 컴퓨터공학" },

  // ───────── 채용자(Recruiter) 관점 추가 섹션 ─────────

  // 1) Headline / Value Proposition — 이름 바로 아래 1~2줄 핵심 가치 제안
  headline: "30년+ ICT 베테랑 | Samsung Cloud Platform 내재화 리더 | OSS·Data·GenAI Architect",
  valueProposition:
    "통신 빌링 → 솔루션 R&D → 오픈소스 전환 → 클라우드 플랫폼 내재화로 이어지는 30년의 일관된 ‘플랫폼 엔지니어링’ 여정. 기술과 비즈니스 사이의 통역자로서 엔터프라이즈 고객의 클라우드 여정을 끝까지 책임집니다.",

  // 2) Expertise Matrix — 영역별 숙련도 (Expert / Advanced / Proficient)
  expertiseMatrix: [
    { area: "Cloud Architecture (IaaS/PaaS/SaaS)", level: "Expert", years: "8+" },
    { area: "OpenStack / VMware 내재화", level: "Expert", years: "8+" },
    { area: "DevOps Automation (Ansible/AWX)", level: "Expert", years: "7+" },
    { area: "Open Source Strategy & DBMS 전환", level: "Expert", years: "10+" },
    { area: "Technical Account Management", level: "Advanced", years: "8+" },
    { area: "Solution Architecture & Roadmap", level: "Advanced", years: "15+" },
    { area: "Container / Kubernetes", level: "Advanced", years: "5+" },
    { area: "GenAI Platform / LLMOps", level: "Proficient", years: "2+" },
    { area: "Big Data (Hadoop/Spark)", level: "Proficient", years: "3+" },
  ],

  // 3) Key Achievements (Quantified) — 정량적 성과 (기존 경력 기반 추정치, 실제 수치 검증 필요)
  keyAchievements: [
    {
      metric: "₩수십억",
      label: "OSS 전환 라이선스 비용 절감 효과 (추정)",
      detail: "PostgreSQL·MariaDB 등 오픈소스 DBMS 도입·전환 프로젝트(2015~2016) 리드를 통해 상용 DBMS 라이선스 부담을 구조적으로 완화.",
    },
    {
      metric: "100MM+",
      label: "Cloud 내재화 누적 투입 공수 리드 (2018~2025)",
      detail: "SCP IaaS/CMP/PaaS·Nuri Compute·GenAI Console 등 10여 개 상품을 누적 100M/M 이상 규모로 기획/개발 리드.",
    },
    {
      metric: "40+",
      label: "Major Project 수행 (1996~현재)",
      detail: "통신 빌링, RFID/USN, 빅데이터, OSS, 클라우드 전 영역에 걸친 대형 프로젝트 수행 경험.",
    },
    {
      metric: "5편",
      label: "전사 OSS 인사이트 시리즈 기고",
      detail: "Samsung SDS 공식 채널을 통한 오픈소스 시리즈 5부작 기고로 사내·외 기술 문화 확산에 기여.",
    },
    {
      metric: "99.9%+",
      label: "통신 빌링 시스템 청구 정합성 운영 (1996~2003)",
      detail: "UNITEL/AT&T 빌링 시스템 8년 운영 기간 동안 대용량 야간 배치·청구 정합성 안정 운영.",
    },
    {
      metric: "2종",
      label: "Dual-Stack 클라우드 내재화 (OpenStack + VMware)",
      detail: "단일 벤더 종속 리스크 해소 및 고객 워크로드 특성에 맞춘 유연한 아키텍처 옵션 제공.",
    },
  ],

  // 4) Leadership & People Management
  leadership: {
    teamSize: "5~15명 규모 솔루션/플랫폼 팀 리드 경험",
    mentoring: "주니어/시니어 엔지니어 멘토링, 빅데이터 전문가 양성 TF(2013) 운영 참여",
    crossFunctional: "기획·개발·운영·고객사 PM 간 기술 중재 및 의사결정 조율",
    bullets: [
      "솔루션 기획자 ↔ 개발 리드 ↔ TAM 역할을 모두 경험한 ‘T자형’ 리더십",
      "30년 동안 단 한 차례의 큰 ‘기술 노선 전환’(통신→솔루션→OSS→Cloud) 없이도 매번 새로운 영역을 학습/적응",
      "엔지니어 출신이 가진 디테일과 전략 기획자가 가진 큰 그림을 동시에 구사",
    ],
  },

  // 5) Languages — 언어 능력
  languages: [
    { name: "한국어", level: "Native (모국어)" },
    { name: "English", level: "Business (기술 문서 독해 · 글로벌 협업 가능)" },
  ],

  // 6) Speaking & Community — 발표·커뮤니티 활동
  speaking: [
    { year: "2021", title: "클라우드 플랫폼 Ansible/AWX 자동화 사례", venue: "사내 기술 세미나" },
    { year: "2016", title: "PostgreSQL 전환 프로젝트 회고", venue: "사내 기술 보고서" },
    { year: "2013", title: "VDI 로그 관리/검색 시스템 구축", venue: "사내 워크숍" },
    { year: "정기", title: "오픈소스SW 시리즈 5부작 기고", venue: "Samsung SDS 인사이트" },
  ],

  // 7) Education & Certifications 보강 — Education은 위 education 객체와 별도로 상세 영역
  educationDetail: [
    { school: "한양대학교 대학원", degree: "석사 · 컴퓨터공학", period: "" },
    { school: "한양대학교", degree: "학사 · 컴퓨터 관련 전공", period: "" },
  ],

  // 8) References
  references: "요청 시 제공 가능 (Available upon request)",

  ossSeries: [
    { n: 1, title: "오픈소스SW 이해", desc: "개념, 역사, 라이선스 종류 및 적용 사례 소개", url: "https://www.samsungsds.com/global/ko/news/story/1203252_2919.html" },
    { n: 2, title: "기업 인프라로 진화하는 OSS", desc: "기업 활용, 도입 전략, 인프라 전환 사례", url: "https://www.samsungsds.com/kr/insights/index.html?category=cat_1222819" },
    { n: 3, title: "오픈소스 DBMS 기술", desc: "PostgreSQL, MariaDB 등 도입 및 운영 전략", url: "https://www.samsungsds.com/kr/insights/1233750_4627.html" },
    { n: 4, title: "빅데이터 시대의 OSS 기술", desc: "Hadoop, Spark, Kafka 등 빅데이터 처리 OSS", url: "https://www.samsungsds.com/kr/insights/index.html?category=cat_1222819" },
    { n: 5, title: "OSS 차세대 트렌드", desc: "AI, 클라우드, IoT, SDN 등과 OSS의 연계 발전 방향", url: "https://www.samsungsds.com/kr/insights/1233720_4627.html" },
  ],

  articles: [
    { title: "진화하는 위치추적서비스", outlet: "전자신문", url: "https://www.etnews.com/" },
    { title: "스토킹범죄, 위치추적 전자장치가 대안이 될 수 있을까?", outlet: "한국일보", url: "https://www.hankookilbo.com/" },
    { title: "PostgreSQL 전환 과제: 오픈소스 데이터베이스의 도입과 활용", outlet: "사내 기술 보고서 · 2016.12", url: "" },
    { title: "클라우드 플랫폼에서의 Ansible 및 AWX를 활용한 자동화 사례", outlet: "사내 세미나 · 2021.06", url: "" },
    { title: "VDI 로그 관리/검색 시스템 구축 경험 공유", outlet: "사내 워크숍 · 2013.12", url: "" },
  ],
  // Career Reflections — 각 시기별 "역할 / 성과 / 가장 인상 깊었던 점 / 배운 점"
  // 빈 항목은 추후 직접 채워 넣을 수 있도록 placeholder로 두었습니다.
  reflections: [
    {
      era: "Samsung Cloud Platform 시대",
      period: "2018 — 현재",
      role: "(예) Cloud Technical Lead로서 SCP 내재화/상품 기획·개발을 리드하고, 엔터프라이즈 고객의 기술 자문(TAM 역할)을 병행.",
      achievements: "(예) Nuri Compute·GenAI Console 등 신규 상품 라인업 출시, OpenStack/VMware 듀얼 스택 내재화로 벤더 종속 완화, Ansible/AWX 자동화로 운영 효율 N% 향상.",
      mostMemorable: "(예) GenAI Console 0→1 기획 단계에서 시장 요구를 직접 정의하고, 첫 PoC를 사내 데모에서 성공시킨 순간.",
      lessons: "(예) ‘기술’ 보다 ‘고객의 문제 정의’가 먼저라는 점. 플랫폼은 결국 운영 자동화와 표준화의 누적이라는 것.",
    },
    {
      era: "오픈소스 & 데이터 인프라 전환기",
      period: "2013 — 2017",
      role: "(예) PostgreSQL 전환·CDN 분배·VDI 로그 시스템 등 오픈소스 기반 인프라 설계/리드.",
      achievements: "(예) 상용 DBMS → PostgreSQL 전환으로 라이선스 비용 절감 및 운영 표준화, 빅데이터 전문가 양성 TF 운영.",
      mostMemorable: "(예) 미션 크리티컬 시스템을 오픈소스로 전환하며 ‘안정성에 대한 조직의 두려움’을 데이터로 설득해 낸 경험.",
      lessons: "(예) 기술 도입은 ‘증명’과 ‘설득’의 합. 오픈소스는 자유를 주지만 책임도 함께 가져온다는 것.",
    },
    {
      era: "전략 기획 & 솔루션 R&D",
      period: "2009 — 2012",
      role: "(예) 인프라본부 기술 로드맵 수립, RFID/USN 위치추적 솔루션 개발, 경영혁신 마스터플랜 수행.",
      achievements: "(예) 본부 단위 3개년 기술 로드맵 정립, SmartCity 위치추적 솔루션 상용화, BPM 기반 업무 표준화.",
      mostMemorable: "(예) 현장 엔지니어 → 전략 기획자 역할 전환을 경험하며 비즈니스 언어로 기술을 번역하는 법을 배움.",
      lessons: "(예) ‘무엇을 만들 것인가’ 보다 ‘왜 만드는가’를 정의하는 일이 가장 어렵고 가치 있다.",
    },
    {
      era: "통신 빌링 시스템 — 커리어 시작점",
      period: "1996 — 2003",
      role: "(예) UNITEL·AT&T Billing System 개발/운영, 청구 자동화 시스템 구축.",
      achievements: "(예) 대용량 청구 배치 처리 안정화, 수납 정합성 99.9% 달성, 신입에서 PL 역할까지 성장.",
      mostMemorable: "(예) 첫 야간 배치 장애를 새벽까지 잡아내며 시스템 운영의 무게를 실감한 경험.",
      lessons: "(예) 도메인 이해 없는 코드는 위험하다. 그리고 ‘문서화’는 미래의 나를 살린다.",
    },
  ],
};

export type ResumeData = typeof resumeData;
