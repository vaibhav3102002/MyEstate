import Link from "next/link"
import Image from "next/image"
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchApi";

import Property from "../components/Property";


const Banner = ({ imgUrl, purpose, title1, title2, desc1, desc2, LinkName, buttonText }) => {
  
  return <>
  

    <Flex flexWrap="wrap" justifyContent="center" alignItems='center' m='10'>
      <Image src={imgUrl} width={500} height={300} alt="Banner" />
      <Box p="5">
        <Text color="gray.500" fontSize='sm' fontWeight='medium' >{purpose}</Text>
        <Text fontSize='3xl' fontWeight='bold' >{title1}<br />{title2} </Text>
        <Text fontSize='sm' fontWeight='medium' color='gray.700' paddingTop="3" paddingBottom="3" >{desc1}<br />{desc2} </Text>
        <Button fontSize='xl' bg="blue.300" color="white">
          <Link href={LinkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  </>
}


const index = ({ propertyForRent, propertyForSale }) => {

  return <>
    <Box>
      <Banner purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1=' Explore from Apartments, builder floors, villas'
        desc2='and more'
        buttonText='Explore Renting'
        LinkName='/search?purpose=for-rent'
        imgUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4' />
      <Flex flexWrap="wrap" >
        {propertyForRent.map((property) => <Property property={property} key={property.id} />)}

      </Flex>

      <Banner purpose='BUY A HOME'
        title1='Buy Homes for'
        title2='Everyone'
        desc1=' Explore from Apartments, builder floors, villas'
        desc2='and more'
        buttonText='Explore Buying'
        LinkName='/search?purpose=for-sale'
        imgUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008' />

      <Flex flexWrap="wrap" >
        {propertyForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  </>
}
export const getStaticProps = async () => {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

 
  return {
    props: {
      propertyForRent: propertyForRent?.hits,
      propertyForSale: propertyForSale?.hits
    }
  }

}

export default index

