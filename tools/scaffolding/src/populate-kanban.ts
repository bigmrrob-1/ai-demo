import fs from 'node:fs/promises';
import path from 'node:path';

// Hardcoded project ID for the demo
const _VIBE_PROJECT_ID = '7b553861-1280-4132-8f7c-be6e2b240828';
const TASKMASTER_TASKS_FILE = path.join(
  __dirname,
  '../../../.taskmaster/tasks/tasks.json'
);

interface TaskMasterTask {
  id: number;
  title: string;
  description: string;
  details?: string;
  priority: string;
  dependencies: number[];
  status: string;
}

interface TasksData {
  master: {
    tasks: TaskMasterTask[];
    metadata: any;
  };
}

async function main() {
  let tasksData: TasksData;
  try {
    const tasksJson = await fs.readFile(TASKMASTER_TASKS_FILE, 'utf-8');
    tasksData = JSON.parse(tasksJson);
  } catch (_error) {
    process.exit(1);
  }

  const tasks = tasksData.master.tasks;

  // Create a simple mapping of task owners based on task type
  const getOwner = (task: TaskMasterTask): string => {
    const title = task.title.toLowerCase();
    const desc = task.description.toLowerCase();

    if (
      title.includes('database') ||
      title.includes('schema') ||
      desc.includes('database') ||
      desc.includes('schema')
    ) {
      return '@data-agent';
    }
    if (
      title.includes('api') ||
      title.includes('backend') ||
      desc.includes('api') ||
      desc.includes('endpoint')
    ) {
      return '@api-agent';
    }
    if (
      title.includes('ui') ||
      title.includes('component') ||
      title.includes('page') ||
      desc.includes('frontend')
    ) {
      return '@ui-agent';
    }
    if (title.includes('test') || title.includes('documentation')) {
      return '@qa-agent';
    }
    return '@orchestrator';
  };

  for (const task of tasks) {
    const _owner = getOwner(task);
  }
}

main().catch(console.error);
