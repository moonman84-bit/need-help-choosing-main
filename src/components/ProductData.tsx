import { useEffect } from "react";
import { FC } from "react";
import axios from 'axios';
import {ProductAPIResponse, ProductDataProps} from  '../types/types.ts';



const ProductData: FC<ProductDataProps> = (props) => {
    //console.log('ProductData skus:', props.skus);

    const S25products = props.skus.join(',');
    useEffect(() => {
        const countryCode = 'uk';

        const fetchProductData = async () => {
            try {
                const apiUrl =`https://searchapi.samsung.com/v6/front/b2c/product/card/detail/newhybris?siteCode=${countryCode}&modelList=${S25products}&saleSkuYN=N&onlyRequestSkuYN=N&keySummaryYN=N&specYN=N&commonCodeYN=N`;
                // const apiUrl =`https://api.shop.samsung.com/tokocommercewebservices/v2/${countryCode}/products?productCodes=${S25products}`;
            
                const response = await axios.get<ProductAPIResponse>(apiUrl);
                const apiData = response.data;
            
                props.onFetchedData(apiData);

            } catch (error) {
                console.error("Fetch error:", error);
                props.onFetchedData({ error: 'Failed to fetch data' });
            }

        };
        fetchProductData();
    }, []);

    return null; // This component does not render anything
};

export default ProductData;