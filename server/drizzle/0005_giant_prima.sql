ALTER TABLE "public"."modules" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."type";--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('text', 'image', 'to-do', 'paragraph', 'drawing');--> statement-breakpoint
ALTER TABLE "public"."modules" ALTER COLUMN "type" SET DATA TYPE "public"."type" USING "type"::"public"."type";