ALTER TABLE "nudge_log" DROP CONSTRAINT "nudge_log_habit_id_nudge_habit_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nudge_log" ADD CONSTRAINT "nudge_log_habit_id_nudge_habit_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."nudge_habit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
