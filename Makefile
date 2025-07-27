.PHONY: all up down plan stage demo clean

# Start all background services (Graphiti, MCP servers)
up:
	@echo "🚀 Starting infrastructure..."
	docker compose up -d
	opencode serve &

# Stop all services
down:
	@echo "🛑 Stopping all services..."
	docker compose down --volumes
	killall opencode || true # Use 'true' to prevent error if process not found

# Act I: Generate the sprint plan
plan:
	@echo "🤖 Act I: Generating sprint plan with @task-master..."
	/Users/bigmrrob/.bun/bin/claude --dangerously-skip-permissions "> First, write this PRD to .taskmaster/docs/prd.txt: 'Launch the V1 of the Kicks AI platform. We need a database to store trends and concepts, an API to serve them, and a UI to display them as concept cards.' Then use the taskmaster-ai_parse_prd tool with projectRoot='/Users/bigmrrob/ai-sandbox' and input='/Users/bigmrrob/ai-sandbox/.taskmaster/docs/prd.txt' to parse it. The tool will automatically create the tasks in the .taskmaster/tasks/ folder."

# Act II: Stage the plan onto Vibe Kanban
stage:
	@echo "📊 Act II: Staging tasks onto Vibe Kanban..."
	/Users/bigmrrob/.bun/bin/claude --dangerously-skip-permissions "> Read the tasks from .taskmaster/tasks/tasks.json and create each task in Vibe Kanban using the vibe_kanban_create_task MCP tool. Use project_id='7b553861-1280-4132-8f7c-be6e2b240828'. For each task, set the title from the task title, and create a description that includes the task description, details, priority, and dependencies. Assign owners based on task type: database/schema tasks to @data-agent, API/backend tasks to @api-agent, UI/frontend tasks to @ui-agent, and testing/documentation tasks to @qa-agent."

# Act III: Execute the sprint
demo:
	@echo "🎬 Act III: Executing sprint with @orchestrator..."
	/Users/bigmrrob/.bun/bin/claude --dangerously-skip-permissions "> Use the orchestrator sub agent to execute the full sprint from the Vibe Kanban board."

# Show current tasks
show:
	@echo "📋 Current tasks in TaskMaster AI:"
	@if [ -f .taskmaster/tasks/tasks.json ]; then \
		cat .taskmaster/tasks/tasks.json | jq '.tasks[] | {id, title, status, priority}' 2>/dev/null || cat .taskmaster/tasks/tasks.json; \
	else \
		echo "❌ No tasks found. Run 'make plan' first!"; \
	fi

# Clean up demo artifacts
clean:
	@echo "🧹 Cleaning up worktrees and tasks.json..."
	rm -f tasks.json
	# This command is powerful. It force-removes all git worktrees.
	git worktree list | awk '{print $1}' | xargs -I {} git worktree remove {} --force