CREATE TYPE "public"."issue_priority" AS ENUM('lowest', 'low', 'medium', 'high', 'highest');--> statement-breakpoint
CREATE TYPE "public"."issue_status" AS ENUM('backlog', 'todo', 'in_progress', 'in_review', 'done');--> statement-breakpoint
CREATE TYPE "public"."issue_type" AS ENUM('task', 'bug', 'story', 'epic');--> statement-breakpoint
CREATE TABLE "issues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"issue_number" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"type" "issue_type" DEFAULT 'task' NOT NULL,
	"status" "issue_status" DEFAULT 'todo' NOT NULL,
	"priority" "issue_priority" DEFAULT 'medium' NOT NULL,
	"reporter_id" uuid NOT NULL,
	"assignee_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "issues_project_id_issue_number_unique" UNIQUE("project_id","issue_number")
);
--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_reporter_id_users_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_assignee_id_users_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;