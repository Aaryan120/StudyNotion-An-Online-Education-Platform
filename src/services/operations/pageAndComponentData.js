import React from 'react'
import toast from 'react-hot-toast';
import { apiconnector } from '../apiconnector';
import { catalogData } from '../apis';

export const getCatalogPageData = async (categoryId) =>{
    let result = [];
    // const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryID: categoryId,});

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("CATALOG PAGE DETAILS API ERROR...",error);
        toast.error(error.response.data.message);
    }
    // toast.dismiss(toastId);
    return result;
}