# Azure DevOps (Paid) – Key Capabilities

This guide highlights **practical benefits and features of Azure DevOps (Paid)**, emphasizing pull requests, boards, CI visibility, and migration considerations. Images are included to give visual context based on our research.

---

## Pull Requests

Azure DevOps provides transparency and control over code reviews:

* **Force Push Detection** – PRs clearly indicate force pushes, making history rewrites visible and auditable.  
  ![Force Push Notes](images/Azure/Azure notes force push.png)

* **Commit History** – Full commit history is available directly in the PR, improving review context.  
  ![Git History Intact](images/Azure/Azure git history in tack.png)

* **Reviews and Approvals** – All PR review activity and approvals are tracked over time.  
  ![Pull Request List](images/Azure/Azure pull request list.png)  
  ![Pull Request Completed](images/Azure/Azure Pull Request Completed.png)

* **PR Updates via Notifications** – New commits, status changes, and review activity can be sent via email notifications.  
  ![Notifications](images/Azure/Azure notifications.png)

* **Cherry-Pick and Squash Options** – PRs support cherry-pick and squash merge strategies.  
  ![Cherry Pick](images/Azure/Azure Pull Request Cherry Pick.png)  
  ![Squash Commit](images/Azure/Azure Squash commit.png)

* **All Required Checks Visible** – PRs show whether all required builds and checks succeeded.  
  ![All Required Checks](images/Azure/Azure all required checks succeeded.png)  

---

## Azure Boards

Azure Boards integrates planning, work tracking, and traceability:

* **Work Items Linked to Commits & PRs** – Maintains traceability for code and work items.  
  ![Work Items & PRs](images/Azure/Azure see work items an dPRs.png)

* **Boards Can Be Mirrored to GitHub** – Migration risk is low if you decide to switch from Azure DevOps.  
  ![Azure Boards](images/Azure/Azure boards.png)

* **Retrospectives & Planning** – Tools for team retrospectives and planning.  
  ![Retrospectives](images/Azure/Azure Retrospecitvies.png)

* **Organizational Settings** – Teams can configure permissions, policies, and workflows.  
  ![Org Settings](images/Azure/Azure Organizational settings.png)

---

## Build & CI Visibility

CI/CD pipelines in Azure DevOps provide clear insights into build and deployment status:

* **Pipeline Overview** – Build pipelines are easy to navigate and monitor.  
  ![Pipelines Overview](images/Azure/Azure pipelines.png)  
  ![Select a Repo](images/Azure/Azure pipelines select a repo.png)

* **Build Status on PRs** – Pull requests clearly show if builds pass or fail.  
  ![No Hosted Parallelism](images/Azure/Azure No hosted parallelism.png)  
  ![Parallel Requests](images/Azure/Azure DevOps Parallelist Request.png)

* **Code Quality Checks** – Integrated code quality and static analysis.  
  ![Code Quality](images/Azure/Azure code quality.png)

* **Historical Build Results** – Builds and artifacts remain accessible for auditing or troubleshooting.  
  ![Cycle Time](images/Azure/Cyce time on azure.png)

---

## Repository & Branch Management

Azure DevOps gives developers visibility and control over repositories:

* **Graphical Repository Views** – Clear visualization of branches, commits, and PRs.  
  ![DevOps Repo](images/Azure/Azure dev ops repo.png)  
  ![Branch Policy](images/Azure/Azure branch policy.png)

* **Repo Settings & Service Hooks** – Configure policies, integrations, and automation.  
  ![Repo Settings](images/Azure/Azure repo settings.png)  
  ![Service Hooks](images/Azure/Azure service hooks.png)

* **Code Documentation & Readmes** – Markdown support and readme previews.  
  ![Readme Example](images/Azure/Azure readme#.png)

---

## Migration Considerations

* **Low Vendor Lock-In** – Repos and boards can be mirrored to GitHub.  
* **Flexible Adoption** – Teams can adopt Azure DevOps for planning and CI while keeping GitHub as a long-term option.  
* **Hybrid Scenarios Supported** – Azure extensions can work with on-premises or hybrid setups.  
  ![Hybrid Mode](images/Azure/Azure and Hybrid mode Microsoft extension promoted by Azure.png)  
  ![Revert & Publish as Code](images/Azure/Azure revert-publish-as-code-option.png)  
  ![Azure Setup](images/Azure/azure setup.png)  

---

**Summary:**  

Azure DevOps (Paid) provides strong **pull request transparency**, **solid CI/CD feedback**, practical **boards**, and **low-risk migration paths** to GitHub. The platform is suitable for teams that need structure and traceability without being locked in long-term.

