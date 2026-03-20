import React, { useState, useEffect, useRef, useCallback, use } from "react";
import { FC } from "react";
import { useStyles } from '../styles/tablestyling.ts';
import { useTabStyles } from '../styles/tabstyling.ts';
import S25data from '../data/s25series_uk.json';
import CompareData from "../components/CompareData.tsx";
import { DeviceNameList, getDeviceNames, getFilteredDeviceData, DeviceEntry, TableProps,APIResponse, ProductAPIResponse  } from '../types/types.ts';
import ProductData from "../components/ProductData.tsx";
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';



const Table: FC<TableProps> = (props) => {
    
    const selectedModel = props.selectedModel;
    
    const { familyskus, skus } = props;

    const tableRef = useRef<HTMLTableElement>(null);
    const NEWCOMPARE_DATA = S25data;
    const [apiData, setApiData] = useState<APIResponse['response']['resultData']['modelList']>([] as unknown as APIResponse['response']['resultData']['modelList']);
    const [productapi, setProductApiData] = useState<ProductAPIResponse['response']['resultData']['productList']>([] as unknown as ProductAPIResponse['response']['resultData']['productList']);

    const [deviceNames, setDeviceNames] = useState([] as DeviceNameList);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredData, setFilteredData] = useState<DeviceEntry<any>[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isAtEnd, setIsAtEnd] = useState(false);



    const [headerWidth, setHeaderWidth] = useState(194);

    const sentinelRef = useRef<HTMLDivElement>(null);
    const endSentinelRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLTableCellElement>(null);

    console.log('headerRef now:', headerRef.current);
    const headerRefCallback = (node: HTMLTableCellElement | null) => {
        if (node !== null) {
            // Measure immediately

            const initialWidth = node.getBoundingClientRect().width;
            console.log('Initial Width:', initialWidth);
            setHeaderWidth(node.getBoundingClientRect().width);

            // Optional: Attach ResizeObserver here if the column might change size later
            const observer = new ResizeObserver((entries) => {
                setHeaderWidth(entries[0].borderBoxSize[0].inlineSize);
            });
            observer.observe(node);
        }
    };




    const handleDataFromChild = (data: APIResponse | { error: string }) => {
        if ('response' in data) {
            setApiData(data.response.resultData.modelList);
            //console.log(data.response.resultData.modelList, 'other output');
        }
    };
    const handleProductDataFromChild = (proddata: ProductAPIResponse | { error: string }) => {
        if ('response' in proddata) {
            //console.log(proddata.response.resultData.productList, 'output');
            setProductApiData(proddata.response.resultData.productList);
        } else {
          
            //console.error(proddata.error);
            setProductApiData([] as unknown as ProductAPIResponse['response']['resultData']['productList']);
        }
    };

  useEffect(() => {

    const fetchedData = S25data;
    const filteredNames = getDeviceNames(fetchedData);
    setDeviceNames(filteredNames);

    const processedData = getFilteredDeviceData(fetchedData);
    setFilteredData(processedData);

    const timer = setTimeout(() => {
        props.onLoadComplete?.();
    }, 1000);

   
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

   
    const scrollRoot = document.querySelector('.css_Body__L88xm');
    

const startObserver = new IntersectionObserver(
    ([entry]) => {
     
       
        if (entry.boundingClientRect.top > 0) {
             console.log("START Sentinel - Is Intersecting:", entry.isIntersecting);
        console.log("START Sentinel - Intersection Ratio:", entry.intersectionRatio);
            setIsScrolled(!entry.isIntersecting);
        }
    },
    { 
        threshold: [0, 1.0], 
        root: scrollRoot, 
        rootMargin: '0px 0px 0px 0px' 
    }
);

// End Observer (Handles isAtEnd)
const endObserver = new IntersectionObserver(
        ([entry]) => {
    
            setIsAtEnd(entry.isIntersecting);
        },
        { 
            root: scrollRoot, 
            threshold: 0,
            rootMargin: '0px' 
        }
    );

    const currentStartSentinel = sentinelRef.current;
    const currentEndSentinel = endSentinelRef.current; 

    if (currentStartSentinel) startObserver.observe(currentStartSentinel);
    if (currentEndSentinel) endObserver.observe(currentEndSentinel);

        return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
        if (currentStartSentinel) startObserver.unobserve(currentStartSentinel);
        if (currentEndSentinel) endObserver.unobserve(currentEndSentinel);
        // Clean up both observers to prevent memory leaks
        startObserver.disconnect();
        endObserver.disconnect();
    };
}, [props.onLoadComplete]);


    const combinedArray = filteredData

        .filter(item1 => {
            const modelCode = item1?.details?.model?.[0]?.sku;
            //console.log(modelCode, "zing")

            const item2 = Array.isArray(apiData)
                ? apiData.find((item: typeof apiData[number]) => modelCode.includes(item.modelName))
                : undefined;
            const item3 = Array.isArray(productapi)
                ? productapi.find(item =>
                    Array.isArray(item.modelList) &&
                    item.modelList.some((model: { modelCode: string }) => model.modelCode === modelCode)
                )
                : undefined;
            const modelMatchExists = Array.isArray(productapi) && productapi.some(item =>
                Array.isArray(item.modelList) &&
                item.modelList.some((model: { modelCode: string }) => model.modelCode === modelCode)
            );

            // Return true only if both conditions (item2 and modelMatchExists) are met
            return item2 && item3;
        })

        .map(item1 => {
            const modelCode = item1?.details?.model?.[0]?.sku;
            const item2 = Array.isArray(apiData)
                ? apiData.find((item: typeof apiData[number]) => modelCode.includes(item.modelName))
                : undefined;
            const item3 = Array.isArray(productapi)
                ? productapi.find(item =>
                    Array.isArray(item.modelList) &&
                    item.modelList.some((model: { modelCode: string }) => model.modelCode === modelCode)
                )
                : undefined;

            //console.log(item3.modelList[1].priceDisplay, 'fuller');

            const apiprice = item3?.modelList?.[1].priceDisplay;
            const hardcodedPrice = item1?.details?.model?.[0]?.priceDisplay;
            let productPrice = '';

            if (apiprice === null) {
                productPrice = hardcodedPrice;
            } else {
                productPrice = apiprice;
            }

            return {
                id: modelCode,
                productName: item1?.name,
                productImage: item1?.details?.model?.[0]?.image,
                productDescription: item1?.details?.introduction?.[0]?.description,
                productPrice: item1?.details?.introduction?.[0]?.frompricetext + " " + productPrice,
                productDisplayIcon: item1?.details?.display?.[0]?.icon,
                productDisplayTitle: item1?.details?.display?.[0]?.title,
                productDisplayScreenSize: item2?.compareSpec?.[0]?.childAttr?.[0]?.childAttr?.[1]?.attrValue,
                productDisplayTech: item2?.compareSpec?.[2]?.childAttr?.[1]?.childAttr?.[0]?.attrValue,
                productCameraIcon: item1?.details?.camera?.[0]?.icon,
                productCameraTitle: item1?.details?.camera?.[0]?.title,
                productCameraWideAngle: item2?.compareSpec?.[4]?.childAttr?.[0]?.childAttr?.[1]?.attrValue,
                productCameraUltraWide: item2?.compareSpec?.[4]?.childAttr?.[0]?.childAttr?.[3]?.attrValue + " " + item1?.details?.camera?.[0]?.ultrawidetext,
                productCameraTelephoto: item2?.compareSpec?.[4]?.childAttr?.[0]?.childAttr?.[2]?.attrValue + " " + item1?.details?.camera?.[0]?.telephototext,
                productCameraFront: item2?.compareSpec?.[4]?.childAttr?.[0]?.childAttr?.[0]?.attrValue + " " + item1?.details?.camera?.[0]?.frontcameratext,
                productBatteryIcon: item1?.details?.battery?.[0]?.icon,
                productBatteryTitle: item1?.details?.battery?.[0]?.title,
                productBatteryPower: item2?.compareSpec?.[5]?.childAttr?.[0]?.childAttr?.[0]?.attrValue,
                productBatteryDescription: item2?.compareSpec?.[5]?.childAttr?.[0]?.childAttr?.[1]?.attrValue,
                productProcessorIcon: item1?.details?.processor?.[0]?.icon,
                productProcessorTitle: item1?.details?.processor?.[0]?.title,
                productProcessor: item2?.compareSpec?.[8]?.childAttr?.[0]?.childAttr?.[0]?.attrValue,
                productDurabiltyIcon: item1?.details?.durability?.[0]?.icon,
                productDurabiltyTitle: item1?.details?.durability?.[0]?.title,
                productDurabiltyMaterial: item2?.compareSpec?.[9]?.childAttr?.[0]?.childAttr[0]?.attrValue,
                prodcutDurabiltyScreen: item2?.compareSpec?.[9]?.childAttr?.[0]?.childAttr[1]?.attrValue,
                prodcutDurabiltyWaterResistance: item1?.details?.durability?.[0]?.water_resistance + ": " + item2?.compareSpec?.[9]?.childAttr?.[0]?.childAttr[2]?.attrValue,
                productStorageIcon: item1?.details?.storage?.[0]?.icon,
                productStorageTitle: item1?.details?.storage?.[0]?.title,
                productStorage: item1?.details?.storage?.[0]?.storage_options,
                productStorageMemory: item1?.details?.storage?.[0]?.memory_text + " " + item1?.details?.storage?.[0]?.memory_options,
                productCTATitle: item1?.details?.cta?.[0].text,
                productCTAbuttonText: item1?.details?.cta?.[0].buttontext,
                productCTAbuttonURL: item3?.modelList?.[1]?.configuratorUrl
            };
        });



    // console.log(filteredData[0]?.details?.model?.[0]?.sku, 'breathe');
    // console.log(filteredData[0]?.name, 'seen again');
    // console.log(apiData, 'flew');
    // console.log(productapi, 'flew away')

    // console.log(combinedArray, 'combined');
    // const shouldflip = isMobile && isScrolled;
    const showCollapsed = isScrolled && isMobile && !isAtEnd;

    console.log("Current width passed to JSS:", headerWidth)
    const classes = useStyles({ width: headerWidth });


    return (

        <>
<ScrollContainer hideScrollbars={false}>
            <div className={classes.tableContainer} >
                <div ref={sentinelRef} className={classes.sentinel} />
                <table className={classes.productTable} ref={tableRef}>
                    <tbody className={classes.tableBody}>
                        {combinedArray.map((combined => (
                            <tr>
                               
                                <th ref={headerRefCallback} className={`${showCollapsed ? classes.productHeaderTabCollapsed : classes.productHeaderTab} ${classes.stickyHeader}`} >
                                   <div className={classes.tablecellsheader}>
                                      <div className={`${showCollapsed ?  `${classes.productNamesVertical} ${classes.productNameAnimation}` : classes.productTitleContainer} `} >
                                         {combined.productName === 'Galaxy S25 Ultra' && (
                                            <p className={classes.bestsellertext}>Bestseller</p>
                                        )}
                                        <h3 className={classes.productName}>{combined?.productName}</h3>
                                       
                                        
                                        
                                    </div>
                                    {!showCollapsed && (
                                        <div className={classes.productImageContainer}>
                                            <img src={combined?.productImage} alt="" className={classes.productImage} />
                                        </div>
                                    )}

                                    {/* {selectedModel === combined.productName && (
                                        <div className={classes.viewingTextContainer}>
                                            <p className={classes.viewingText}>Currently Viewing</p>
                                        </div>
                                    )} */}
                                </div>
                                

                                </th>

                                <td className={`${classes.productDescriptionBox} ${classes.productTableRows}`}>
                                    <div className={classes.tablecells}>
                                        <p className={classes.productDescription}>{combined?.productDescription}</p>
                                        <p className={classes.productPrice}>{combined?.productPrice}</p>
                                        {combined.productName === 'Galaxy S25 Ultra' && (
                                      
                                                <a className={classes.bestsellerButton} href={"https://www.samsung.com" + combined.productCTAbuttonURL} target="_blank">See Galaxy S25 Ultra</a>
                                            
                                            
                                        )}
                                    </div>

                                </td>
                                <td className={`${classes.productDescriptionBox} ${classes.productTableRows} ${classes.verticalAlignTop}`}>
                                    <div className={classes.tablecells}>
                                        <div>
                                            <div className={classes.iconContainer}>
                                                <img src={combined?.productDisplayIcon} alt="" className={classes.icon} />
                                            </div>
                                            <p className={classes.productDetailsTitles}>{combined.productDisplayTitle}</p>
                                        </div>


                                        <div>
                                            <p className={classes.productDetailsTitleEmpahsisised}>{combined.productDisplayScreenSize}</p>
                                            <p className={classes.productDescription}>{combined.productDisplayTech.slice(11)}</p>
                                        </div>

                                    </div>
                                </td>
                                <td className={`${classes.productDescriptionBox} ${classes.productTableRows} ${classes.verticalAlignTop}`}>
                                    <div className={classes.tablecells}>
                                        <div>
                                            <div className={classes.iconContainer}>
                                                <img src={combined?.productCameraIcon} alt="" className={classes.icon} />
                                            </div>
                                            <p className={classes.productDetailsTitles}>{combined.productCameraTitle}</p>
                                        </div>

                                        <div>
                                            <p className={classes.productDetailsTitleEmpahsisised}>{combined.productCameraWideAngle}</p>
                                            <p className={classes.productDescription}>{combined.productCameraUltraWide}<br />{combined.productCameraTelephoto}<br />{combined.productCameraFront}</p>

                                        </div>
                                    </div>
                                </td>
                                <td className={`${classes.productDescriptionBox} ${classes.productTableRows} ${classes.verticalAlignTop}`}>
                                    <div className={classes.tablecells}>
                                        <div>
                                            <div className={classes.iconContainer}>
                                                <img src={combined?.productBatteryIcon} alt="" className={classes.icon} />
                                            </div>
                                            <p className={classes.productDetailsTitles}>{combined.productBatteryTitle}</p>
                                        </div>

                                        <div>
                                            <p className={classes.productDetailsTitleEmpahsisised}>{combined.productBatteryPower}</p>
                                            <p className={classes.productDescription}>{combined.productBatteryDescription}</p>

                                        </div>
                                    </div>
                                </td>
                                <td className={`${classes.productDescriptionBox} ${classes.productTableRows} ${classes.verticalAlignTop}`}>
                                    <div className={classes.tablecells}>
                                        <div>
                                            <div className={classes.iconContainer}>
                                                <img src={combined?.productProcessorIcon} alt="" className={classes.icon} />
                                            </div>
                                            <p className={classes.productDetailsTitles}>{combined.productProcessorTitle}</p>
                                        </div>
                                        <div>
                                            <p className={classes.productDetailsTitleEmpahsisised}>{combined.productProcessor}</p>

                                        </div>
                                    </div>
                                </td>
                                <td className={`${classes.productDescriptionBox} ${classes.productTableRows} ${classes.verticalAlignTop}`}>
                                    <div className={classes.tablecells}>
                                        <div>
                                            <div className={classes.iconContainer}>
                                                <img src={combined?.productDurabiltyIcon} alt="" className={classes.icon} />
                                            </div>
                                            <p className={classes.productDetailsTitles}>{combined.productDurabiltyTitle}</p>
                                        </div>

                                        <div>
                                            <p className={classes.productDetailsTitleEmpahsisised}>{combined.productDurabiltyMaterial}</p>
                                            <p className={classes.productDescription}>{combined.prodcutDurabiltyScreen}<br />{combined.prodcutDurabiltyWaterResistance}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className={`${classes.productDescriptionBox} ${classes.productTableRows} ${classes.verticalAlignTop}`}>
                                    <div className={classes.tablecells}>
                                        <div>
                                            <div className={classes.iconContainer}>
                                                <img src={combined?.productStorageIcon} alt="" className={classes.icon} />
                                            </div>
                                            <p className={classes.productDetailsTitles}>{combined.productStorageTitle}</p>
                                        </div>

                                        <p className={classes.productDetailsTitleEmpahsisised}>{combined.productStorage}</p>
                                        <p className={classes.productDescription}>{combined.productStorageMemory}</p>
                                    </div>
                                </td>
                                <td className={`${classes.productDescriptionBox} ${classes.productTableRows} ${classes.productLastTab}`} style={{position:'relative'}}>
                                     
                                    <div className={`${classes.tablecells} ${classes.tablecellinnerlast}`}>
                                    <h3 className={classes.buyingTextTitle}>Want to buy the {combined?.productName}?</h3>
                                    <a className={classes.buybutton} href={"https://www.samsung.com" + combined.productCTAbuttonURL} target="_blank">{combined.productCTAbuttonText}</a>
                                 
                                    </div>
                                   
                                </td>
                            </tr>

                        )))}

                    </tbody>

 
                </table>

                                                          <div ref={endSentinelRef} className={classes.endSentinel}></div>
            </div>
</ScrollContainer>

            <CompareData familyskus={props.familyskus} onDataFetched={handleDataFromChild} />
            <ProductData skus={props.skus} onFetchedData={handleProductDataFromChild} />


        </>
    );
};

export default Table;