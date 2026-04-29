import type { Review as ReviewType } from "../../types/types.ts"
import DeleteButton from "../../components/DeleteButton.tsx"
import Modal from "../../components/Modal.tsx"
import ConfirmDelete from "../../components/ConfirmDelete.tsx"
import { useDeleteReview } from "./useDeleteReview.ts"

function Review({ review }: { review: ReviewType }) {
    const { review: currentReview, rating, id: reviewId } = review
    const tourName = review.tour?.name
    const { deleteReview, isDeletingReview } = useDeleteReview()

    return (
        <article className="group relative rounded-lg border border-stone-200 bg-white p-12 shadow-md">
            <div className="mb-3 flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-semibold text-stone-700">{tourName}</h3>
                <span className="text-xl font-bold text-emerald-600">{rating}/5</span>
            </div>

            <p className="text-2xl leading-relaxed text-stone-600">{currentReview}</p>
            <div className="absolute right-4 bottom-4" onClick={e => e.stopPropagation()}>
                <Modal>
                    <Modal.Open opens="delete-review">
                        <DeleteButton disabled={isDeletingReview} ariaLabel="Delete review" />
                    </Modal.Open>
                    <Modal.Window name="delete-review" className="max-w-lg">
                        <ConfirmDelete
                            resourceName="review"
                            disabled={isDeletingReview}
                            onConfirm={() => deleteReview(reviewId)}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </article>
    )
}

export default Review
