// seed.js
const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

// Number of workflows to generate per user
const WORKFLOWS_PER_USER = 5;
const USER_COUNT = 3;

// Possible workflow statuses
const STATUSES = ["active", "draft", "archived", "paused"];

// Generate realistic workflow definitions
function generateWorkflowDefinition() {
  const steps = [];
  const stepCount = faker.number.int({ min: 3, max: 8 });

  for (let i = 0; i < stepCount; i++) {
    steps.push(
      faker.helpers.arrayElement([
        "approval",
        "review",
        "notification",
        "data_collection",
        "signature",
        "payment",
        "confirmation",
      ])
    );
  }

  return JSON.stringify({
    version: "1.0",
    steps: steps,
    timeout: faker.number.int({ min: 1, max: 30 }) + " days",
    requires_approval: faker.datatype.boolean(),
    notifications: {
      email: faker.datatype.boolean(),
      slack: faker.datatype.boolean(),
    },
    created_at: faker.date.recent().toISOString(),
  });
}

async function main() {
  console.log("Starting seed with fake data generation...");

  // Clear existing data
  await prisma.workflow.deleteMany();
  console.log("Cleared existing workflows");

  // Generate workflows for multiple users
  for (let userId = 1; userId <= USER_COUNT; userId++) {
    const userPrefix = `user_${userId}`;

    for (let i = 0; i < WORKFLOWS_PER_USER; i++) {
      const workflowName = `${faker.company.buzzVerb()} ${faker.company.buzzNoun()} Workflow`;

      await prisma.workflow.create({
        data: {
          id: `wf_${userPrefix}_${faker.string.alphanumeric(8)}`,
          userId: userPrefix,
          name: workflowName,
          description: faker.lorem.paragraph(),
          definition: generateWorkflowDefinition(),
          status: faker.helpers.arrayElement(STATUSES),
          createAt: faker.date.past(),
          updateAt: faker.date.recent(),
        },
      });

      console.log(`Created workflow "${workflowName}" for user ${userPrefix}`);
    }
  }

  console.log(
    `Successfully seeded ${USER_COUNT * WORKFLOWS_PER_USER} workflows!`
  );
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
