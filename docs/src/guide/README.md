# Executive Summary

The organisation’s current software delivery process relies heavily on manual steps, inconsistent validation, and uneven use of tooling. This makes releases less predictable and increases the risk of defects and delays. Improving this process will support more reliable releases, better code quality, and a faster pace of delivery over time.

This business case proposes a phased move to a more automated, policy-driven delivery model using modern DevOps tooling (Azure DevOps, GitHub, or a combination), automated validation, standardised coding practices, and AI-assisted reviews. Both options support the same core goals: improved speed, quality, and visibility, with minimal disruption and migration risk.

A working example of the proposed automated PR validation and build setup is available. This primarily demonstrates the GitHub workflow, with some example Azure DevOps configurations, as permission constraints limited full Azure testing.

---

# Problem Statement

Current delivery practices could be improved to deliver better quality software, faster. Manual release steps, weak policy enforcement, and inconsistent validation increase the likelihood of production defects, late fixes, and opaque release decisions. Developers and reviewers frequently spend time on low-value activities (e.g., formatting, manual asset builds) instead of higher-value tasks like design and defect analysis.

**Key Pain Points:**

- Main branches are not fully protected, and merge rules are applied inconsistently, increasing risk of defects reaching production.  
- Assets such as SCSS are built on local machines and uploaded manually during releases, creating risk of environment drift and low visibility.  
- Pull requests exist, but reviewers often focus on style and formatting. AI-assisted tools in GitHub and Azure DevOps are underused.

---

# Objectives and Success Measures

**Objectives:**

- Introduce automated validation checkpoints (linting, tests, build checks) at the pull request stage.  
- Standardise coding style and enforce it via automated tools, reducing low-value review comments.  
- Centralise build generation to remove manual release variability.  
- Improve visibility for managers and stakeholders via repository and DevOps board integration.  
- Ensure clear ownership and documentation for pipelines, policies, and release processes.

**Success Criteria:**

- Fewer last-minute release fixes and production hotfixes.  
- Reduced review comments on code readability and formatting, with more focus on logic and defects.  
- Shorter pull request cycle times from open to merge.  
- Consistent enforcement of branch protection (e.g., required reviews, status checks, no direct pushes).  
- Increased visibility of code status on DevOps boards.

---

# Solution Options

Two options are in scope:  

1. **Azure DevOps–only approach**  
2. **Hybrid GitHub + Azure DevOps approach** (recommended)  

Both can use GitHub Copilot and Azure OpenAI for AI-assisted coding and review. The main differences are where source code is hosted and how workflows are integrated.

| Option | Description | Pros | Cons |
|--------|------------|------|------|
| **Azure DevOps only** | Migrate source control and pipelines fully into Azure DevOps (Azure Repos + Azure Pipelines + Boards). | Single environment for repos, pipelines, and work tracking. Some individuals already have Visual Studio subscriptions, so only two new licenses needed. | Requires migration from existing GitHub repos. Platform doesn’t have native AI PR reviews; requires custom bot implementation. |
| **Hybrid GitHub + Azure DevOps** | Keep GitHub as the system of record, integrate Azure DevOps for boards and reporting. | Minimal disruption to existing GitHub repos. Easily use GitHub Copilot for AI-assisted PR reviews. | Requires clear documentation to avoid fragmented visibility. Higher cost than Azure DevOps-only. |

**AI Options:**

- **Azure OpenAI:** Bot-based automatic PR review integrated with Azure DevOps pipelines. Cost varies with usage; requires custom development.  
- **GitHub Copilot:** AI-assisted coding and PR review per developer. Easy to enable on a per-user basis. Only covers licensed users.

---

# Costs, Resources, and Risks

**Platform Costs:**

| Category | Azure DevOps Only | Hybrid GitHub + Azure DevOps |
|----------|-----------------|-----------------------------|
| Platform & Access | Azure DevOps repos, pipelines, and Boards. 2 users need paid Azure DevOps Basic (~$6/user/month). | GitHub hosts code and PRs. Azure DevOps for work tracking. GitHub Team plan (~$4/user/month × 5 users). |
| Estimated Cost | 2 × $6 = $12/month → $144/year | 5 × $4 = $20/month → $240/year |

**AI & Automation Costs:**

| Option | Cost |
|--------|------|
| Azure OpenAI | $20/month → $240/year |
| GitHub Copilot Business | $19/user/month × 5 users → $95/month → $1,140/year |
| GitHub Copilot Individual | $10/user/month × 5 users → $50/month → $600/year |

**Risks and Mitigation:**

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Azure migration errors | Medium | High | Start with pilot repo, one-day code freeze for critical changes, rollback plan. |
| Unexpected AI cost spikes | Medium | High | Implement bot budget tracking + Azure cost alerts. |
| Over-reliance on AI | Low | High | Require at least one human review. |
| Resistance to process/tool changes | Medium | Medium | Targeted training, phased rollout, early adopters as champions. |
| Continued manual release steps | Medium | Low | Gradually replace manual steps with automated checks starting in non-production. |
| Unclear ownership of pipelines/policies | Medium | Medium | Define and document roles for pipeline and policy ownership. |

---

# Implementation Plan & Next Steps

## Phased Delivery

### Phase 1 – PR Governance & Validation

| Focus Area | Action / Task | Platform / Notes |
|------------|---------------|----------------|
| Branch Protection | Merge dev → main, link tasks | GitHub Actions or Azure Pipelines; Paid plans improve enforcement |
| Work Item Linkage | Link tasks manually / automatically | Ensures every code change is tied to a task |
| Linting/Validation | Stylelint (SCSS/CSS), ESLint (JS/TS) on PRs | Required status before merging; automated checks |
| Reviewers | Auto-assign + required approvals | Ensures code is reviewed before merge |
| Documentation | Markdown files in docs/ folder | Push to Wiki if using Azure DevOps |
| AI Support | GitHub Copilot PR review | Azure OpenAI bot concept stage; not yet implemented |

### Phase 2 – Central Build & Artifact Generation

| Focus Area | Action / Task | Notes |
|------------|---------------|------|
| Builds | Central SCSS build pipeline, triggered on demand | Ensures consistent, reproducible builds |
| Documentation | Central Wiki publishing | GitHub Wiki or Azure DevOps Wiki |

**Decision Checkpoints:**

- **Phase 1:** Validate improvements in PR quality, review time, early defect detection  
- **Phase 2:** Assess build consistency, deployment confidence, reduction in manual release steps

---

# Approvals Requested

- Agreement on platform strategy as the target model.  
- Approval to initiate Phase 1: Automated Code Review and PR Validation on a pilot repository.  

**Immediate Next Steps (post-approval):**

1. Inform team about final decisions; schedule Q&A session.  
2. Start Phase 1.

---

# References

- [GitHub Pricing](https://github.com/pricing)  
- [Azure DevOps Pricing](https://azure.microsoft.com/en-us/pricing/details/devops/)  
- [GitHub Copilot](https://github.com/features/copilot)
