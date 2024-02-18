create table "public"."landlord_private_profiles" (
    "user_id" uuid not null,
    "phone_number" varchar(20) not null,
    "postcode" varchar(7) not null,
    "country" varchar(20) not null,
    "county" varchar(20), 
    "city" varchar(20),
    "street" varchar(20),
    "house" varchar(20) not null
);


alter table "public"."landlord_private_profiles" enable row level security;

create table "public"."landlord_public_profiles" (
    "user_id" uuid not null,
    "website" varchar(50), 
    "join_date" date not null,
    "bio" varchar(200), 
    "profile_image_id" uuid,
    "rating" float not null, 
    "verified" bool not null,
    "type" char not null
);


alter table "public"."landlord_public_profiles" enable row level security;

create table "public"."properties" (
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."properties" enable row level security;

create table "public"."property_ownership" (
    "property_id" uuid not null,
    "started_at" date not null,
    "landlord_id" uuid,
    "ended_at" date
);


alter table "public"."property_ownership" enable row level security;

create table "public"."review_photos" (
    "review_id" uuid not null,
    "photo_id" bigint not null
);


alter table "public"."review_photos" enable row level security;

create table "public"."reviewer_private_profiles" (
    "user_id" uuid not null,
    "property_id" uuid not null,
    "reviewer_id" uuid not null default gen_random_uuid()
);


alter table "public"."reviewer_private_profiles" enable row level security;

create table "public"."reviewer_public_profiles" (
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."reviewer_public_profiles" enable row level security;

create table "public"."reviews" (
    "property_id" uuid not null,
    "reviewer_id" uuid not null,
    "review_date" date not null,
    "review_id" uuid not null default gen_random_uuid()
);


alter table "public"."reviews" enable row level security;

create table "public"."uploaded_files" (
    "id" bigint generated by default as identity not null,
    "file_name" text
);


alter table "public"."uploaded_files" enable row level security;

create table "public"."user_profiles" (
    "user_id" uuid not null,
    "first_name" text,
    "last_name" text,
    "email" text,
    "created_at" date default now()
);


alter table "public"."user_profiles" enable row level security;

CREATE UNIQUE INDEX landlord_private_profiles_pkey ON public.landlord_private_profiles USING btree (user_id);

CREATE UNIQUE INDEX landlord_public_profiles_pkey ON public.landlord_public_profiles USING btree (user_id);

CREATE UNIQUE INDEX properties_pkey ON public.properties USING btree (id);

CREATE UNIQUE INDEX property_ownership_pkey ON public.property_ownership USING btree (property_id, started_at);

CREATE UNIQUE INDEX review_photos_pkey ON public.review_photos USING btree (review_id, photo_id);

CREATE UNIQUE INDEX reviewer_ids_pkey ON public.reviewer_private_profiles USING btree (user_id, property_id);

CREATE UNIQUE INDEX reviewer_ids_reviewer_id_key ON public.reviewer_private_profiles USING btree (reviewer_id);

CREATE UNIQUE INDEX reviewer_private_profiles_user_id_property_id_key ON public.reviewer_private_profiles USING btree (user_id, property_id);

CREATE UNIQUE INDEX reviewer_public_profiles_pkey ON public.reviewer_public_profiles USING btree (user_id);

CREATE UNIQUE INDEX reviews_pkey ON public.reviews USING btree (review_id);

CREATE UNIQUE INDEX reviews_property_id_reviewer_id_key ON public.reviews USING btree (property_id, reviewer_id);

CREATE UNIQUE INDEX uploaded_files_pkey ON public.uploaded_files USING btree (id);

CREATE UNIQUE INDEX user_public_profiles_pkey ON public.user_profiles USING btree (user_id);

alter table "public"."landlord_private_profiles" add constraint "landlord_private_profiles_pkey" PRIMARY KEY using index "landlord_private_profiles_pkey";

alter table "public"."landlord_public_profiles" add constraint "landlord_public_profiles_pkey" PRIMARY KEY using index "landlord_public_profiles_pkey";

alter table "public"."properties" add constraint "properties_pkey" PRIMARY KEY using index "properties_pkey";

alter table "public"."property_ownership" add constraint "property_ownership_pkey" PRIMARY KEY using index "property_ownership_pkey";

alter table "public"."review_photos" add constraint "review_photos_pkey" PRIMARY KEY using index "review_photos_pkey";

alter table "public"."reviewer_private_profiles" add constraint "reviewer_ids_pkey" PRIMARY KEY using index "reviewer_ids_pkey";

alter table "public"."reviewer_public_profiles" add constraint "reviewer_public_profiles_pkey" PRIMARY KEY using index "reviewer_public_profiles_pkey";

alter table "public"."reviews" add constraint "reviews_pkey" PRIMARY KEY using index "reviews_pkey";

alter table "public"."uploaded_files" add constraint "uploaded_files_pkey" PRIMARY KEY using index "uploaded_files_pkey";

alter table "public"."user_profiles" add constraint "user_public_profiles_pkey" PRIMARY KEY using index "user_public_profiles_pkey";

alter table "public"."landlord_private_profiles" add constraint "landlord_private_profiles_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(user_id) not valid;
alter table "public"."landlord_private_profiles" validate constraint "landlord_private_profiles_id_fkey";

alter table "public"."landlord_public_profiles" add constraint "landlord_public_profiles_id_fkey" FOREIGN KEY (user_id) REFERENCES landlord_private_profiles(user_id) not valid;
alter table "public"."landlord_public_profiles" validate constraint "landlord_public_profiles_id_fkey";

alter table "public"."property_ownership" add constraint "property_ownership_landlord_id_fkey" FOREIGN KEY (landlord_id) REFERENCES landlord_public_profiles(id) not valid;
alter table "public"."property_ownership" validate constraint "property_ownership_landlord_id_fkey";
alter table "public"."property_ownership" add constraint "property_ownership_property_id_fkey" FOREIGN KEY (property_id) REFERENCES properties(id) not valid;
alter table "public"."property_ownership" validate constraint "property_ownership_property_id_fkey";

alter table "public"."review_photos" add constraint "review_photos_photo_id_fkey" FOREIGN KEY (photo_id) REFERENCES uploaded_files(id) not valid;
alter table "public"."review_photos" validate constraint "review_photos_photo_id_fkey";
alter table "public"."review_photos" add constraint "review_photos_review_id_fkey" FOREIGN KEY (review_id) REFERENCES reviews(review_id) not valid;
alter table "public"."review_photos" validate constraint "review_photos_review_id_fkey";

alter table "public"."reviewer_private_profiles" add constraint "reviewer_ids_reviewer_id_key" UNIQUE using index "reviewer_ids_reviewer_id_key";
alter table "public"."reviewer_private_profiles" add constraint "reviewer_private_profiles_property_id_fkey" FOREIGN KEY (property_id) REFERENCES properties(id) not valid;
alter table "public"."reviewer_private_profiles" validate constraint "reviewer_private_profiles_property_id_fkey";
alter table "public"."reviewer_private_profiles" add constraint "reviewer_private_profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(user_id) not valid;
alter table "public"."reviewer_private_profiles" validate constraint "reviewer_private_profiles_user_id_fkey";
alter table "public"."reviewer_private_profiles" add constraint "reviewer_private_profiles_user_id_property_id_key" UNIQUE using index "reviewer_private_profiles_user_id_property_id_key";

alter table "public"."reviewer_public_profiles" add constraint "reviewer_public_profiles_id_fkey" FOREIGN KEY (user_id) REFERENCES reviewer_private_profiles(reviewer_id) not valid;
alter table "public"."reviewer_public_profiles" validate constraint "reviewer_public_profiles_id_fkey";

alter table "public"."reviews" add constraint "reviews_property_id_fkey" FOREIGN KEY (property_id) REFERENCES properties(id) not valid;
alter table "public"."reviews" validate constraint "reviews_property_id_fkey";
alter table "public"."reviews" add constraint "reviews_property_id_reviewer_id_key" UNIQUE using index "reviews_property_id_reviewer_id_key";
alter table "public"."reviews" add constraint "reviews_reviewer_id_fkey" FOREIGN KEY (reviewer_id) REFERENCES reviewer_public_profiles(id) not valid;
alter table "public"."reviews" validate constraint "reviews_reviewer_id_fkey";

alter table "public"."user_profiles" add constraint "user_profiles_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(user_id) not valid;
alter table "public"."user_profiles" validate constraint "user_profiles_id_fkey";
alter table "public"."user_profiles" add constraint "user_public_profiles_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(user_id) not valid;
alter table "public"."user_profiles" validate constraint "user_public_profiles_id_fkey";


