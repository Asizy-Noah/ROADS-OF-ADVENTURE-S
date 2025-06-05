import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
  Min,
} from "class-validator";
import { TourStatus } from "../schemas/tour.schema"; // Assuming this path is correct

// DTO for a single Itinerary item
export class ItineraryItemDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number) // Ensure 'day' is transformed to a number
  day: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString() // Quill content is HTML string
  description: string;

  @IsOptional()
  @IsString()
  accommodation?: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['Lunch & Dinner', 'Breakfast, Lunch & Dinner', 'Breakfast & Lunch', 'Breakfast Only', '']) // Add '' for "Select Meal Plan" option if it's sent empty
  mealPlan: string; // Renamed from 'meals' to 'mealPlan' to match HTML

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  activities?: string[];

  @IsOptional()
  @IsString()
  coverImage?: string;
}

// Your HTML form doesn't seem to have "InclusionItemDto" fields directly from the provided snippet.
// If these are not sent from the form, consider removing this DTO
// or marking all its properties as @IsOptional() if they are handled differently.
class InclusionItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isIncluded?: boolean;
}

export class CreateTourDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  // IMPORTANT: Keep 'slug' only if it's sent from the frontend.
  // If your frontend generates/sends the slug, add an input field named "slug".
  // If your backend generates it, remove it from the DTO.
  // Assuming it's NOT sent from the frontend to avoid "property slug should not exist" unless explicitly added.
  // @IsNotEmpty()
  // @IsString()
  // slug: string;

  @IsNotEmpty()
  @IsString()
  overview: string; // Matches HTML 'overview'

  @IsOptional()
  @IsString()
  summary?: string; // Not in HTML form. Mark optional or remove.

  @IsOptional()
  @IsString()
  highlights?: string; // From HTML textarea

  @IsOptional()
  @IsString()
  coverImage?: string; // This will store the path after multer processes the file.

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  days: number; // Matches HTML 'days'

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  discountPrice?: number; // Not in HTML form. Mark optional or remove.

  @IsOptional()
  @IsNumber()
  groupSize?: number; // Not in HTML form. Mark optional or remove.

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImages?: string[];

  @IsOptional()
  @IsEnum(TourStatus)
  status?: TourStatus; // Not in HTML form. Mark optional or remove.

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean; // Not in HTML form. Mark optional or remove.

  @IsNotEmpty()
  @IsString()
  country: string; // Matches HTML 'country'

  @IsNotEmpty()
  @IsString()
  category: string; // Matches HTML 'category'

  @IsOptional()
  @IsString()
  priceIncludes?: string;

  @IsOptional()
  @IsString()
  priceExcludes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItineraryItemDto)
  itineraries: ItineraryItemDto[]; // Matches HTML 'itineraries'

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InclusionItemDto)
  inclusions?: InclusionItemDto[];

  // SEO fields
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @IsOptional()
  @IsString()
  seoDescription?: string;

  @IsOptional()
  @IsString()
  seoKeywords?: string;

  @IsOptional()
  @IsUrl()
  seoCanonicalUrl?: string;

  @IsOptional()
  @IsUrl()
  seoOgImage?: string;
}