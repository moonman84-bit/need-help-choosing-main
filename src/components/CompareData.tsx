import  {  useEffect } from "react";
import { FC } from "react";
import axios from 'axios';
import { APIResponse, CompareProps } from '../types/types.ts';


const CompareData: FC<CompareProps> = ( props) => {
    //console.log('CompareData skus:', props.familyskus);
  
    const S25ModelCode = props.familyskus.join(',');
    //console.log('S25ModelCode:', S25ModelCode);
    

    // const [products, setProducts] = useState(null as APIResponse[] | null);

     useEffect(() => {
        const countryCode = 'uk';

        const fetchCompareData = async () => {
            try {
                // const apiUrl =`https://searchapi.samsung.com/v6/front/b2c/product/spec/compare?siteCode=uk&modelList=${S25products}`;
                const apiUrl =`https://searchapi.samsung.com/v6/front/b2c/product/mktpd/spec/compare/?siteCode=${countryCode}&categoryCode=SMARTPHONE&modelList=${S25ModelCode}`;
               
                const response = await axios.get<APIResponse>(apiUrl);
                const apiData = response.data;
                props.onDataFetched(apiData);

            
                


                //setProducts([productList]);

                //setModelList(modelList);

            } catch (error) {
                console.error("Fetch error:", error);
                props.onDataFetched({ error: 'Failed to fetch data' });
            }
        };
        fetchCompareData();
     }, []);


    // Component must return a React node; return null since this component only performs side effects.
    return null;
};

export default CompareData;