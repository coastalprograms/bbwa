# Risk Assessment and Mitigation

## Compliance Risk
- **Risk**: A worker with an expired white card gets on-site.
- **Probability**: Medium
- **Impact**: High (legal liability, safety risk)
- **Mitigation**: Real-time compliance checks via Edge Functions, instant builder notifications via SMS.

## Technical Risk
- **Risk**: The Gemini API or Make.com/n8n integrations fail, blocking a core workflow.
- **Probability**: Medium
- **Impact**: Medium (workflow disruption, manual work needed)
- **Mitigation**: Implement robust error handling and fallbacks. Provide a manual override in the admin dashboard.

## Usability Risk
- **Risk**: The admin dashboard is too complex for the builder to use effectively.
- **Probability**: High
- **Impact**: High (system is abandoned, project fails)
- **Mitigation**: Prioritize a simple, intuitive design. Implement user testing early in Phase 2 to gather feedback.
