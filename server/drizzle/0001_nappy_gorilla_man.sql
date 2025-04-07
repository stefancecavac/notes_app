CREATE TYPE "public"."type" AS ENUM('text', 'image');--> statement-breakpoint
CREATE TABLE "blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "type" NOT NULL,
	"properties" jsonb NOT NULL,
	"noteId" uuid
);
--> statement-breakpoint
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_noteId_notes_id_fk" FOREIGN KEY ("noteId") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;