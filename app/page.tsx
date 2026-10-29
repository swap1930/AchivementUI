"use client";

import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import activitiesData from "@/data/activities.json";
import contactData from "@/data/contact.json";
import eventsData from "@/data/events.json";
import experienceData from "@/data/experience.json";
import projectData from "@/data/projects.json";
import tabData from "@/data/tabs.json";
import {
  ArrowDown,
  ArrowLeft,
  House,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Code2,
  ExternalLink,
  FileText,
  Globe2,
  Mail,
  Menu,
  Moon,
  Network,
  PanelTop,
  Phone,
  Shapes,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";

const projects = projectData.projects;

function getProjectPosition(project: (typeof projects)[number]) {
  const categoryIds =
    project.category === "personal"
      ? projectData.personalProjectIds
      : project.category === "mini"
        ? projectData.miniProjectIds
        : projectData.teamProjectIds;
  return {
    index: categoryIds.indexOf(project.id) + 1,
    count: categoryIds.length,
  };
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

const tabIcons = {
  personal: CircleUserRound,
  mini: Code2,
  team: Users,
  experience: BriefcaseBusiness,
  events: CalendarDays,
  extra: Network,
  skills: Code2,
};
const tabs = tabData.map(({ id, label, icon }) => ({
  id,
  label,
  icon: tabIcons[id as keyof typeof tabIcons],
}));

function GlassButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className="icon-button"
    >
      {children}
    </button>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: (typeof projects)[number];
  onOpen: () => void;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const position = getProjectPosition(project);

  useEffect(() => {
    if (project.images.length < 2) return;
    const interval = window.setInterval(
      () => setImageIndex((current) => (current + 1) % project.images.length),
      4400,
    );
    return () => window.clearInterval(interval);
  }, [project.images.length]);

  return (
    <article
      className="project-card"
      onClick={(event) => {
        if (!(event.target instanceof Element) || !event.target.closest("a, button")) {
          onOpen();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" && event.target === event.currentTarget) {
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.name} details`}
    >
      <div className="project-cover">
        <img src={project.images[imageIndex]} alt={`${project.name} preview`} />
        <div className="cover-gradient" />
        <div className="cover-controls">
          <span className="project-number">
            {String(position.index).padStart(2, "0")} /{" "}
            {String(position.count).padStart(2, "0")}
          </span>
          {project.images.length > 1 && (
            <div className="slide-dots" aria-label="Project screenshots">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Show screenshot ${index + 1}`}
                  className={index === imageIndex ? "active" : ""}
                  onClick={() => setImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
        {project.images.length > 1 && (
          <button
            className="cover-arrow"
            aria-label="Next screenshot"
            onClick={() =>
              setImageIndex((imageIndex + 1) % project.images.length)
            }
          >
            <ChevronRight />
          </button>
        )}
      </div>
      <div className="project-body">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          {project.eyebrow}
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="card-footer">
          <div className="tech-row">
            {project.tech.map((tech) => (
              <span key={tech} className="tech-chip">
                {tech}
              </span>
            ))}
          </div>
          <div className="card-actions">
            {project.github && (
              <a
                className="project-link"
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <GithubIcon /> GitHub
              </a>
            )}
            <GlassButton
              label={`View ${project.name} details`}
              onClick={onOpen}
            >
              <ExternalLink />
            </GlassButton>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectsView({
  category = "personal",
  onOpen,
}: {
  category?: "personal" | "mini" | "team";
  onOpen: (project: (typeof projects)[number]) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const copy = projectData.views[category];
  const projectIds =
    category === "team"
      ? projectData.teamProjectIds
      : category === "mini"
        ? projectData.miniProjectIds
        : projectData.personalProjectIds;
  const allItems = projectIds.flatMap((id) =>
    projects.filter((project) => project.id === id),
  );
  const filters = [
    "All",
    ...Array.from(new Set(allItems.flatMap((project) => project.tech))).slice(
      0,
      4,
    ),
  ];
  const filtered = allItems.filter((project) => {
    const matchesQuery =
      `${project.name} ${project.description} ${project.eyebrow}`
        .toLowerCase()
        .includes(query.toLowerCase());
    return (
      matchesQuery &&
      (filter === "All" || project.tech.some((tech) => tech === filter))
    );
  });
  const pageSize = 4;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{copy.kicker}</p>
          <h1>{copy.title}</h1>
          <p className="section-description">{copy.description}</p>
        </div>
        <span className="availability">
          <span /> {projectData.views.availabilityLabel}
        </span>
      </div>
      <div className="project-tools">
        <label className="search-box">
          <Search />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={projectData.views.searchPlaceholder}
            aria-label="Search projects"
          />
        </label>
        <div className="filter-row">
          <SlidersHorizontal />
          <span>{projectData.views.filterLabel}</span>
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? "selected" : ""}
              onClick={() => {
                setFilter(item);
                setPage(1);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {visible.length ? (
        <div className="project-grid">
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => onOpen(project)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-projects">{projectData.views.emptyState}</div>
      )}
      {pageCount > 1 && (
        <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      )}
    </section>
  );
}

function Pagination({
  page,
  pageCount,
  onChange,
  label = "Project pages",
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  label?: string;
}) {
  const goTo = (next: number) => {
    onChange(next);
    document
      .querySelector(".content-panel")
      ?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <nav className="pagination" aria-label={label}>
      <button
        type="button"
        className="page-step"
        disabled={page === 1}
        onClick={() => goTo(page - 1)}
      >
        <ChevronLeft /> Prev
      </button>
      <div className="page-numbers">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (number) => (
            <button
              type="button"
              key={number}
              className={number === page ? "page-number active" : "page-number"}
              aria-current={number === page ? "page" : undefined}
              aria-label={`Page ${number}`}
              onClick={() => goTo(number)}
            >
              {String(number).padStart(2, "0")}
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        className="page-step"
        disabled={page === pageCount}
        onClick={() => goTo(page + 1)}
      >
        Next <ChevronRight />
      </button>
    </nav>
  );
}

function EventsView({ onImage }: { onImage: (image: string) => void }) {
  const events = eventsData.items;
  const [page, setPage] = useState(1);
  const [activeSection, setActiveSection] = useState<"events" | "lecture">(
    "events",
  );
  const sectionEvents = events.filter(
    (event) => event.section === activeSection,
  );
  const pageSize = 3;
  const pageCount = Math.ceil(sectionEvents.length / pageSize);
  const visible = sectionEvents.slice((page - 1) * pageSize, page * pageSize);
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{eventsData.section.kicker}</p>
          <h1>{eventsData.section.title}</h1>
          <p className="section-description">
            {eventsData.section.description}
          </p>
        </div>
      </div>
      <div className="section-tabs" role="tablist" aria-label="Event sections">
        <button
          id="events-tab"
          type="button"
          role="tab"
          aria-selected={activeSection === "events"}
          aria-controls="events-panel"
          className={activeSection === "events" ? "active" : ""}
          onClick={() => {
            setActiveSection("events");
            setPage(1);
          }}
        >
          Events
        </button>
        <button
          id="lecture-tab"
          type="button"
          role="tab"
          aria-selected={activeSection === "lecture"}
          aria-controls="events-panel"
          className={activeSection === "lecture" ? "active" : ""}
          onClick={() => {
            setActiveSection("lecture");
            setPage(1);
          }}
        >
          Expert Lecture
        </button>
      </div>
      <div
        className="events-list"
        id="events-panel"
        role="tabpanel"
        aria-labelledby={activeSection === "events" ? "events-tab" : "lecture-tab"}
      >
        {visible.map((event) => (
          <article className="event-card" key={event.name}>
            <div className="event-images">
              {event.images.map((image, index) => (
                <button
                  className="event-image-button"
                  type="button"
                  key={image}
                  aria-label={`Open ${event.name} photo ${index + 1}`}
                  onClick={() => onImage(image)}
                >
                  <img src={image} alt={`${event.name} ${index + 1}`} />
                </button>
              ))}
            </div>
            <div>
              <span className="event-index">
                0{events.findIndex((item) => item.name === event.name) + 1}
              </span>
              <h3>{event.name}</h3>
              <p>{event.detail}</p>
            </div>
            <ExternalLink aria-hidden="true" />
          </article>
        ))}
      </div>
      {pageCount > 1 && (
        <Pagination
          page={page}
          pageCount={pageCount}
          onChange={setPage}
          label={eventsData.paginationLabel}
        />
      )}
    </section>
  );
}

function HomeView({
  onNavigate,
}: {
  onNavigate: (tab: string) => void;
}) {
  const groups = activitiesData.groups;
  const featuredSkills = groups.flatMap((group) => group.items).slice(0, 10);

  return (
    <div className="home-view">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-copy">
          <p className="home-eyebrow"><span /> Portfolio</p>
          <h1 id="home-title">{contactData.profile.name}</h1>
          <p className="home-role">{contactData.profile.title}</p>
          <p className="home-summary">
            I am a passionate Full Stack and AI/ML developer, eager to build dynamic and scalable applications. As a fresher, I am learning modern frameworks, Python libraries, and databases to strengthen my skills. I have a deep interest in both frontend and backend development, exploring technologies that power intelligent systems. Additionally, I am focused on data science and deep learning, aiming to specialize in LLM development. My goal is to create AI-driven solutions that bring innovation and efficiency. I am excited to apply my knowledge and grow in this ever-evolving tech landscape.
          </p>
          <div className="home-actions">
            <button className="home-primary" onClick={() => onNavigate("personal")}>
              Explore my work <ArrowDown />
            </button>
            <button className="home-secondary" onClick={() => onNavigate("contact")}>
              Get in touch <Mail />
            </button>
          </div>
        </div>
        <div className="home-portrait-wrap">
          <div className="home-portrait-glow" />
          <img
            className="home-portrait"
            src="/Final.png"
            alt={`${contactData.profile.name} portrait`}
          />

        </div>

      </section>

      <section className="home-about" id="about" aria-labelledby="about-title">
        <div className="about-intro">
          <p className="section-kicker">A little about me</p>
          <h2 id="about-title">Curious by nature.<br /><span>Builder by choice.</span></h2>
          <p className="about-theory">
            I’m a dedicated, self-motivated learner who enjoys turning ideas into practical software. With a strong foundation in frontend and backend development, I build thoughtful solutions and keep developing my technical and problem-solving skills. I value listening, adaptability, and collaboration, and bring those qualities to team projects. By balancing time management and continuous learning, I take initiative, support the people I work with, and grow through real-world challenges. Looking ahead, I’m focused on data science and LLM engineering, with the goal of contributing to the next generation of AI.
          </p>
          <button className="about-link" onClick={() => onNavigate("experience")}>
            More about my journey <ArrowLeft />
          </button>
        </div>
        <div className="about-details">
          <article className="about-detail-card">
            <span className="about-card-number">01 / FOCUS</span>
            <h3>What I work on</h3>
            <p>Full stack applications, AI/ML, deep learning, data science, and LLM-powered solutions.</p>
          </article>
          <article className="about-detail-card">
            <span className="about-card-number">02 / EXPERIENCE</span>
            <h3>Learning by doing</h3>
            <p>Hands-on internship experience across AI/ML and web development, alongside ongoing computer engineering studies.</p>
          </article>
          <article className="about-detail-card about-skills-card">
            <span className="about-card-number">03 / MY TOOLKIT</span>
            <h3>Technologies I use</h3>
            <div className="technology-grid">
              {[
                { name: "React" },
                { name: "Tailwind CSS" },
                { name: "MongoDB" },
                { name: "Python" },
                { name: "Hugging Face" },
                { name: "Scikit-learn" },
                { name: "TensorFlow" },
              ].map((technology) => (
                <div className="technology-tile" key={technology.name}>
                  <span>{technology.name}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

function SkillsView() {
  const groups = activitiesData.groups;
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{activitiesData.section.kicker}</p>
          <h1>{activitiesData.section.title}</h1>
          <p className="section-description">
            {activitiesData.section.description}
          </p>
        </div>
      </div>
      <div className="skill-groups">
        {groups.map((group) => (
          <section className="skill-group" key={group.category}>
            <h2>{group.category}</h2>
            <div className="skill-chips">
              {group.items.map((skill) => (
                <span className="tech-chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function ExtraCurricularView({
  onImage,
}: {
  onImage: (image: string) => void;
}) {
  const activities = activitiesData.extracurricular;
  const [activeSection, setActiveSection] = useState<"certificates" | "gallery">("certificates");
  const [certificatePage, setCertificatePage] = useState(1);
  const certificates = [
    { name: "Techthon 2.0", organization: "AISSMS • 2025", img: "/certificates/c2.jpg" },
    { name: "CodeRed", organization: "AIT • 2025", img: "/certificates/c4.jpg" },
    { name: "React Components", organization: "SimpliLearn • 2025", img: "/certificates/c1.jpg" },
    { name: "Linux Diary 5.0", organization: "Walchand • 2024", img: "/certificates/c3.jpg" },
    { name: "Technova 2K24", organization: "Kolhapur • 2024", img: "/certificates/c6.jpg" },
    { name: "Innovate", organization: "JJ Magdum • 2024", img: "/certificates/c5.jpg" },
    { name: "Innohack 2.0", organization: "VIT Pune • 2025", img: "/certificates/c7.jpg" },
    { name: "Fine Tune LLMs", organization: "Hugging Face • 2025", img: "/certificates/c8.png" },
    { name: "Data Analysis", organization: "IBM • 2025", img: "/certificates/c10.png" },
    { name: "Linux Diary 6.0", organization: "Walchand • 2025", img: "/certificates/c9.jpg" },
    { name: "Machine Learning", organization: "Microsoft Learn • 2025", img: "/certificates/c11.png" },
    { name: "Gen AI", organization: "Microsoft Learn • 2025", img: "/certificates/c12.png" },
  ];
  const certificatesPerPage = 4;
  const certificatePageCount = Math.ceil(certificates.length / certificatesPerPage);
  const visibleCertificates = certificates.slice(
    (certificatePage - 1) * certificatesPerPage,
    certificatePage * certificatesPerPage,
  );
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Outside the classroom</p>
          <h1>Extra-Curricular</h1>
          <p className="section-description">
            Event leadership and volunteering from my resume.
          </p>
        </div>
      </div>
      <div className="section-tabs" role="tablist" aria-label="Extra-curricular sections">
        <button
          id="activities-certificates-tab"
          type="button"
          role="tab"
          aria-selected={activeSection === "certificates"}
          aria-controls="activities-panel"
          className={activeSection === "certificates" ? "active" : ""}
          onClick={() => setActiveSection("certificates")}
        >
          Certificates
        </button>
        <button
          id="activities-gallery-tab"
          type="button"
          role="tab"
          aria-selected={activeSection === "gallery"}
          aria-controls="activities-panel"
          className={activeSection === "gallery" ? "active" : ""}
          onClick={() => setActiveSection("gallery")}
        >
          Gallery
        </button>
      </div>
      {activeSection === "certificates" ? (
        <div
          className="gallery-grid certificate-gallery"
          id="activities-panel"
          role="tabpanel"
          aria-labelledby="activities-certificates-tab"
        >
          {visibleCertificates.map((certificate) => (
            <button
              className="certificate-card"
              key={certificate.img}
              type="button"
              aria-label={`Open ${certificate.name} certificate`}
              onClick={() => onImage(certificate.img)}
            >
              <span className="certificate-image">
                <img src={certificate.img} alt={`${certificate.name} certificate`} />
                <span className="certificate-open-icon" aria-hidden="true"><ExternalLink /></span>
              </span>
              <span className="certificate-card-info">
                <strong>{certificate.name}</strong>
                <span>{certificate.organization}</span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div
          className="gallery-grid"
          id="activities-panel"
          role="tabpanel"
          aria-labelledby="activities-gallery-tab"
        >
          {activities.map((activity) => (
            <figure
              className={`gallery-item${activity.images.length > 1 ? " has-multiple-images" : ""}`}
              key={activity.title}
            >
              <div className="gallery-images">
                {activity.images.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${activity.title} photo ${index + 1}`}
                  />
                ))}
              </div>
              <figcaption>
                <strong>{activity.title}</strong>
                <span>{activity.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      {activeSection === "certificates" && certificatePageCount > 1 && (
        <nav className="pagination certificate-pagination" aria-label="Certificate pages">
          <button
            type="button"
            className="page-step"
            disabled={certificatePage === 1}
            onClick={() => setCertificatePage((page) => Math.max(1, page - 1))}
          >
            <ChevronLeft /> Previous
          </button>
          <div className="certificate-page-numbers" aria-label="Choose certificate page">
            {Array.from({ length: certificatePageCount }, (_, index) => index + 1).map((page) => (
              <button
                type="button"
                key={page}
                className={`page-number${certificatePage === page ? " active" : ""}`}
                aria-label={`Go to certificate page ${page}`}
                aria-current={certificatePage === page ? "page" : undefined}
                onClick={() => setCertificatePage(page)}
              >
                {String(page).padStart(2, "0")}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="page-step"
            disabled={certificatePage === certificatePageCount}
            onClick={() => setCertificatePage((page) => Math.min(certificatePageCount, page + 1))}
          >
            Next <ChevronRight />
          </button>
        </nav>
      )}
    </section>
  );
}

function ExperienceView({
  onImage,
  onMessage,
}: {
  onImage: (image: string) => void;
  onMessage: (message: string) => void;
}) {
  const roles = experienceData.roles;
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{experienceData.section.kicker}</p>
          <h1>{experienceData.section.title}</h1>
          <p className="section-description">
            {experienceData.section.description}
          </p>
        </div>
      </div>
      <section className="resume-section">
        <h2>Experience</h2>
        <div className="experience-list">
          {roles.map((item) => (
            <article className="experience-card" key={item.role}>
              <span className="experience-years">{item.years}</span>
              <div className="experience-content">
                <div className="experience-heading">
                  <div>
                    <p className="section-kicker">{item.company}</p>
                    <h3>{item.role}</h3>
                  </div>
                  <button
                    className="experience-image-button"
                    type="button"
                    aria-label={`Open ${item.role} certificate`}
                    title="Open certificate"
                    onClick={() => onImage(item.certificateImage)}
                  >
                    <ExternalLink />
                  </button>
                </div>
                <div className="experience-meta">
                  <span>{item.type}</span>
                  <span>{item.duration}</span>
                </div>
                <p>{item.description}</p>
                <p className="experience-summary">
                  <strong>Summary</strong>
                  {item.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>Education</h2>
        <div className="education-grid">
          {experienceData.education.map((item) => (
            <article className="education-card" key={item.institution}>
              <div className="experience-heading">
                <div>
                  <span className="experience-years">{item.years}</span>
                  <h3>{item.institution}</h3>
                </div>
                {item.certificateImage.endsWith(".pdf") ? (
                  <a
                    className="experience-image-button"
                    href={item.certificateImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${item.institution} certificate in a new tab`}
                    title="Open certificate"
                  >
                    <ExternalLink />
                  </a>
                ) : (
                  <button
                    className="experience-image-button"
                    type="button"
                    aria-label={`Open ${item.institution} certificate`}
                    title="Open certificate"
                    onClick={() =>
                      item.previewMessage
                        ? onMessage(item.previewMessage)
                        : onImage(item.certificateImage)
                    }
                  >
                    <ExternalLink />
                  </button>
                )}
              </div>
              <p>{item.qualification}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function ContactView() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => {
      if (typeof value === "string") body.append(key, value);
    });

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Contact form submission failed: ${response.status}`);
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error("Unable to submit contact form.", error);
      setStatus("error");
    }
  };
  return (
    <section className="view-section contact-view">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{contactData.section.kicker}</p>
          <h1>{contactData.section.title}</h1>
          <p className="section-description">
            {contactData.section.description}
          </p>
        </div>
      </div>
      <div className="profile-contact">
        <a
          className="profile-contact-item"
          href={`mailto:${contactData.profile.email}`}
        >
          <HiOutlineMail />
          <span>{contactData.profile.email}</span>
        </a>
        <a
          className="profile-contact-item"
          href={`tel:${contactData.profile.phone.replaceAll(" ", "")}`}
        >
          <Phone />
          <span>{contactData.profile.phone}</span>
        </a>
        <a
          className="profile-contact-item"
          href={contactData.profile.github}
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
          <span>GitHub profile</span>
        </a>
      </div>
      <form
        className="contact-form"
        name="contact"
        method="POST"
        onSubmit={submit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <label className="contact-honeypot" aria-hidden="true">
          Leave this field blank
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
        {contactData.fields.map((field) => (
          <label
            key={field.name}
            className={field.fullWidth ? "full-field" : undefined}
          >
            {field.label}
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                rows={field.rows}
                required={field.required}
              />
            ) : (
              <input
                name={field.name}
                type={field.type === "email" ? "email" : "text"}
                required={field.required}
              />
            )}
          </label>
        ))}
        <div className="form-footer">
          <button
            className="primary-button"
            type="submit"
            disabled={status === "sending"}
          >
            {contactData.submitLabels[status]} <Send />
          </button>
          {status === "sent" && (
            <span className="form-success">{contactData.successMessage}</span>
          )}
          {status === "error" && (
            <span className="form-error" role="alert">
              Message could not be sent. Please try again or email{" "}
              <a href={`mailto:${contactData.profile.email}`}>
                {contactData.profile.email}
              </a>
              .
            </span>
          )}
        </div>
      </form>
    </section>
  );
}

function DetailView({
  project,
  onBack,
}: {
  project: (typeof projects)[number];
  onBack: () => void;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const position = getProjectPosition(project);
  return (
    <section className="detail-view">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft /> Back to projects
      </button>
      <div className="detail-hero">
        <div>
          <p className="section-kicker">
            {`${projectData.detail.caseStudyLabel} / ${String(position.index).padStart(2, "0")}`}
          </p>
          <h1>{project.name}</h1>
          <p className="detail-description">{project.description}</p>
          <div className="detail-actions">
            {project.github && (
              <a
                href={project.github}
                className="primary-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository <ExternalLink />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                className="primary-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Website <Globe2 />
              </a>
            )}
          </div>
        </div>
        <div className="detail-image">
          <img
            src={project.images[imageIndex]}
            alt={`${project.name} case study`}
          />
          {project.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setImageIndex(
                    (imageIndex + project.images.length - 1) %
                      project.images.length,
                  )
                }
                aria-label="Previous image"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() =>
                  setImageIndex((imageIndex + 1) % project.images.length)
                }
                aria-label="Next image"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="detail-sections">
        <section className="detail-section">
          <h2>Tools &amp; Technologies</h2>
          {project.tech.length > 0 ? (
            <div className="tech-row">
              {project.tech.map((tech) => (
                <span key={tech} className="tech-chip">
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <p>Technology details have not been provided yet.</p>
          )}
        </section>
        <section className="detail-section">
          <h2>Issues Resolved</h2>
          <ul>
            {project.issuesResolved.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </section>
        <section className="detail-section">
          <h2>Advantages</h2>
          <ul>
            {project.advantages.map((advantage) => (
              <li key={advantage}>{advantage}</li>
            ))}
          </ul>
        </section>
      </div>

    </section>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxMessage, setLightboxMessage] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const activeLabel = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.label,
    [activeTab],
  );

  useEffect(() => {
    const moveCursor = (event: MouseEvent) =>
      setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <main className={dark ? "portfolio dark" : "portfolio light"}>
      <span
        className="cursor-orb"
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        aria-hidden="true"
      />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-background" />
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">
            <Code2 />
          </span>
          <span>{contactData.profile.name}</span>
        </a>
        <div className="header-status">
          <span className="pulse" /> {contactData.profile.title}
        </div>
        <div className="top-actions">
          <button
            className="theme-toggle"
            aria-label="Toggle color theme"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun /> : <Moon />}
          </button>
          <a
            className="header-link"
            href={contactData.profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
            <span>LinkedIn</span>
          </a>
          <a
            className="header-link"
            href={contactData.profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
          <a
            className="header-link"
            href="/Swapnil_Dudhane_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText />
            <span>Resume</span>
          </a>
          <button
            className="contact-button"
            onClick={() => {
              setActiveTab("contact");
              setSelectedProject(null);
            }}
          >
            <Mail /> Contact
          </button>
        </div>

        <button
          className="mobile-menu"
          type="button"
          aria-label={
            isMobileSidebarOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={isMobileSidebarOpen}
          aria-controls="portfolio-sidebar"
          onClick={() => setIsMobileSidebarOpen((open) => !open)}
        >
          {isMobileSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>
      {isMobileSidebarOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="app-shell" id="top">
        <aside
          id="portfolio-sidebar"
          className={`sidebar ${isMobileSidebarOpen ? "mobile-open" : ""}`}
        >
          <div>
            <div className="sidebar-heading">
              <span>Navigation</span>
              <small>Selected sections</small>
            </div>
            <nav aria-label="Portfolio sections">
              <button
                className={activeTab === "home" ? "nav-tab active" : "nav-tab"}
                onClick={() => {
                  setActiveTab("home");
                  setSelectedProject(null);
                  if (isMobileSidebarOpen) setIsMobileSidebarOpen(false);
                }}
              >
                <House />
                <span>Home</span>
                {activeTab === "home" && <span className="tab-indicator" />}
              </button>
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={activeTab === id ? "nav-tab active" : "nav-tab"}
                  onClick={() => {
                    setActiveTab(id);
                    setSelectedProject(null);
                    if (isMobileSidebarOpen) setIsMobileSidebarOpen(false);
                  }}
                >
                  <Icon />
                  <span>{label}</span>
                  {activeTab === id && <span className="tab-indicator" />}
                </button>
              ))}
            </nav>
          </div>
          <div className="sidebar-social">
            <div className="social-icons">
              <a
                href={contactData.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={contactData.profile.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="social-icon"
              >
                <FaInstagram />
              </a>
              <a
                href={contactData.profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="social-icon"
              >
                <FaGithub />
              </a>
              <a
                href={`mailto:${contactData.profile.email}`}
                aria-label="Email"
                className="social-icon"
              >
                <HiOutlineMail />
              </a>
            </div>

          </div>
        </aside>
        <nav className="mobile-tabs" aria-label="Portfolio sections">
          <button
            type="button"
            className={activeTab === "home" ? "active" : ""}
            aria-current={activeTab === "home" ? "page" : undefined}
            onClick={() => {
              setActiveTab("home");
              setSelectedProject(null);
            }}
          >
            Home
          </button>
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={activeTab === id ? "active" : ""}
              aria-current={activeTab === id ? "page" : undefined}
              onClick={() => {
                setActiveTab(id);
                setSelectedProject(null);
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <section
          key={selectedProject?.id ?? activeTab}
          className="content-panel"
          aria-live="polite"
        >
          {selectedProject ? (
            <DetailView
              project={selectedProject}
              onBack={() => setSelectedProject(null)}
            />
          ) : activeTab === "home" ? (
            <HomeView onNavigate={setActiveTab} />
          ) : activeTab === "personal" ? (
            <ProjectsView onOpen={setSelectedProject} />
          ) : activeTab === "team" ? (
            <ProjectsView category="team" onOpen={setSelectedProject} />
          ) : activeTab === "mini" ? (
            <ProjectsView category="mini" onOpen={setSelectedProject} />
          ) : activeTab === "experience" ? (
            <ExperienceView
              onImage={setLightbox}
              onMessage={setLightboxMessage}
            />
          ) : activeTab === "events" ? (
            <EventsView onImage={setLightbox} />
          ) : activeTab === "extra" ? (
            <ExtraCurricularView onImage={setLightbox} />
          ) : activeTab === "contact" ? (
            <ContactView />
          ) : (
            <SkillsView />
          )}
        </section>
      </div>
      <footer className="bottom-bar">
        <span>
          © {new Date().getFullYear()} {contactData.profile.name}
        </span>
        <span className="footer-line" />
        <span>Currently crafting thoughtful software</span>
      </footer>
      {(lightbox || lightboxMessage) && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
          onClick={() => {
            setLightbox(null);
            setLightboxMessage(null);
          }}
        >
          <button
            aria-label="Close preview"
            onClick={() => {
              setLightbox(null);
              setLightboxMessage(null);
            }}
          >
            <X />
          </button>
          {lightboxMessage ? (
            <div
              className="lightbox-message"
              onClick={(event) => event.stopPropagation()}
            >
              <span>Education status</span>
              <p>{lightboxMessage}</p>
            </div>
          ) : lightbox ? (
            <img
              src={lightbox}
              alt="Certificate preview"
              onClick={(event) => event.stopPropagation()}
            />
          ) : null}
        </div>
      )}
    </main>
  );
}
