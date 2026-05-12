import { readFile } from 'node:fs/promises';
import { randomBytes, scryptSync } from 'node:crypto';
import path from 'node:path';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const workspaceSlug = 'excel-legacy-team';
const workspaceName = 'Excel Legacy Realty Team';
const recordsPath = path.join(process.cwd(), 'data', 'crm-records.json');

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const derived = scryptSync(password, salt, 64);
  return `${salt}:${derived.toString('hex')}`;
}

function normalizeWorkflowType(workflowType) {
  if (!workflowType) return null;
  return workflowType === 'offer-draft' ? 'OFFER_DRAFT' : 'LISTING_ENTRY';
}

async function readSeedRecords() {
  const raw = await readFile(recordsPath, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed.records) ? parsed.records : [];
}

async function main() {
  const workspace = await prisma.workspace.upsert({
    where: { slug: workspaceSlug },
    update: { name: workspaceName },
    create: {
      id: workspaceSlug,
      slug: workspaceSlug,
      name: workspaceName,
    },
  });

  const seedEmail = process.env.SEED_ADMIN_EMAIL ?? process.env.AUTH_DEMO_EMAIL;
  const seedUsername = process.env.SEED_ADMIN_USERNAME ?? process.env.AUTH_DEMO_USERNAME;
  const seedPassword = process.env.SEED_ADMIN_PASSWORD ?? process.env.AUTH_DEMO_PASSWORD;
  const seedName = process.env.SEED_ADMIN_NAME ?? 'Excel Legacy Admin';

  let adminUser = null;

  if (seedEmail && seedUsername && seedPassword) {
    adminUser = await prisma.user.upsert({
      where: { email: seedEmail },
      update: {
        name: seedName,
        username: seedUsername,
        passwordHash: hashPassword(seedPassword),
        role: 'BROKER_TEAM_LEAD',
      },
      create: {
        name: seedName,
        email: seedEmail,
        username: seedUsername,
        passwordHash: hashPassword(seedPassword),
        role: 'BROKER_TEAM_LEAD',
      },
    });

    await prisma.workspaceMember.upsert({
      where: {
        workspaceId_userId: {
          workspaceId: workspace.id,
          userId: adminUser.id,
        },
      },
      update: { role: 'BROKER_TEAM_LEAD' },
      create: {
        workspaceId: workspace.id,
        userId: adminUser.id,
        role: 'BROKER_TEAM_LEAD',
      },
    });
  }

  const records = await readSeedRecords();

  for (const record of records) {
    await prisma.crmRecord.upsert({
      where: { id: record.id },
      update: {
        workspaceId: workspace.id,
        recordType: record.recordType,
        workflowType: normalizeWorkflowType(record.workflowType),
        displayName: record.displayName,
        subtitle: record.subtitle,
        primaryAddress: record.primaryAddress,
        status: record.status,
        sourceSystem: record.sourceSystem,
        sourceRecordId: record.sourceRecordId,
        ownerId: adminUser?.id ?? null,
        assignedUserId: adminUser?.id ?? null,
        payload: record.payload ?? {},
        updatedAt: new Date(record.updatedAt),
      },
      create: {
        id: record.id,
        workspaceId: workspace.id,
        recordType: record.recordType,
        workflowType: normalizeWorkflowType(record.workflowType),
        displayName: record.displayName,
        subtitle: record.subtitle,
        primaryAddress: record.primaryAddress,
        status: record.status,
        sourceSystem: record.sourceSystem,
        sourceRecordId: record.sourceRecordId,
        ownerId: adminUser?.id ?? null,
        assignedUserId: adminUser?.id ?? null,
        payload: record.payload ?? {},
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
      },
    });
  }

  console.log(`Seeded ${records.length} CRM records for workspace ${workspace.slug}.`);
  if (adminUser) {
    console.log(`Seeded admin user ${adminUser.email}.`);
  } else {
    console.log('No admin user seeded because SEED_ADMIN_* or AUTH_DEMO_* credentials were not provided.');
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
