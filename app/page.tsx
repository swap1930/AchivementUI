"use client";

import { useEffect, useMemo, useState } from "react";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import {
  ArrowLeft,
  ArrowRight,
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
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";

const projectImages = [
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
];

const projects = [
  {
    id: "signal",
    name: "Signal Dashboard",
    eyebrow: "Product intelligence",
    description:
      "A calm, data-rich workspace for product teams to turn customer signals into confident decisions.",
    images: projectImages,
    tech: ["Next.js", "TypeScript", "Postgres"],
    github: "https://github.com/",
    live: "https://vercel.com/",
    metrics: [
      ["01", "10k+", "active users"],
      ["02", "42%", "faster reporting"],
      ["03", "4.9/5", "customer rating"],
    ],
  },
  {
    id: "northstar",
    name: "Northstar Commerce",
    eyebrow: "E-commerce platform",
    description:
      "A focused commerce system that keeps catalog, inventory, and fulfillment teams in sync.",
    images: [projectImages[1], projectImages[2], projectImages[0]],
    tech: ["React", "Node.js", "Stripe"],
    github: "https://github.com/",
    live: "https://vercel.com/",
    metrics: [
      ["01", "2.4x", "conversion lift"],
      ["02", "80ms", "edge response"],
      ["03", "24/7", "observability"],
    ],
  },
  {
    id: "atlas",
    name: "Atlas Mobile",
    eyebrow: "Team project · 2024",
    description:
      "A pocket-sized operating system for distributed teams to align, plan, and ship better work.",
    images: [projectImages[2], projectImages[0], projectImages[1]],
    tech: ["Expo", "GraphQL", "Figma"],
    github: "https://github.com/",
    live: "https://vercel.com/",
    metrics: [
      ["01", "36%", "less context switching"],
      ["02", "18k", "weekly sessions"],
      ["03", "12", "team pilots"],
    ],
  },
  {
    id: "relay",
    name: "Relay Workspace",
    eyebrow: "Collaboration platform",
    description:
      "A focused workspace for customer-facing teams to share context, decisions, and momentum.",
    images: [projectImages[0], projectImages[2], projectImages[1]],
    tech: ["Next.js", "Prisma", "Figma"],
    github: "https://github.com/",
    live: "https://vercel.com/",
    metrics: [
      ["01", "31%", "faster handoffs"],
      ["02", "9.2k", "weekly users"],
      ["03", "4.8/5", "team rating"],
    ],
  },
  {
    id: "pulse",
    name: "Pulse Analytics",
    eyebrow: "Realtime insights",
    description:
      "Live event streams and dashboards that help growth teams spot trends the moment they happen.",
    images: [projectImages[1], projectImages[0], projectImages[2]],
    tech: ["Next.js", "TypeScript", "Redis"],
    github: "https://github.com/",
    live: "https://vercel.com/",
    metrics: [
      ["01", "120ms", "event latency"],
      ["02", "3.1M", "events per day"],
      ["03", "99.9%", "uptime"],
    ],
  },
  {
    id: "canvas",
    name: "Canvas Studio",
    eyebrow: "Creative tooling",
    description:
      "A browser-based design canvas with multiplayer editing, version history, and export pipelines.",
    images: [projectImages[2], projectImages[1], projectImages[0]],
    tech: ["React", "WebSockets", "Figma"],
    github: "https://github.com/",
    live: "https://vercel.com/",
    metrics: [
      ["01", "60fps", "canvas rendering"],
      ["02", "5.6k", "monthly creators"],
      ["03", "28%", "faster exports"],
    ],
  },
];

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function CertificateButton({ title, image }: { title: string; image: string }) {
  return (
    <button
      type="button"
      className="certificate-button"
      onClick={() => window.open(image, "_blank", "noopener,noreferrer")}
    >
      <span>{title}</span>
      <ExternalLink />
    </button>
  );
}

const tabs = [
  { id: "personal", label: "Personal Projects", icon: CircleUserRound },
  { id: "team", label: "Team Projects", icon: Users },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "events", label: "Events Participated", icon: CalendarDays },
  { id: "extra", label: "Extra-Curricular", icon: Network },
];

const activities = [
  {
    title: "Design systems workshop",
    place: "Design Guild · 2024",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Hackathon weekend",
    place: "Build night · 2023",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mentorship circle",
    place: "Community · 2023",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Product offsite",
    place: "Studio team · 2022",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Open source sprint",
    place: "Community · 2022",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=75&crop=entropy",
  },
  {
    title: "Campus tech talk",
    place: "University · 2021",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=75&crop=entropy",
  },
  {
    title: "UX research day",
    place: "Design Guild · 2021",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=75&crop=entropy",
  },
  {
    title: "Volunteer coding club",
    place: "Local school · 2020",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=75&crop=entropy",
  },
];

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

  useEffect(() => {
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
            0{projects.indexOf(project) + 1} / 0{projects.length}
          </span>
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
        </div>
        <button
          className="cover-arrow"
          aria-label="Next screenshot"
          onClick={() =>
            setImageIndex((imageIndex + 1) % project.images.length)
          }
        >
          <ChevronRight />
        </button>
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
            <a
              className="project-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon /> GitHub
            </a>
            <a
              className="project-link"
              href={project.live}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink /> Live
            </a>
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
  team = false,
  onOpen,
}: {
  team?: boolean;
  onOpen: (project: (typeof projects)[number]) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const allItems = team
    ? [projects[2], projects[1], projects[0], projects[5], projects[3]]
    : projects;
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
    return matchesQuery && (filter === "All" || project.tech.includes(filter));
  });
  const pageSize = 4;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Selected work / 2022 — 2025</p>
          <h1>{team ? "Built together." : "Built with intention."}</h1>
          <p className="section-description">
            {team
              ? "Collaborative products, shipped with thoughtful teams and ambitious partners."
              : "Digital products for people who care about clarity, craft, and the details between the lines."}
          </p>
        </div>
        <span className="availability">
          <span /> Available for select work
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
            placeholder="Search projects"
            aria-label="Search projects"
          />
        </label>
        <div className="filter-row">
          <SlidersHorizontal />
          <span>Filter</span>
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
        <div className="empty-projects">No projects match that search.</div>
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
  const events = [
    [
      "Vercel Ship 2024",
      "Oct 18, 2024 · 10:00 AM",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",
    ],
    [
      "React Summit",
      "Jun 12, 2024 · 09:30 AM",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=85",
    ],
    [
      "Product Camp",
      "Mar 02, 2023 · 02:00 PM",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=85",
    ],
    [
      "Next.js Conf",
      "Oct 25, 2023 · 11:00 AM",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80&crop=entropy",
    ],
    [
      "JSWorld Meetup",
      "Aug 14, 2023 · 06:30 PM",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80&crop=entropy",
    ],
    [
      "Design Systems Day",
      "Nov 09, 2022 · 01:00 PM",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80&crop=entropy",
    ],
  ];
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const pageCount = Math.ceil(events.length / pageSize);
  const visible = events.slice((page - 1) * pageSize, page * pageSize);
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Events / Certificates</p>
          <h1>Keep learning.</h1>
          <p className="section-description">
            A small archive of rooms, conversations, and communities that shaped
            the work.
          </p>
        </div>
      </div>
      <div className="events-list">
        {visible.map(([name, date, image]) => (
          <button
            className="event-card"
            key={name}
            onClick={() => onImage(image)}
          >
            <img src={image} alt="" />
            <div>
              <span className="event-index">
                0{events.findIndex((event) => event[0] === name) + 1}
              </span>
              <h3>{name}</h3>
              <p>{date}</p>
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
          label="Event pages"
        />
      )}
    </section>
  );
}

function ExtraView() {
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const pageCount = Math.ceil(activities.length / pageSize);
  const visible = activities.slice((page - 1) * pageSize, page * pageSize);
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Outside the viewport</p>
          <h1>People, not pixels.</h1>
          <p className="section-description">
            The work behind the work: mentoring, facilitating, and making space
            for good ideas.
          </p>
        </div>
      </div>
      <div className="gallery-grid">
        {visible.map((activity) => (
          <figure className="gallery-item" key={activity.title}>
            <img src={activity.image} alt={activity.title} />
            <figcaption>
              <strong>{activity.title}</strong>
              <span>{activity.place}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {pageCount > 1 && (
        <Pagination
          page={page}
          pageCount={pageCount}
          onChange={setPage}
          label="Activity pages"
        />
      )}
    </section>
  );
}

function ExperienceView() {
  const roles = [
    {
      role: "Staff Frontend Engineer",
      company: "Northstar Labs",
      years: "2022 — Present",
      type: "Full-time internship → Staff role",
      duration: "3 years 8 months",
      certificate: "Staff Engineering Certificate",
      certificateImage:
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1200&q=85",
      description:
        "Leading product engineering across design systems, performance, and high-quality customer-facing experiences.",
      summary:
        "Owned the frontend platform, mentored a team of six engineers, and partnered with product leadership to turn a complex analytics suite into a clear, dependable workspace.",
    },
    {
      role: "Senior Software Engineer",
      company: "Goodline Studio",
      years: "2020 — 2022",
      type: "Software engineering internship",
      duration: "2 years 4 months",
      certificate: "Professional Excellence Certificate",
      certificateImage:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85",
      description:
        "Shipped durable web platforms with small, cross-functional teams and a strong bias toward clarity.",
      summary:
        "Built customer-facing web experiences from discovery through launch, established reusable UI patterns, and helped the team improve its delivery practices.",
    },
    {
      role: "Frontend Engineer",
      company: "Independent",
      years: "2018 — 2020",
      type: "Independent contract",
      duration: "1 year 11 months",
      certificate: "Frontend Development Certificate",
      certificateImage:
        "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=85",
      description:
        "Partnered with founders and product teams to turn early ideas into useful, polished products.",
      summary:
        "Delivered focused prototypes and production interfaces for early-stage teams, translating ambiguous ideas into useful products people could understand quickly.",
    },
  ];
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Experience / Selected chapters</p>
          <h1>Work that compounds.</h1>
          <p className="section-description">
            A career shaped by thoughtful teams, ambitious products, and a
            consistent focus on making complex things feel simple.
          </p>
        </div>
      </div>
      <div className="experience-list">
        {roles.map((item) => (
          <article className="experience-card" key={item.role}>
            <div className="experience-years">{item.years}</div>
            <div className="experience-content">
              <p className="section-kicker">{item.company}</p>
              <h3>{item.role}</h3>
              <div className="experience-meta">
                <span>{item.type}</span>
                <span>{item.duration}</span>
              </div>
              <p>{item.description}</p>
              <p className="experience-summary">
                <strong>Summary</strong>
                {item.summary}
              </p>
              <button
                className="certificate-button"
                onClick={() =>
                  window.open(
                    item.certificateImage,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                <span>{item.certificate}</span>
                <ExternalLink />
              </button>
            </div>
          </article>
        ))}
      </div>
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
          <p className="section-kicker">Contact / Start a conversation</p>
          <h1>Let&apos;s make something clear.</h1>
          <p className="section-description">
            Tell me what you&apos;re building, where it feels stuck, and what a
            good outcome looks like.
          </p>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label>
          Name
          <input name="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label className="full-field">
          Subject
          <input name="subject" required />
        </label>
        <label className="full-field">
          Message
          <textarea name="message" rows={7} required />
        </label>
        <div className="form-footer">
          <button
            className="primary-button"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sent"
              ? "Message queued"
              : status === "sending"
                ? "Sending…"
                : "Send Message"}{" "}
            <Send />
          </button>
          {status === "sent" && (
            <span className="form-success">
              Thanks — I&apos;ll be in touch soon.
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
  return (
    <section className="detail-view">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft /> Back to projects
      </button>
      <div className="detail-hero">
        <div>
          <p className="section-kicker">
            Case study / 0{projects.indexOf(project) + 1}
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
            <a href="#contact" className="primary-button">
              Let&apos;s work together <ArrowRight />
            </a>
            <GlassButton label="View source on GitHub">
              <GithubIcon />
            </GlassButton>
          </div>
        </div>
        <div className="detail-image">
          <img
            src={project.images[imageIndex]}
            alt={`${project.name} case study`}
          />
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
        </div>
      </div>
      <div className="metrics-grid">
        {project.metrics.map(([number, value, label]) => (
          <div className="metric" key={number}>
            <span>{number}</span>
            <strong>{value}</strong>
            <p>{label}</p>
          </div>
        ))}
      </div>
      <div className="detail-note">
        <Sparkles />
        <div>
          <h3>Designed for the last 10%</h3>
          <p>
            From system architecture to the final interaction, I stay close to
            the details that make a product feel inevitable.
          </p>
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
          <span>
            DEV<span>.PORTFOLIO</span>
          </span>
        </a>
        <div className="header-status">
          <span className="pulse" /> Executive engineering
        </div>
        <div className="top-actions">
          <button
            className="theme-toggle"
            aria-label="Toggle color theme"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun /> : <Moon />}
          </button>
          <a className="header-link" href="https://github.com">
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
          aria-label={
            isMobileSidebarOpen ? "Close navigation" : "Open navigation"
          }
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
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
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="social-icon"
              >
                <FaInstagram />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="social-icon"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:hello@example.com"
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
        <div className="mobile-tabs">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              className={activeTab === id ? "active" : ""}
              onClick={() => {
                setActiveTab(id);
                setSelectedProject(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>
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
            <ProjectsView team onOpen={setSelectedProject} />
          ) : activeTab === "experience" ? (
            <ExperienceView />
          ) : activeTab === "events" ? (
            <EventsView onImage={setLightbox} />
          ) : activeTab === "contact" ? (
            <ContactView />
          ) : (
            <ExtraView />
          )}
        </section>
      </div>
      <footer className="bottom-bar">
        <span>© 2025 Alex Vance</span>
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
