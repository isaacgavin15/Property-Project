'use client';

import { useState, useEffect } from 'react';
import { fetchPromotions } from '@/utils/actions';
import EmptyList from './EmptyList';
import type { ExclusiveCardProps } from '@/utils/types';
import ExclusiveCardList from './ExclusiveCardList';
import ExclusiveList from './ExclusiveList';

function ExclusiveContainer({
    exclusive,
    search,
}: {
    exclusive?: string;
    search?: string;
}) {
    const [promotions, setPromotions] = useState<ExclusiveCardProps[]>([]);
    const [filteredPromotions, setFilteredPromotions] = useState<ExclusiveCardProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let data: ExclusiveCardProps[] = await fetchPromotions();

            if (search) {
                data = data.filter((promotion) =>
                    promotion.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            data = data.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            setPromotions(data);
            setFilteredPromotions(data); 
        };

        fetchData();
    }, [search]);

    useEffect(() => {
        if (exclusive) {
            setFilteredPromotions(
                promotions.filter((promotion) => promotion.category === exclusive)
            );
        } else {
            setFilteredPromotions(promotions); 
        }
    }, [exclusive, promotions]);

    if (filteredPromotions.length === 0) {
        return (
            <EmptyList
                heading="No results."
                message="Try finding different exclusive highlight or removing some of your filters."
                btnText="Clear Filters"
            />
        );
    }

    const displayedPromotions = filteredPromotions.slice(0, 4);

    return (
        <div>
            <ExclusiveCardList exclusives={displayedPromotions} />

            {/* View More Button - Always shown */}
            <div className="flex justify-end mt-4 px-4">
                <a
                    href="/promotions/more"
                    className="flex items-center text-orange-600 border border-orange-500 py-2 px-6 gap-2 rounded inline-flex hover:bg-orange-100 transition"
                >
                    <span>View More</span>
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default ExclusiveContainer;