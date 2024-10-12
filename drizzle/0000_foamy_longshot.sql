DO $$ BEGIN
 CREATE TYPE "public"."taskType" AS ENUM('boolean', 'number');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nudge_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "nudge_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nudge_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"task_id" integer NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"value_boolean" boolean,
	"value_number" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nudge_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nudge_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nudge_task" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" varchar(256) NOT NULL,
	"taskType" "taskType" DEFAULT 'boolean' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nudge_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nudge_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "nudge_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nudge_account" ADD CONSTRAINT "nudge_account_user_id_nudge_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nudge_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nudge_log" ADD CONSTRAINT "nudge_log_task_id_nudge_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."nudge_task"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nudge_log" ADD CONSTRAINT "nudge_log_user_id_nudge_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nudge_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nudge_post" ADD CONSTRAINT "nudge_post_created_by_nudge_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."nudge_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nudge_session" ADD CONSTRAINT "nudge_session_user_id_nudge_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nudge_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nudge_task" ADD CONSTRAINT "nudge_task_user_id_nudge_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nudge_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "nudge_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_by_idx" ON "nudge_post" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "nudge_post" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "nudge_session" USING btree ("user_id");