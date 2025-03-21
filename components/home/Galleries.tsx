'use client';
import { useState, useEffect } from 'react';
import { fetchGalleries } from '@/utils/actions';

// Define the type for the gallery items
interface GalleryItem {
    id: string;
    createdAt: string; // Ensure createdAt is a string
    title: string;
    media: string;
}

const Galleries = () => {
    const [galleries, setGalleries] = useState<GalleryItem[]>([]);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data: { id: string; createdAt: Date; title: string; media: string; }[] = await fetchGalleries();

            // Convert 'createdAt' from Date to string before setting state
            const formattedData: GalleryItem[] = data.map((gallery) => ({
                ...gallery,
                createdAt: gallery.createdAt.toISOString(), // Convert Date to ISO string
            }));

            // Ensure 'createdAt' is properly converted to Date before sorting
            const sortedData = formattedData.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            setGalleries(sortedData);
        };

        fetchData();
    }, []);

    const closeModal = () => setSelectedImage(null);

    // Function to handle background click (close modal)
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="mt-5 mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
                {galleries.slice(0, 8).map((gallery) => (
                    <div key={gallery.id} className="group">
                        <img
                            src={gallery.media}
                            alt={gallery.title}
                            className="w-full h-52 object-cover rounded-md shadow-lg cursor-pointer transform group-hover:scale-110 transition-transform duration-500"
                            onClick={() => setSelectedImage(gallery)}
                        />
                    </div>
                ))}
            </div>
            {/* Modal for viewing image */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={handleBackgroundClick} // Handle background click
                >
                    {/* Close Button (X) - Positioned at top right of screen */}
                    <button
                        onClick={closeModal}
                        className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-orange-100 transition-all"
                        style={{ cursor: 'pointer' }}
                    >
                        ✕
                    </button>

                    {/* Image Container */}
                    <div className="relative">
                        {/* Display Image in Original Size */}
                        <div className="flex justify-center">
                            <img
                                src={selectedImage.media}
                                alt={selectedImage.title}
                                className="rounded-lg"
                                style={{
                                    maxWidth: '90%',
                                    maxHeight: '90%',
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* View More button */}
            <div className="flex justify-end mt-4 px-4">
                <a
                    href="/gallery/more"
                    className="flex items-center border py-2 px-6 gap-2 rounded inline-flex hover:bg-opacity-10 transition"
                    style={{
                        color: 'rgba(194, 171, 125, 1)', // Text and icon color
                        borderColor: 'rgba(194, 171, 125, 1)', // Border color
                        backgroundColor: 'transparent',
                    }}
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
};

export default Galleries;