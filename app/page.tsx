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
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Code2,
  ExternalLink,
  Globe2,
  Mail,
  Menu,
  Moon,
  Network,
  PanelTop,
  Phone,
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
    <article className="project-card">
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
        <p>{project.description}</p>
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
              >
                <GithubIcon /> GitHub
              </a>
            )}
            {project.live && (
              <a
                className="project-link"
                href={project.live}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink /> Live
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
  const pageSize = 3;
  const pageCount = Math.ceil(events.length / pageSize);
  const visible = events.slice((page - 1) * pageSize, page * pageSize);
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
      <div className="events-list">
        {visible.map((event) => (
          <button
            className="event-card"
            key={event.name}
            onClick={() => onImage(event.image)}
          >
            <img src={event.image} alt="" />
            <div>
              <span className="event-index">
                0{events.findIndex((item) => item.name === event.name) + 1}
              </span>
              <h3>{event.name}</h3>
              <p>{event.detail}</p>
            </div>
            <ExternalLink />
          </button>
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

function ExtraCurricularView() {
  const activities = activitiesData.extracurricular;
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
      <div className="gallery-grid">
        {activities.map((activity) => (
          <figure className="gallery-item" key={activity.title}>
            <img src={activity.image} alt="" />
            <figcaption>
              <strong>{activity.title}</strong>
              <span>{activity.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function ExperienceView({ onImage }: { onImage: (image: string) => void }) {
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
                <button
                  className="experience-image-button"
                  type="button"
                  aria-label={`Open ${item.institution} certificate`}
                  title="Open certificate"
                  onClick={() => onImage(item.certificateImage)}
                >
                  <ExternalLink />
                </button>
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
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setStatus("sent");
    form.reset();
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
      <form className="contact-form" onSubmit={submit}>
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
          <div className="tech-row">
            {project.tech.map((tech) => (
              <span key={tech} className="tech-chip">
                {tech}
              </span>
            ))}
          </div>
          <div className="detail-actions">
            {project.github && (
              <a
                href={project.github}
                className="primary-button"
                target="_blank"
                rel="noreferrer"
              >
                View source on GitHub <ExternalLink />
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
      {project.metrics.length > 0 && (
        <div className="metrics-grid">
          {project.metrics.map(([number, value, label]) => (
            <div className="metric" key={`${number}-${label}`}>
              <span>{number}</span>
              <strong>{value}</strong>
              <p>{label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="detail-note">
        <Sparkles />
        <div>
          <h3>{projectData.detail.noteTitle}</h3>
          <p>{projectData.detail.noteDescription}</p>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("personal");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
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
            href={contactData.profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
          <button
            className="header-link"
            onClick={() => {
              setActiveTab("experience");
              setSelectedProject(null);
            }}
          >
            <BriefcaseBusiness />
            <span>Experience</span>
          </button>
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
            <button
              className="portfolio-button"
              onClick={() => {
                setActiveTab("personal");
                setSelectedProject(null);
                if (isMobileSidebarOpen) setIsMobileSidebarOpen(false);
              }}
            >
              <Globe2 /> View Portfolio
            </button>
          </div>
        </aside>
        <nav className="mobile-tabs" aria-label="Portfolio sections">
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
          ) : activeTab === "personal" ? (
            <ProjectsView onOpen={setSelectedProject} />
          ) : activeTab === "team" ? (
            <ProjectsView category="team" onOpen={setSelectedProject} />
          ) : activeTab === "mini" ? (
            <ProjectsView category="mini" onOpen={setSelectedProject} />
          ) : activeTab === "experience" ? (
            <ExperienceView onImage={setLightbox} />
          ) : activeTab === "events" ? (
            <EventsView onImage={setLightbox} />
          ) : activeTab === "extra" ? (
            <ExtraCurricularView />
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
      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-label="Certificate preview"
          onClick={() => setLightbox(null)}
        >
          <button aria-label="Close preview" onClick={() => setLightbox(null)}>
            <X />
          </button>
          <img
            src={lightbox}
            alt="Certificate preview"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
