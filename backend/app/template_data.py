from copy import deepcopy


SECTION_CONFIG = [
    {"id": "education", "label": "Education"},
    {"id": "skills", "label": "Technical Skills"},
    {"id": "projects", "label": "Projects"},
    {"id": "experience", "label": "Experience"},
    {"id": "extracurricular", "label": "Extracurricular Activities"},
    {"id": "achievements", "label": "Achievements"},
    {"id": "certifications", "label": "Certifications"},
    {"id": "publications", "label": "Publications"},
]


TEMPLATE_RESUME_DATA = {
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
            "id": "edu_template_1",
            "institution": "University Name",
            "location": "City, State",
            "gpaLabel": "Agg. CGPA: X.XX",
            "degree": "Degree Name & Specialization",
            "startDate": "Month YYYY",
            "endDate": "Month YYYY",
            "highlight": "One-line academic highlight or achievement.",
        }
    ],
    "skills": [
        {"id": "skill_template_1", "category": "Languages", "items": ["Language1 (proficiency)", "Language2 (proficiency)", "Language3 (proficiency)"]},
        {"id": "skill_template_2", "category": "Tools & Technology", "items": ["Tool1", "Tool2", "Tool3", "Tool4", "Tool5"]},
        {"id": "skill_template_3", "category": "Frameworks", "items": ["Framework1", "Framework2", "Framework3"]},
        {"id": "skill_template_4", "category": "Technical Domains", "items": ["Domain1", "Domain2", "Domain3"]},
        {"id": "skill_template_5", "category": "Data Analysis & Visualization", "items": ["Skill1", "Skill2", "Skill3"]},
        {"id": "skill_template_6", "category": "Databases & Cloud Platforms", "items": ["Platform1", "Platform2", "Platform3"]},
    ],
    "projects": [
        {
            "id": "proj_template_1",
            "name": "Project Title One",
            "techStack": "Tech Stack & Key Technologies Used",
            "githubUrl": "https://github.com/yourusername/project-one",
            "liveUrl": "",
            "bullets": [
                "Brief description of what the project does and what problem it solves.",
                "Key technical decision or implementation detail that adds value.",
                "Quantifiable result or metric achieved.",
            ],
        },
        {
            "id": "proj_template_2",
            "name": "Project Title Two",
            "techStack": "Tech Stack & Key Technologies Used",
            "githubUrl": "https://github.com/yourusername/project-two",
            "liveUrl": "https://your-live-demo-link.com/",
            "bullets": [
                "What data or problem was analyzed or solved, including scope.",
                "Description of the pipeline, feature engineering, or technical approach.",
                "Business insight or measurable impact uncovered.",
            ],
        },
    ],
    "experience": [
        {
            "id": "exp_template_1",
            "role": "Job Title",
            "company": "Company Name",
            "location": "City, State",
            "startDate": "Month YYYY",
            "endDate": "",
            "current": True,
            "projectSubtitle": "",
            "bullets": [
                "Led a project or initiative over a defined scope to achieve a clear goal.",
                "Engineered a pipeline, system, or tool in a specific language or framework.",
                "Deployed a product, model, or solution achieving a measurable result.",
            ],
        }
    ],
    "extracurricular": [
        {
            "id": "extra_template_1",
            "title": "Role/Position",
            "organization": "Organization Name, Location",
            "startDate": "Month YYYY",
            "endDate": "Month YYYY",
            "bullets": ["Brief description of responsibilities, contributions, or what was built or organized."],
        }
    ],
    "achievements": [
        {"id": "ach_template_1", "text": "Certified in [Topic/Skill] by [Institution], with demonstrated expertise in [specific area]."},
        {"id": "ach_template_2", "text": "Achieved [position/rank] in [competition name] at [event/fest], showcasing [skills demonstrated]."},
    ],
    "certifications": [
        {
            "id": "cert_template_1",
            "text": "Passed [Certification Name] Certification.",
            "credentialUrl": "https://credential-link.com/your-credential-id",
        }
    ],
    "publications": [
        {
            "id": "pub_template_1",
            "title": "Full Title of Your Research Paper",
            "authors": "Author One, Author Two",
            "abstractText": "One to two sentences summarizing the core finding, method, or contribution of the paper.",
            "paperUrl": "https://arxiv.org/abs/XXXXXXXXXX",
            "paperLinkLabel": "arXiv Pre-print, YYYY",
        }
    ],
}


def initial_resume_data() -> dict:
    return deepcopy(TEMPLATE_RESUME_DATA)


def initial_section_config() -> list[dict]:
    return deepcopy(SECTION_CONFIG)
