import { Flex, Box, Text, Spacer, Avatar, list } from "@chakra-ui/react";
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from "millify";
import { baseUrl, fetchApi } from "../../utils/fetchApi";

import ImageScrollBar from "../../components/ImageScrollBar";

const PropertyDetails = ({ propertydetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, photos } }) => {

    return <Box maxWidth='1000px' margin='auto' p='4'>

        {photos && <ImageScrollBar data={photos} />}
        <Box w='full' p='6'>
            <Flex paddingTop='2' alignItems="center" justifyContent='space-between'>
                <Flex alignItems="center">
                    <Box paddingRight='3' color='gray.500'  >{isVerified && <GoVerified />} </Box>
                    <Text fontWeight='bold' fontSize='lg'> USD {millify(price)}{rentFrequency && `/${rentFrequency}`} </Text>
                </Flex>
                <Box>
                    <Avatar size='sm' src={agency?.logo?.url} />
                </Box>

            </Flex>
            <Flex alignItems="center" p='1' justifyContent="space-between" w='250px ' color='blue.400' >
                {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
            </Flex>
            <Box marginTop='2'>
                <Text fontSize='lg' marginBottom='2' fontWeight='bold'>
                    {title}
                </Text>
                <Text lineHeight='2' color='green.600' >
                    {description}
                </Text>

            </Box>
            <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
                <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='green.100' p='3' >
                    <Text>Type</Text>
                    <Text fontWeight='bold' >{type}</Text>

                </Flex>
                <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='green.100' p='3' >
                    <Text>Purpose</Text>
                    <Text fontWeight='bold' >{purpose}</Text>

                </Flex>
            </Flex>
        </Box>


    </Box>
}

export default PropertyDetails

export const getServerSideProps = async ({ params: { id } }) => {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)
    return {
        props: {
            propertydetails: data
        }
    }
}