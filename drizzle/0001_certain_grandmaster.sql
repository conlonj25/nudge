ALTER TABLE "nudge_task" RENAME TO "nudge_habit";--> statement-breakpoint
ALTER TABLE "nudge_log" RENAME COLUMN "task_id" TO "habit_id";--> statement-breakpoint
ALTER TABLE "nudge_habit" RENAME COLUMN "taskType" TO "habitType";--> statement-breakpoint
ALTER TABLE "nudge_log" DROP CONSTRAINT "nudge_log_task_id_nudge_task_id_fk";
--> statement-breakpoint
ALTER TABLE "nudge_habit" DROP CONSTRAINT "nudge_task_user_id_nudge_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nudge_log" ADD CONSTRAINT "nudge_log_habit_id_nudge_habit_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."nudge_habit"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nudge_habit" ADD CONSTRAINT "nudge_habit_user_id_nudge_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nudge_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
