'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const VerifiedPage = () => {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleEnded = () => {
            router.push('/live');
        };

        video.addEventListener('ended', handleEnded);

        // Fallback: redirect after 3s in case video doesn't fire 'ended'
        const fallback = setTimeout(() => {
            router.push('/live');
        }, 3500);

        return () => {
            video.removeEventListener('ended', handleEnded);
            clearTimeout(fallback);
        };
    }, [router]);

    return (
        <>
            <title>Apply for Blue Badge feature</title>
            <div
            style={{
                position: 'fixed',
                inset: 0,
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            <video
                ref={videoRef}
                src='/intro.mp4'
                autoPlay
                muted
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        </div>
        </>
    );
};

export default VerifiedPage;
