# RFC Process

## Purpose

The RFC (Request for Comments) process is designed to enable thoughtful, transparent, and collaborative decision-making for significant changes, particularly API design and architectural decisions. It provides a structured framework for discussing, refining, and approving proposals in alignment with our organizational vision and goals.

## Workflow

### Step 1: Open an RFC Issue

- **Purpose:** Define the problem and propose a high-level solution.
- **Actions:**
  - Use the RFC issue template to outline:
    - **Problem Statement:** What problem are we solving?
    - **Goals and Constraints:** What outcomes are we aiming for?
    - **Context:** Background information, prior work, or related issues.
    - **Checklist of API Design Options:** Placeholder for draft PR links.
  - Submit the issue and assign it a label (`RFC`) for tracking.
  - **Timebox:** Open feedback period for this step is limited to 2 weeks.

### Step 2: Draft API Design PRs

- **Purpose:** Present concrete design options for discussion and review.
- **Actions:**
  - For each design option, create a draft Pull Request (PR):
    - Include a summary of the design.
    - Provide examples and usage scenarios.
    - Introduce TypeScript interfaces in the `core` package.
    - Highlight benefits, trade-offs, and any unresolved questions.
  - Link each draft PR to the corresponding RFC issue for centralized access.
  - Use targeted comments on specific lines of code for detailed discussions.
  - **Timebox:** Iteration phase for draft PRs is limited to 1 month.

### Step 3: Iterate on Designs

- **Purpose:** Refine proposals based on feedback.
- **Actions:**
  - Incorporate feedback into draft PRs through iterative updates.
  - Summarize key discussion points and updates in the RFC issue.
  - Ensure all options remain aligned with the stated goals and constraints.
  - Facilitate discussions and use consensus-building techniques, such as polls or weighted voting systems, to finalize decisions.
  - Document dissenting opinions and how they were addressed to maintain inclusivity.

### Step 4: Approve the RFC and Finalize the Design

- **Purpose:** Select the best option and prepare for implementation.
- **Actions:**
  - Review all linked draft PRs and feedback in the RFC issue.
  - Mark the RFC as `Approved` once consensus is reached.
  - Merge the selected design PR into the main branch.
  - Close the remaining draft PRs with a comment explaining the decision.
  - Define changes that bypass the RFC process to avoid overuse, such as bug fixes and minor non-breaking updates.

### Step 5: Post-Approval Review

- **Purpose:** Evaluate the implementation against stated goals and constraints.
- **Actions:**
  - After implementation, review the design's effectiveness and gather feedback.
  - Document lessons learned and potential improvements for future iterations.

### Step 6: Close the RFC Issue

- **Purpose:** Document the final decision and provide closure.
- **Actions:**
  - Summarize the selected design, reasoning, and next steps in the issue.
  - Close the RFC issue, leaving it as an archived reference.

## Templates

### RFC Issue Template

- **Title:** `RFC: <Short Description>`
- **Problem Statement:**
- **Goals and Constraints:**
- **Context:**
- **Checklist of Design Options:**

### Draft PR Template

- **Title:** `RFC #<Issue Number>: <Option Name>`
- **Summary:**
- **Examples:**
- **TypeScript Interfaces:**
- **Benefits and Trade-offs:**
- **Unresolved Questions:**

## Guidelines

1. **When to Use the RFC Process:**
   - Major API designs or architectural changes.
   - Breaking changes that impact users.
   - Significant new features or workflows.
2. **Roles and Responsibilities:**
   - Contributors: Propose and refine RFCs.
   - Reviewers: Provide feedback, raise concerns, and build consensus.
   - Maintainers: Facilitate discussions, approve RFCs, and oversee implementation.
3. **Best Practices:**
   - Keep discussions constructive and focused on the proposal.
   - Use clear, concise language in RFCs and PRs.
   - Update RFCs and PRs regularly to reflect feedback.

## Benefits of the RFC Process

- **Collaboration:** Encourages input from diverse perspectives.
- **Transparency:** Tracks the decision-making process publicly.
- **Clarity:** Documents rationale and alternatives for future reference.
- **Alignment:** Ensures changes align with organizational goals and principles.

## Potential Challenges

- **Time-Intensive:** Iterative reviews may lengthen decision-making timelines. Using timeboxes for each phase helps mitigate this.
- **Complexity:** Multiple PRs per RFC can become harder to manage. Piloting the process with smaller proposals first can reduce initial friction.
- **Consensus Building:** Achieving agreement may require active facilitation. Leveraging consensus techniques and documenting dissenting opinions promotes fairness.

By adhering to this process, we can make informed, collaborative, and well-documented decisions that enhance our codebase and community.
