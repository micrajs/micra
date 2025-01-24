# Documentation Guidelines

Contributing to documentation is a fantastic way to support the community and improve the usability of the framework. Follow these guidelines to create clear, accurate, and helpful documentation.

---

## **1. Types of Documentation**

The framework’s documentation is organized into four distinct categories, based on the [Diátaxis framework](https://diataxis.fr):

### **1. Tutorials**

- **Purpose:** Provide step-by-step learning experiences for new users.
- **Examples:** "Getting Started with the Framework," "Building Your First Application."
- **Guidelines:**
  - Assume no prior knowledge of the framework.
  - Focus on guiding the user through a single, well-defined learning path.
  - Include detailed steps, screenshots, and explanations.

### **2. How-To Guides**

- **Purpose:** Solve specific problems or achieve real-world goals.
- **Examples:** "How to Add Authentication," "Configuring Build Pipelines."
- **Guidelines:**
  - Be goal-oriented and practical.
  - Avoid unnecessary background information; focus on actionable steps.
  - Provide minimal but clear explanations alongside instructions.

### **3. Reference Documentation**

- **Purpose:** Serve as an authoritative resource for precise technical details.
- **Examples:** API references, configuration options, CLI commands.
- **Guidelines:**
  - Written directly on TypeScript types and interfaces on docblocks in the codebase.
  - Be complete, accurate, and reliable.
  - Avoid interpretation or distraction.
  - Use consistent formatting for parameters, return values, and examples.

### **4. Explanations**

- **Purpose:** Provide context, background, and conceptual understanding.
- **Examples:** "Understanding the Framework’s Architecture," "Why Use Dependency Injection."
- **Guidelines:**
  - Focus on answering "why" questions and connecting concepts.
  - Use diagrams or analogies to illustrate complex ideas.
  - Avoid task-oriented content; keep it explanatory.

---

## **2. Writing Guidelines**

### Code-Adjacent Documentation

- **Location:** Documentation should live alongside the package it describes in a `docs` folder (e.g., `/packages/application/docs/`).
- **Purpose:** Keeps documentation close to the code it explains, ensuring consistency and ease of maintenance.
- **Guidelines:**
  - Use this folder for Tutorials, How-To Guides, Reference, and Explanation documents specific to the package.
  - Maintain a clear structure within the `docs` folder (e.g., separate subfolders for guides, references, etc.).
  - Synchronize changes in code with updates in the documentation.

### For All Documentation Types:

- **Clarity:**
  - Use simple, concise language.
  - Define technical jargon when necessary, but avoid it where possible.
- **Examples:**
  - Incorporate practical, relevant examples to reinforce key points.
- **Accuracy:**
  - Ensure documentation aligns with the latest features and updates.
  - Regularly review and update content to prevent inaccuracies.
- **Visual Aids:**
  - Add diagrams, screenshots, or videos to improve understanding.

### Tailored Guidelines:

- **Tutorials:** Be empathetic to learners; guide them through every step without assuming prior knowledge.
- **How-To Guides:** Focus on achieving the goal efficiently; avoid unrelated context.
- **Reference:** Prioritize factual accuracy and structure over readability; use tables and consistent layouts. Ensure that automated tools, like TypeDoc, are properly configured for seamless integration.
- **Explanations:** Dive deep into concepts; provide background information and connect ideas.

---

## **3. Reviewing and Improving Documentation**

### Guidelines:

- Identify and address gaps or outdated information.
- Ensure consistency in tone, formatting, and style.
- Add cross-references between related topics for easier navigation.
- Solicit feedback from users to identify areas for improvement.

---

## **4. Tools and Resources**

- **Markdown:** Use Markdown syntax for creating and editing documentation.
- **TypeDoc:** Generate API reference documentation directly from TypeScript types and docblocks.
- **Diátaxis Framework:** Refer to [Diátaxis](https://diataxis.fr) for best practices.

---

By contributing to documentation, you’re empowering others to succeed with the framework. Your efforts make a significant impact—thank you for helping us grow!
