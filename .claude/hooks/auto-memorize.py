#!/usr/bin/env python3
import json
import sys
import subprocess
import os
from datetime import datetime

def run_command(command):
    return subprocess.run(command, capture_output=True, text=True, shell=True)

# 1. Get context from the hook's stdin
input_data = json.load(sys.stdin)
project_dir = os.environ.get("CLAUDE_PROJECT_DIR")
# We can get the task ID from the worktree path or another source
worktree_path = os.getcwd() 
task_id = os.path.basename(worktree_path)

# 2. Get the code changes
os.chdir(project_dir)
diff_result = run_command(f"cd {worktree_path} && git diff --staged --name-only")
modified_files = diff_result.stdout.strip().split('\n')

if not modified_files or not modified_files[0]:
    print("[HOOK] No changes to memorize.", file=sys.stderr)
    sys.exit(0)

# 3. Create a STRUCTURED JSON episode
episode_data = {
    "task": {
        "id": task_id,
        "status": "completed",
        "completed_at": datetime.now().isoformat()
    },
    "artifacts": [
        {"type": "file", "path": f} for f in modified_files
    ],
    "summary": f"Task {task_id} was completed, modifying {len(modified_files)} file(s)."
}

# 4. Construct the opencode command to add the structured memory
# Note the source="json"
opencode_command = f"""
opencode run "@graphiti add_memory name='Task Completion: {task_id}' episode_body='{json.dumps(episode_data)}' source='json' source_description='Automated Git Commit Hook'"
"""

print(f"[HOOK] Memorizing structured facts for task {task_id}...", file=sys.stderr)
run_command(opencode_command)
print(f"[HOOK] Memorization complete.", file=sys.stderr)

sys.exit(0)