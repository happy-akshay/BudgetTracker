'use client'
import { accounts } from '@/lib/types'
import React, { FC, useCallback, useEffect, useState } from 'react'
import {useQuery} from "@tanstack/react-query"
import { Category } from '@prisma/client'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import CategoryRow from './CategoryRow'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import CreateCategoryDialog from './CreateCategoryDialog'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import axios from 'axios'
interface CategoryPickerProps{
    types:accounts
    onChange:(value:string)=>void
}


const CategoryPicker:FC<CategoryPickerProps> = ({types,onChange}) => {
    const [open,setOpen]=useState<boolean>(false)
    const [value,setValue]=useState<string>("")
    useEffect(()=>{
        if(!value) return;
        onChange(value)
    },[onChange,value])
    const categoriesQuery = useQuery({
        queryKey: ["categories", types],
        queryFn: async() => {
         const response = await fetch(`/api/Category?type=${types}`)
         if(!response.ok){
            throw new Error("error in api/category/types")
         }
         return response.json()
        },
      });
      

    const selectedCategory=categoriesQuery?.data?.find((category:Category)=>{
        category.name===value
    })
    const successCallback=useCallback((category:Category)=>{
        setValue(category.name)
        setOpen(prev=>!prev)
    },[setValue,setOpen])
   
  return (
<>
<Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button variant={"outline"} role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
            {selectedCategory? (<CategoryRow category={selectedCategory}/>):("Select category")}
            <ChevronsUpDown/>
        </Button>
    </PopoverTrigger>
    <PopoverContent className='max-w-[200px] w-full p-0'>
        <Command onSubmit={(e)=>{
            e.preventDefault()
        }}>
            <CommandInput placeholder='Search category...'/>
            <CreateCategoryDialog types={types} onSuccessCallback={successCallback}/>
            <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className='text-black'>
  {categoriesQuery && categoriesQuery.data ? (
    categoriesQuery.data.map((category: Category) => (
      <CommandItem
        key={category.id}
        
        onSelect={() => {
          setValue(category.name);
          setOpen((prev)=>!prev);
        }}
      >
        <CategoryRow category={category}/>
        <Check
          className={cn(
            "mr-2 h-4 w-4 opacity-0",
            value === category.name &&"opacity-100"
          )}
        />
        
      </CommandItem>
    ))
  ) : (
    <p className='animate-spin'><Loader2/></p> // Optional: You can add a loading indicator or message here
  )}
</CommandGroup>

          </CommandList>
        </Command>
    </PopoverContent>
</Popover>
<div>
    Category Picker
</div>
</> 
 )
}

export default CategoryPicker
