export type Contributor = {
  name: string;
  role: string;
  focus: string;
  group: string;
  summary: string;
  overallContribution: string;
  areas: string[];
  highlights: string[];
  photo?: string;
};

export const contributors: Contributor[] = [
  {
    name: "Abdul Ahad S",
    role: "Co-founder and Engineering Lead",
    focus: "Engineering direction",
    group: "Founding team",
    summary:
      "Leads product thinking, engineering direction, and the technical systems that shape Devdopz.",
    overallContribution:
      "Abdul Ahad helps drive the overall engineering quality of Devdopz, from product structure and implementation direction to the technical decisions that support the organization as it grows.",
    areas: ["Engineering", "Product direction", "Technical execution"],
    highlights: [
      "Guides the core engineering direction behind Devdopz work",
      "Helps turn ideas into structured product and website output",
      "Supports long-term technical decisions across the organization",
    ],
  },
  {
    name: "Muhammed Aslam Shah",
    role: "Co-founder and Development Lead",
    focus: "Development leadership",
    group: "Founding team",
    summary:
      "Drives development execution and helps keep Devdopz moving from planning into shipped work.",
    overallContribution:
      "Muhammed Aslam Shah contributes across implementation, development consistency, and execution quality. His role helps make sure Devdopz ideas are not only discussed but also built and delivered properly.",
    areas: ["Development", "Execution", "Delivery quality"],
    highlights: [
      "Leads implementation work across Devdopz projects",
      "Keeps development output practical and forward-moving",
      "Supports delivery quality and technical consistency",
    ],
  },
  {
    name: "Rifan K",
    role: "Brand and Visual Contributor",
    focus: "Brand direction",
    group: "Creative contribution",
    summary:
      "Supports the visual side of Devdopz through branding ideas, presentation clarity, and layout taste.",
    overallContribution:
      "Rifan contributes to how Devdopz is seen and understood visually. His input helps improve identity, presentation quality, and the overall clarity of the organization's visual direction.",
    areas: ["Branding", "Visual systems", "Presentation clarity"],
    highlights: [
      "Contributes to brand direction and visual consistency",
      "Helps improve layout clarity and presentation quality",
      "Supports a cleaner and more recognizable Devdopz identity",
    ],
  },
  {
    name: "Afsal Noor",
    role: "Programs and Project Contributor",
    focus: "Builder programs",
    group: "Community contribution",
    summary:
      "Helps shape collaborative project efforts and the structure behind builder-focused programs.",
    overallContribution:
      "Afsal contributes to the organizational side of Devdopz by helping frame projects, support collaboration, and shape how members can work together in more focused ways.",
    areas: ["Programs", "Project shaping", "Collaboration support"],
    highlights: [
      "Supports builder program thinking and project structure",
      "Helps shape how contributors collaborate around ideas",
      "Adds clarity to community-led project efforts",
    ],
  },
  {
    name: "Hiba Mariyam",
    role: "Content and Communication Contributor",
    focus: "Storytelling",
    group: "Communication contribution",
    summary:
      "Improves how Devdopz communicates its mission, story, and message across public-facing content.",
    overallContribution:
      "Hiba contributes to message clarity and storytelling. Her role helps Devdopz explain itself better, present ideas more clearly, and communicate with a stronger sense of direction.",
    areas: ["Content", "Messaging", "Storytelling"],
    highlights: [
      "Strengthens wording and message clarity",
      "Supports clearer communication of the Devdopz mission",
      "Helps shape a more cohesive public voice",
    ],
  },
  {
    name: "Faris Shan",
    role: "Review and Delivery Contributor",
    focus: "Testing and review",
    group: "Support contribution",
    summary:
      "Supports quality through reviews, feedback loops, and practical improvements across ongoing work.",
    overallContribution:
      "Faris contributes by strengthening review quality and helping ongoing work improve through feedback, refinement, and practical support. His input adds steadiness to the overall builder workflow in Devdopz.",
    areas: ["Review", "Feedback", "Quality support"],
    highlights: [
      "Supports quality through review and practical feedback",
      "Helps improve work before it moves forward",
      "Adds support across delivery and refinement stages",
    ],
  },
];
