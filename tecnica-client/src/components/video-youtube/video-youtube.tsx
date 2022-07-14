import YouTube, { YouTubeProps } from "react-youtube";

interface Props{
    videoId:string
}

const VideoYoutube = ({ videoId }:Props) =>{
    
      const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '540',
        playerVars: {
          autoplay: 1,
          origin: 'http://localhost:3000' 
        },
      };

    return (
        <>
            <YouTube style={{borderRadius:"10px"}} videoId={videoId} opts={opts} />
        </>
    )

}

export default VideoYoutube;