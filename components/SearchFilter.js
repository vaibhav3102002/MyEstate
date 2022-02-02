import { useEffect, useState } from "react";
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

import { filterData, getFilterValues } from '../utils/fillterData'




const SearchFilter = () => {
    const [filter, setFilter] = useState(filterData)

    const router=useRouter()


const searchFilter = (filterValue) => {
   
    const path=router.pathname
   
    const {query}=router
   

    const values=getFilterValues(filterValue)
  
    values.forEach((item)=>{
        if(item.value && filterValue?.[item.name])
      return  query[item.name]=item.value
    })
   
    router.push({pathname:path,query})
}





    return <>
        <Flex justifyContent='center' bg='gray.100' flexWrap='wrap'>
            {filter.map((filterItem) => {
                return (
                    <Box key={filterItem.queryName}>
                        <Select placeholder={filterItem.placeholder} w='fit-content' p='2' onChange={(e) => searchFilter({ [filterItem.queryName]: e.target.value })} >

                            {filterItem?.items?.map((optionItem) => {
                                return <option value={optionItem.value} key={optionItem.value}>{optionItem.name}</option>
                            })}

                        </Select>

                    </Box>
                )
            })}

        </Flex>

    </>
}

export default SearchFilter