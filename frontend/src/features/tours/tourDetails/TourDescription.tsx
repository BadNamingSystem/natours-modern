import GradientLabel from "../../../components/GradientLabel.tsx"
import IconLabelContent from "../../../components/IconLabelContent.tsx"
import { Calendar, Star, TrendingUp, User } from "lucide-react"
import type { Guide } from "../../../types/types.ts"
import Avatar from "../../../components/Avatar.tsx"
import { SERVER_URL } from "../../../config.ts"

type Props = {
    name: string
    tourDescription: string | null
    startDate: string
    difficulty: string
    ratingsAverage: number
    ratingsQuantity: number
    maxGroupSize: number
    guides: Guide[]
}

function TourDescription({
    name,
    tourDescription,
    startDate,
    difficulty,
    maxGroupSize,
    ratingsAverage,
    ratingsQuantity,
    guides,
}: Props) {
    return (
        <section className="mt-[-9vw] flex font-light text-neutral-500 max-md:block">
            {/* LEFT SIDE (QUICK FACTS) */}
            <div className="flex flex-[0_0_50%] flex-col items-center bg-gray-100 px-[8vw] pt-[14vw] pb-[4vw] max-md:px-6 max-md:pt-12 max-md:pb-10">
                <div className="mt-6 mb-28 max-md:mt-10 max-md:mb-12">
                    <GradientLabel>Quick Facts</GradientLabel>
                    <IconLabelContent icon={<Calendar color="#39B24C" />} content={startDate}>
                        Next Date
                    </IconLabelContent>
                    <IconLabelContent icon={<TrendingUp color="#39B24C" />} content={difficulty}>
                        Difficulty
                    </IconLabelContent>
                    <IconLabelContent icon={<User color="#39B24C" />} content={`${maxGroupSize} People`}>
                        Participants
                    </IconLabelContent>
                    <IconLabelContent icon={<Star color="#39B24C" />} content={`${ratingsAverage}/${ratingsQuantity}`}>
                        Rating
                    </IconLabelContent>
                </div>
                <div>
                    <GradientLabel>Your Tour Guides</GradientLabel>
                    {guides.map((guide, i) => (
                        <IconLabelContent
                            key={guide.id || i}
                            icon={
                                <Avatar src={`${SERVER_URL}img/users/${guide.photo}`} alt={`avatar of ${guide.name}`} />
                            }
                            content={guide.name}
                        >
                            {guide.role}
                        </IconLabelContent>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE (DESCRIPTION) */}
            <div className="flex-[0_0_50%] bg-gray-50 px-[8vw] pt-[14vw] pb-[4vw] max-md:px-6 max-md:pt-10 max-md:pb-10">
                <GradientLabel>About {name} Tour</GradientLabel>
                <div className="max-md:mt-6 max-md:space-y-5">
                    {tourDescription?.split("\n").map((para, i) => (
                        <p key={i} className="mb-8 text-[1.7rem] max-md:mb-0 max-md:text-[1.5rem]">
                            {para}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TourDescription
