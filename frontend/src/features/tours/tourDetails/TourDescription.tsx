import GradientLabel from "../../../components/GradientLabel.tsx"
import IconLabelContent from "../../../components/IconLabelContent.tsx"
import { Calendar, Star, TrendingUp, User } from "lucide-react"
import type { Guide } from "../../../types/types.ts"
import Avatar from "../../../components/Avatar.tsx"

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
        <section className="mt-[-9vw] flex font-light text-neutral-500">
            {/* LEFT SIDE (QUICK FACTS) */}
            <div className="flex flex-[0_0_50%] flex-col items-center bg-gray-50 px-[8vw] pt-[14vw] pb-[4vw]">
                <div className="mb-28">
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
                    {guides.map(guide => (
                        <IconLabelContent
                            key={guide.id}
                            icon={<Avatar src={`/users/${guide.photo}`} alt={`avatar of ${guide.name}`} />}
                            content={guide.name}
                        >
                            {guide.role}
                        </IconLabelContent>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE (DESCRIPTION) */}
            <div className="flex-[0_0_50%] bg-white px-[8vw] pt-[14vw] pb-[4vw]">
                <GradientLabel>About {name} Tour</GradientLabel>
                {tourDescription?.split("\n").map((para, i) => (
                    <p key={i} className="mb-8 text-[1.7rem]">
                        {para}
                    </p>
                ))}
            </div>
        </section>
    )
}

export default TourDescription
