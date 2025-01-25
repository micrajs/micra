# Documentation Style Guide

## Purpose

The Micra Documentation Style Guide ensures consistency, clarity, and accessibility across all documentation. It serves as a reference for contributors, maintainers, and reviewers to create high-quality, user-centric content.

## General Guidelines

### Tone and Voice

- **Friendly yet Professional**: Write with approachability and clarity while maintaining professionalism.
- **Developer-Centric**: Focus on developers’ needs and anticipate their challenges.
- **Inclusive Language**: Use gender-neutral terms and avoid jargon unless it’s industry-standard and well-defined.

### Writing Style

- Use active voice and concise sentences.
- Avoid complex sentence structures and technical jargon.
- Write in the second person (e.g., “you can use,” “you will learn”).
- Prefer lists and tables over long paragraphs for clarity.

### Formatting

- Use **Markdown** for all documentation.
- Follow consistent heading levels (e.g., `#`, `##`, `###`).
- Use inline code formatting (`code`) for file names, commands, and code snippets.
- Highlight key terms and concepts using bold or italics sparingly.

## Diátaxis Framework Implementation

The Diátaxis framework is a systematic approach to organizing technical documentation into four distinct types: Tutorials, How-To Guides, Reference, and Explanation. Each type serves a specific purpose, catering to different user needs and ensuring clarity and efficiency in communication. For more information, visit the [Diátaxis website](https://diataxis.fr).

This framework was chosen because it clearly separates different types of content based on user intent, ensuring that developers can quickly find the exact type of information they need. It also helps contributors focus their efforts, leading to a more structured and user-friendly documentation suite.

### Tutorials

- **Purpose**: Provide an immersive learning experience that combines theory and practice, guiding users through key concepts and workflows in a narrative style.
- **Structure**:
  1. **Introduction**: Set the stage by introducing the goal, the problem to solve, or the experience to gain.
     - Example: “In this tutorial, you’ll learn how to set up and configure a Micra application, gaining insight into its core concepts and tools.”
  2. **Background**: Briefly outline any foundational knowledge or context needed for the tutorial.
  3. **Journey**: Lead the user through a cohesive experience:
     - Introduce concepts naturally as they’re needed.
     - Incorporate tasks that demonstrate their use.
     - Provide explanations and tie ideas together.
  4. **Reflection**: Summarize the journey, emphasizing what the user has learned and encouraging them to explore further.
- **Examples**:
  - “Building a Modular Application with Micra”
  - “Exploring the Lifecycle System in Depth”

### How-To Guides

- **Purpose**: Solve specific, real-world problems.
- **Structure**:
  1. **Goal**: Clearly state the objective.
  2. **Context**: Provide any necessary background or assumptions.
  3. **Steps**: Present numbered, actionable steps to solve the problem. Include code snippets, diagrams, or examples where applicable.
     - Format steps as: `Step 1: Description of the first action.`
  4. **Verification**: Explain how to confirm the solution works.
- **Examples**:
  - “How to Configure Scoped Environments”
  - “How to Use Event Emitters”

### Reference

- **Purpose**: Deliver accurate, reliable, and complete information.
- **Structure**:
  1. **Overview**: Brief description of the feature or API.
  2. **Details**: Provide syntax, parameters, return types, and examples.
  3. **Edge Cases**: Mention limitations, defaults, and exceptions.
- **Automation**:
  Reference documentation should be automatically generated from TypeScript types, interfaces, and docblocks. This ensures accuracy and reduces maintenance overhead. The following practices will be implemented:
  - Leverage tools like TypeDoc or custom scripts to parse TypeScript code and generate documentation.
  - Ensure docblocks in the code are comprehensive and follow JSDoc standards.
  - Include auto-generated documentation in the build pipeline to maintain up-to-date references.
- **Examples**:
  - API Documentation for `ServiceContainer`
  - Configuration Schema

### Explanation

- **Purpose**: Provide conceptual and contextual understanding.
- **Structure**:
  1. **Introduction**: Introduce the topic or concept.
  2. **Context**: Explain why the concept is important or how it fits in.
  3. **Details**: Elaborate on the topic with examples or analogies.
  4. **Conclusion**: Summarize the explanation and its relevance.
- **Examples**:
  - “Understanding Micra’s Lifecycle Abstractions”
  - “The Philosophy of Modular Architecture”

## Code Examples

- Ensure all code snippets are correct, functional, and concise.
- Use consistent formatting, with syntax highlighting where possible.
- Include comments to clarify complex sections.
- Provide context before and after the code snippet.

## Accessibility Standards

- Ensure all images have descriptive alt text.
- Use semantic HTML for web-based documentation.
- Provide translations or localization guidelines to enable non-English speakers to contribute and benefit from the documentation.

## Contribution Process

- Follow the contribution guidelines outlined in the [Documentation Guidelines Document](../contributing/Documentation%20Guidelines.md).
- Adhere to this style guide for all new and updated documentation.
- Use templates for tutorials, how-to guides, and other types of content to ensure consistency.
- Include a reviewer checklist to validate adherence to the style guide.
  - **Example Reviewer Checklist**:
    - Does the content align with the type-specific structure (Tutorial, How-To Guide, etc.)?
    - Are the instructions clear and concise?
    - Are accessibility standards met (e.g., alt text, semantic HTML)?
    - Is the content free from spelling or grammatical errors?

## Continuous Improvement

This style guide is a living document. Suggestions for improvement can be submitted as issues or pull requests in the repository. Metrics for evaluating documentation quality include:

- User satisfaction scores.
- Reduced issue resolution time.
- Increased number of contributions adhering to the guide.
