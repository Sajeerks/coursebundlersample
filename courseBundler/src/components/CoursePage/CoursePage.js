import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import introVideo from '../../assets/videos/intro.mp4';





const lectures = [
    {
    _id:"sasdadadsasd 222 2",
    title:"sample 1 ",
    description :"sampel descripton sasda",
    video:{
    url:"this is ample url"
    },
    },
    {
        _id:"sasdadadsasd",
        title:"sample 2",
        description :"sampel descripton sasda 222 ",
        video:{
        url:"this is ample url2 22 "
        },
    }

]


const CoursePage = () => {

  const [lectureNumber, setLectureNumber] = useState(0);

  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
        <Box>
        <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={introVideo}
            ></video>

     <Heading
              m="4"
              children={`#${lectureNumber+1} ${lectures[lectureNumber]._id}`}
            />

            <Heading m="4" children="Description" />
            <Text  m="4" children={lectures[lectureNumber].description} />
        </Box>
         <VStack>
               {
                lectures.map((element, index)=>{
                    return (
                        <button key ={element._id}
                        onClick={() => setLectureNumber(index)}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            textAlign: 'center',
                            margin: 0,
                            borderBottom: '1px solid rgba(0,0,0,0.2)',
                          }}
                        
                        >
                     <Text noOfLines={1} >
                            #{index+1} --{element.title}
                        </Text>
                        </button>
                       
                    )
                })
               }
         </VStack>
    </Grid>
  )
}

export default CoursePage