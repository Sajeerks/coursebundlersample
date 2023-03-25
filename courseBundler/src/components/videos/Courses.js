import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Toast,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { getAllCoursesAction } from '../../redux/actions/courseActions';
import { toast } from 'react-hot-toast';


const addToPlaylistHandler=(id)=>{
   console.log(`id lciked ===${id}`);
}
const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
    
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
        size={'sm'}
      />
      <Text noOfLines={'2'} children={description} />

      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'Creator'}
        />
        <Text
          fontFamily={'body'}
          textTransform={'uppercase'}
          children={creator}
        />
      </HStack>
      <Heading  textAlign={"center"} size="xs"  textTransform={"uppercase"} children={`lectures --${lectureCount}`} />
      <Heading  textAlign={"center"} size="xs"  textTransform={"uppercase"} children={`views --${views}`} />
   
      <Stack direction={["column","row"]} alignItems={"center"}>
        <Link to={`/course/${id}`}>
            <Button colorScheme={"yellow"}> Watch Now</Button>
        </Link>
         <Button
         variant={"ghost"}
         colorScheme={"yellow"}
         onClick={()=>addToPlaylistHandler(id)}
         >
        Add to Playlist
         </Button>
      </Stack>
    </VStack>

  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    "kk dev",
    "wen dev",
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const dispatch = useDispatch()
  const {loading, courses, error} = useSelector(state=>state.course)

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }

 


  }, [ error, dispatch])
  
useEffect(() => {
  console.log({category});
  dispatch(getAllCoursesAction( category, keyword))
}, [category,keyword])



  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="ALL Course" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="search a course..."
        type="text"
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} minW={'60'}  onClick={() => setCategory(item)}   >
            <Text children={item} m={'8'} />
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >

        {
          courses.length>0 ? (courses.map((item, index)=>(

            <Course
            key={item._id}
            views={item.views}
            title={item.title}
            imageSrc={item.poster.url}
            id={item._id}
            addToPlaylistHandler={addToPlaylistHandler}
            creator={item.creator}
            description={item.description}
            lectureCount={item.lectureCount}
            loading={loading}
          />
          ))):(<Heading children=" No courses with the specificatin"/>)
        }
     


      </Stack>
    </Container>
  );
};

export default Courses;
