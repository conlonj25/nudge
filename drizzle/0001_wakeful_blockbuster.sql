ALTER TABLE "nudge_date" RENAME TO "nudge_log";--> statement-breakpoint
ALTER TABLE "nudge_item" RENAME TO "nudge_task";--> statement-breakpoint
ALTER TABLE "nudge_log" RENAME COLUMN "item_id" TO "task_id";--> statement-breakpoint
ALTER TABLE "nudge_task" RENAME COLUMN "itemType" TO "taskType";--> statement-breakpoint
ALTER TABLE "nudge_log" DROP CONSTRAINT "nudge_date_item_id_nudge_item_id_fk";
--> statement-breakpoint
ALTER TABLE "nudge_log" DROP CONSTRAINT "nudge_date_user_id_nudge_user_id_fk";
--> statement-breakpoint
ALTER TABLE "nudge_task" DROP CONSTRAINT "nudge_item_user_id_nudge_user_id_fk";
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
 ALTER TABLE "nudge_task" ADD CONSTRAINT "nudge_task_user_id_nudge_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nudge_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
