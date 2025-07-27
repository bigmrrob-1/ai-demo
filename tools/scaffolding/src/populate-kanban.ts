import fs from 'fs/promises';
import path from 'path';

// Hardcoded project ID for the demo
const VIBE_PROJECT_ID = '7b553861-1280-4132-8f7c-be6e2b240828';
const TASKMASTER_TASKS_FILE = path.join(__dirname, '../../../.taskmaster/tasks/tasks.json');

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
  console.log('📋 Reading tasks from TaskMaster AI...');
  
  let tasksData: TasksData;
  try {
    const tasksJson = await fs.readFile(TASKMASTER_TASKS_FILE, 'utf-8');
    tasksData = JSON.parse(tasksJson);
  } catch (error) {
    console.error('❌ Could not read tasks file. Make sure to run "make plan" first!');
    console.error(`   Looking for file at: ${TASKMASTER_TASKS_FILE}`);
    process.exit(1);
  }

  const tasks = tasksData.master.tasks;
  console.log(`\n📊 Found ${tasks.length} tasks to stage onto Vibe Kanban...`);
  console.log(`🎯 Project ID: ${VIBE_PROJECT_ID}\n`);

  // Create a simple mapping of task owners based on task type
  const getOwner = (task: TaskMasterTask): string => {
    const title = task.title.toLowerCase();
    const desc = task.description.toLowerCase();
    
    if (title.includes('database') || title.includes('schema') || desc.includes('database') || desc.includes('schema')) {
      return '@data-agent';
    } else if (title.includes('api') || title.includes('backend') || desc.includes('api') || desc.includes('endpoint')) {
      return '@api-agent';
    } else if (title.includes('ui') || title.includes('component') || title.includes('page') || desc.includes('frontend')) {
      return '@ui-agent';
    } else if (title.includes('test') || title.includes('documentation')) {
      return '@qa-agent';
    }
    return '@orchestrator';
  };

  // Note: Since we're running this from a script, we can't directly call MCP tools
  // Instead, we'll output the tasks in a format that can be used by the Vibe Kanban
  console.log('📝 Tasks ready to be created in Vibe Kanban:\n');
  
  for (const task of tasks) {
    const owner = getOwner(task);
    console.log(`Task ${task.id}: ${task.title}`);
    console.log(`  Owner: ${owner}`);
    console.log(`  Priority: ${task.priority}`);
    console.log(`  Dependencies: ${task.dependencies.length > 0 ? task.dependencies.join(', ') : 'None'}`);
    console.log(`  Description: ${task.description}\n`);
  }

  console.log('\n💡 To create these tasks in Vibe Kanban:');
  console.log('   Use Claude Code with the Vibe Kanban MCP tools to create each task');
  console.log(`   Project ID: ${VIBE_PROJECT_ID}`);
}

main().catch(console.error);
