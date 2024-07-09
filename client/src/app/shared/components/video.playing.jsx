import React, { useState }  from 'react';
import ReactPlayer from 'react-player';

const VideoPlaying = ({width, height, url, isPlaying, handleVideoProgress}) => {

    const [loading, setLoading] = useState(true);

    const handleReady = () => {
        setLoading(false);
    };

    const Styles = {
        width: width || 'w-100',
        height: height || 'h-100'
    }

    function Loading() {
        return <div style = {Styles}>🌀 Loading...</div>;
    }

    return (
        <div style={{ position: 'relative' }}>
            {loading && (
                <div style={{ ...Styles, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 1 }}>
                    <Loading />
                </div>
            )}
            <ReactPlayer 
                style={Styles}
                url={url}
                playing={isPlaying}
                controls
                onReady={handleReady}
                onProgress={(progress) => handleVideoProgress(progress)}
                config={{
                    youtube: {
                      playerVars: { showinfo: 1 }
                }}}
            />
        </div>
    )
}

export default VideoPlaying