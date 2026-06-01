"""Neutral starter resume seeded for every new user.

This mirrors the placeholder content of the repo-root ``resume_template.tex`` so a
brand-new account sees the structure and guidance — never another user's data.
The shape matches the frontend ``ResumeData`` / ``SectionConfig`` types exactly.
"""

import copy

TEMPLATE_RESUME_DATA: dict = {
    "personal": {
        "name": "Your Full Name",
        "email": "your.email@example.com",
        "phone": "(+XX) XXXXXXXXXX",
        "location": "City, Country",
        "linkedin": "https://www.linkedin.com/in/yourprofile/",
        "github": "https://www.github.com/yourusername",
        "website": "https://yourportfolio.com/",
    },
    "education": [
        {
            "id": "edu_1",
            "institution": "University Name",
            "location": "City, State",
            "gpaLabel": "Agg. CGPA: X.XX",
            "degree": "Degree Name & Specialization",
            "startDate": "Month YYYY",
            "endDate": "Month YYYY",
            "highlight": "One-line academic highlight or achievement (e.g., perfect score in final semester, dean's list).",
        }
    ],
    "skills": [
        {"id": "skill_1", "category": "Languages", "items": ["Language1 (proficiency)", "Language2 (proficiency)", "Language3 (proficiency)"]},
        {"id": "skill_2", "category": "Tools & Technology", "items": ["Tool1", "Tool2", "Tool3", "Tool4", "Tool5"]},
        {"id": "skill_3", "category": "Frameworks", "items": ["Framework1", "Framework2", "Framework3", "Framework4"]},
        {"id": "skill_4", "category": "Technical Domains", "items": ["Domain1", "Domain2", "Domain3", "Domain4"]},
        {"id": "skill_5", "category": "Data Analysis & Visualization", "items": ["Skill1", "Skill2", "Skill3", "Skill4"]},
        {"id": "skill_6", "category": "Databases & Cloud Platforms", "items": ["Platform1", "Platform2", "Platform3"]},
    ],
    "projects": [
        {
            "id": "proj_1",
            "name": "Project Title One",
            "techStack": "Tech Stack & Key Technologies Used",
            "githubUrl": "https://github.com/yourusername/project-one",
            "liveUrl": "",
            "bullets": [
                "Brief description of what the project does and what problem it solves. Mention the core functionality and user-facing features.",
                "Key technical decision or implementation detail — security, architecture, or design choice that adds value.",
                "Quantifiable result or metric achieved (e.g., accuracy percentage, performance improvement, dataset size handled).",
            ],
        },
        {
            "id": "proj_2",
            "name": "Project Title Two",
            "techStack": "Tech Stack & Key Technologies Used",
            "githubUrl": "https://github.com/yourusername/project-two",
            "liveUrl": "https://your-live-demo-link.com/",
            "bullets": [
                "What data or problem was analyzed/solved, and the overall scope (e.g., rows of data, time range, domain).",
                "Description of the data pipeline, feature engineering, or technical approach taken to tackle the problem.",
                "Business insight or measurable impact uncovered (e.g., percentage improvement, cost reduction, performance uplift).",
            ],
        },
    ],
    "experience": [
        {
            "id": "exp_1",
            "role": "Job Title",
            "company": "Company Name",
            "location": "City, State",
            "startDate": "Month YYYY",
            "endDate": "",
            "current": True,
            "projectSubtitle": "",
            "bullets": [
                "Led [project or initiative name], performing [type of analysis or work] on [scope of data/system] to achieve [goal].",
                "Engineered [pipeline/system/tool] in [language/framework] to [what it does], creating [outcome or deliverable].",
                "Deployed [product/model/solution] achieving [accuracy/performance metric or business impact].",
            ],
        },
        {
            "id": "exp_2",
            "role": "Job Title",
            "company": "Company Name",
            "location": "City, State",
            "startDate": "Month YYYY",
            "endDate": "Month YYYY",
            "current": False,
            "projectSubtitle": "Project: Project Name | Tools/Technologies Used",
            "bullets": [
                "Engineered [type of pipeline or system] using [language/tool] to perform [ETL/analysis/processing] on [data volume].",
                "Conducted [type of analysis] to identify [key patterns, factors, or insights] related to [domain].",
                "Synthesized findings into [deliverable type] that [impact on team, product, or strategy].",
            ],
        },
    ],
    "extracurricular": [
        {
            "id": "extra_1",
            "title": "Role/Position",
            "organization": "Organization Name, Location",
            "startDate": "Month YYYY",
            "endDate": "Month YYYY",
            "bullets": ["Brief description of responsibilities, contributions, or what was built/organized during this activity."],
        },
        {
            "id": "extra_2",
            "title": "Program/Competition Name",
            "organization": "Institution Name, Mode",
            "startDate": "Month YYYY",
            "endDate": "Month YYYY",
            "bullets": ["Brief description of program outcome, ranking, or skill demonstrated."],
        },
    ],
    "achievements": [
        {"id": "ach_1", "text": "Certified in [Topic/Skill] by [Institution], with demonstrated expertise in [specific area]."},
        {"id": "ach_2", "text": "Achieved [position/rank] in [competition name] at [event/fest], showcasing [skills demonstrated]."},
    ],
    "certifications": [
        {
            "id": "cert_1",
            "text": "Passed [Certification Name] Certification.",
            "credentialUrl": "https://credential-link.com/your-credential-id",
        }
    ],
    "publications": [
        {
            "id": "pub_1",
            "title": "Full Title of Your Research Paper",
            "authors": "Author One, Author Two",
            "abstractText": "One to two sentences summarizing the core finding, method, or contribution of the paper.",
            "paperUrl": "https://arxiv.org/abs/XXXXXXXXXX",
            "paperLinkLabel": "arXiv Pre-print, YYYY",
        }
    ],
}

# Order + labels of the body sections (matches frontend ALL_SECTIONS).
TEMPLATE_SECTION_CONFIG: list = [
    {"id": "education", "label": "Education"},
    {"id": "skills", "label": "Technical Skills"},
    {"id": "projects", "label": "Projects"},
    {"id": "experience", "label": "Experience"},
    {"id": "extracurricular", "label": "Extracurricular Activities"},
    {"id": "achievements", "label": "Achievements"},
    {"id": "certifications", "label": "Certifications"},
    {"id": "publications", "label": "Publications"},
]


def initial_resume_data() -> dict:
    """Fresh deep copy of the starter resume data for a new user's master."""
    return copy.deepcopy(TEMPLATE_RESUME_DATA)


def initial_section_config() -> list:
    """Fresh deep copy of the starter section config."""
    return copy.deepcopy(TEMPLATE_SECTION_CONFIG)
