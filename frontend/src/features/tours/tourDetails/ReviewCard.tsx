import { useUser } from "../../user/useUser.ts"
import type { Review } from "../../../types/types.ts"
import { SERVER_URL } from "../../../config.ts"
import { Pencil } from "lucide-react"
import DeleteButton from "../../../components/DeleteButton.tsx"
import Modal from "../../../components/Modal.tsx"
import ConfirmDelete from "../../../components/ConfirmDelete.tsx"
import { useDeleteReview } from "../../reviews/useDeleteReview.ts"
import CreateEditReview from "../../reviews/CreateEditReview.tsx"

function ReviewCard({ review }: { review: Review }) {
    const { id: currentUserId } = useUser()
    const { deleteReview, isDeletingReview } = useDeleteReview()
    const {
        id: reviewId,
        user: { name, photo },
        userId,
        review: currentReview,
        rating,
    } = review
    const canEdit = currentUserId === userId

    return (
        <li className="group relative flex w-120 shrink-0 snap-center flex-col items-center rounded-sm bg-stone-50 p-16 shadow-xl max-lg:w-80 max-lg:p-8">
            {canEdit && (
                <>
                    <div className="absolute top-2 left-2" onClick={e => e.stopPropagation()}>
                        <Modal>
                            <Modal.Open opens="update-review">
                                <button
                                    type="button"
                                    className="cursor-pointer rounded-full bg-stone-200 p-2 text-slate-900 shadow-md transition-colors hover:bg-stone-300 hover:text-emerald-600"
                                    aria-label="Edit review"
                                >
                                    <Pencil className="h-7 w-7 max-lg:h-6 max-lg:w-6" />
                                </button>
                            </Modal.Open>
                            <Modal.Window name="update-review">
                                <CreateEditReview
                                    mode="update"
                                    reviewId={reviewId}
                                    defaultValues={{ review: currentReview, rating }}
                                />
                            </Modal.Window>
                        </Modal>
                    </div>
                    <div className="absolute top-2 right-2" onClick={e => e.stopPropagation()}>
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
                </>
            )}
            <div className="mt-2 mb-8 flex items-center gap-6 max-lg:mb-6 max-lg:gap-4">
                <img
                    src={`${SERVER_URL}img/users/${photo}`}
                    alt={`Avatar of ${name}`}
                    className="h-16 w-16 rounded-full max-lg:h-14 max-lg:w-14"
                />
                <h6 className="text-2xl font-bold text-stone-600 uppercase max-lg:text-[1.3rem]">{name}</h6>
            </div>
            <p className="mb-8 text-center text-2xl font-light text-stone-600 italic max-lg:mb-6 max-lg:text-[1.4rem]">
                &ldquo;{currentReview}&rdquo;
            </p>
            <div className="mt-auto flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                    <svg
                        key={star}
                        className={`h-8 w-8 max-lg:h-6 max-lg:w-6 ${star <= rating ? "fill-green-500" : "fill-stone-400"}`}
                    >
                        <use xlinkHref={`/icons.svg#icon-star`} />
                    </svg>
                ))}
            </div>
        </li>
    )
}

export default ReviewCard
