# AI Agent Orchestration System

This repository implements an advanced AI orchestration system that uses the CODEOWNERS file as a routing table for specialized AI agents.

## The Big Idea

We've transformed the standard GitHub CODEOWNERS file from a simple notification system into a sophisticated AI routing table. Instead of notifying human reviewers, it directs an orchestrator agent to delegate tasks to specialized AI agents based on file ownership.

## How It Works

### 1. Task Reception
The orchestrator agent receives a high-level task (e.g., "Add a shopping cart feature").

### 2. Task Analysis
The orchestrator:
- Breaks down the task into components
- Identifies which files need to be modified
- Consults `.github/CODEOWNERS` to determine ownership

### 3. Intelligent Delegation
Based on CODEOWNERS mappings:
- `/apps/web/` → @ui-agent handles frontend changes
- `/apps/api/` → @api-agent handles backend endpoints
- `/packages/db/` → @data-agent handles database schema

### 4. Coordinated Execution
The orchestrator ensures proper sequencing (e.g., API endpoints before UI integration).

## Example Workflow

**User Request:** "Add an 'Add to Cart' button on the product page"

**Orchestrator Process:**
1. Identifies needed changes:
   - New button in `/apps/web/src/components/ProductPage.tsx`
   - API endpoint in `/apps/api/src/routes/cart.ts`
   - Database schema in `/packages/db/schema/cart.ts`

2. Consults CODEOWNERS:
   - `/apps/web/` owned by @ui-agent
   - `/apps/api/` owned by @api-agent
   - `/packages/db/` owned by @data-agent

3. Delegates in order:
   - @data-agent: "Create cart schema with userId and productId"
   - @api-agent: "Create POST /api/cart endpoint"
   - @ui-agent: "Add cart button calling the new endpoint"

## Benefits

### 1. **Automated Task Routing**
No manual assignment needed - the system automatically routes tasks to the right specialist.

### 2. **Architectural Enforcement**
Agents can only modify their designated areas, preventing architectural violations.

### 3. **Specialized Expertise**
Each agent is optimized for its domain, resulting in higher quality code.

### 4. **Self-Documenting**
CODEOWNERS serves as both routing table and architectural documentation.

### 5. **Scalable**
Easy to add new agents or reassign ownership as the project grows.

## Agent Directory

See individual agent configurations in `.opencode/agents/`:
- `orchestrator-agent.md` - Master coordinator
- `ui-agent.md` - Frontend specialist
- `api-agent.md` - Backend specialist
- `data-agent.md` - Database specialist

## Implementation

To use this system:
1. The orchestrator agent reads `.github/CODEOWNERS`
2. It matches file paths to agent owners
3. It delegates tasks with specific, focused instructions
4. Each specialist agent works only in its designated areas

This transforms AI code generation from a single-agent task to a coordinated team effort, mimicking how real development teams operate.