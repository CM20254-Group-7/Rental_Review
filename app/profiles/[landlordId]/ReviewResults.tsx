import { ReviewDetailsLayout } from '@/components/ReviewDetails';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import React, { cache } from 'react';

const getReviews = cache(async (landlordId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: reviews } = await supabase
    .rpc('reviews_for_landlord', { id: landlordId })
    .select('*, review_tags(*)');

  return reviews?.map((review) => ({
    ...review,
    review_date: new Date(review.review_date),
    reviewer_tags: review.review_tags.map((reviewTag) => reviewTag.tag),
  })) || [];
});

const ReviewResults: React.FC<{
  landlordId: string;
}> = async ({ landlordId }) => {
  const reviews = await getReviews(landlordId);

  if (reviews.length === 0) return <p>No reviews found</p>;

  return reviews.map((review) => (
    <ReviewDetailsLayout
      key={review.review_id}
      reviewId={review.review_id}
      reviewDate={review.review_date}
      reviewMessage={review.review_body}
      reviewerId={review.reviewer_id}
      landlordRating={review.landlord_rating}
      propertyRating={review.property_rating}
      reviewTags={review.reviewer_tags}
    />
  ));
};

export default ReviewResults;

export const ReviewResultsLoading: React.FC = () => (
  <p>Loading...</p>
);
