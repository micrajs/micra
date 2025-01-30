# GitHub Issue Organization

This document formalizes the structure and templates for managing the Micra Framework’s GitHub issues, aligning them with our roadmap and goals. By following this system, we ensure consistency, clarity, and alignment with the broader organizational goals.

---

## **Hierarchy Overview**

### **1. Milestones**

- Represent high-level phases from the roadmap (e.g., Foundation Setup, Community Engagement).
- Track overall progress and deadlines for completing roadmap phases.

### **2. Goal Issues**

- Represent specific deliverables within a phase.
- Serve as the parent issue for related projects and tasks.
- Include clear objectives, deliverables, and success metrics.

### **3. Project Issues**

- Represent significant components of a goal.
- Serve as sub-issues of the parent goal issue.
- Break down goals into logical, manageable categories of work.
- Link to associated tasks.

### **4. Task Issues**

- Represent actionable items contributing to a project.
- Small, focused, and self-contained, ensuring ease of execution and review.
- Serve as sub-issues of the parent project issue.

---

## **Templates**

### **1. Goal Issue Template**

```markdown
# Goal: <Goal Name>

## **Objective**

Provide a concise description of the goal’s purpose and goals.

## **Deliverables**

- List major outcomes associated with this goal.

## **Success Metrics**

- Define clear metrics for evaluating the goal’s success.
  - Example: 90% test coverage for core abstractions.
  - Example: Functional CI/CD pipelines.
```

### **2. Project Issue Template**

```markdown
**Project: <Project Name>**

**Description**
Summarize the purpose of this project and how it contributes to its parent goal.

**Key Components**
Outline the primary areas of work within this project.

**Success Criteria**

- Define specific criteria for evaluating the project’s completion.
```

### **3. Task Issue Template**

```markdown
**Task: <Task Name>**

**Description**
Describe the specific action required and its purpose.

**Acceptance Criteria**
Define what needs to be accomplished for this task to be considered complete. Example:

- Code implementation matches design requirements.
- Unit tests are written and pass.
- Documentation is updated.

**Labels**
Add relevant labels (e.g., `Type: feat`, `Effort: sm`).
```

---

## **Best Practices**

### **Roadmap Phases:**

- Align GitHub goals directly with roadmap phases.
- Use success metrics to measure progress objectively.

### **Roadmap Goal Issues:**

- Focus on high-level deliverables and objectives.
- Link directly to projects for logical grouping.

### **Project Issues:**

- Group related tasks logically within a goal.
- Ensure projects align clearly with their parent goal.

### **Tasks:**

- Keep tasks small, actionable, and specific.
- Use acceptance criteria to maintain clarity and accountability.
