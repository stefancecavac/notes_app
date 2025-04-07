ALTER TABLE "notes" ADD COLUMN "note_icon" varchar(255) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "note_color" varchar(255) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "isFavourite" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "isThrashed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "userId" uuid;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;