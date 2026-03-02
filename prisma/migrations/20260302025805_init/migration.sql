-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workflow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Canvas" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "nodes" JSONB NOT NULL DEFAULT '[]',
    "edges" JSONB NOT NULL DEFAULT '[]',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Canvas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Workflow_ownerId_idx" ON "Workflow"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Canvas_workflowId_key" ON "Canvas"("workflowId");

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Canvas" ADD CONSTRAINT "Canvas_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
