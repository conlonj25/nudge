ALTER TABLE "nudge_log" ALTER COLUMN "value_boolean" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nudge_user" ADD COLUMN "price_id" varchar(255);--> statement-breakpoint
ALTER TABLE "nudge_user" ADD COLUMN "has_access" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "nudge_habit" DROP COLUMN IF EXISTS "habitType";--> statement-breakpoint
ALTER TABLE "nudge_log" DROP COLUMN IF EXISTS "value_number";