export interface APIResponse {
    response: {
        resultData: {
            modelList: {
                modelcode: string;
                specs: {
                    attrKey: string;
                    attrName: string;
                    attrValue: string;

                }
            }
        }
    }
    siteCode: string;
    statusCode: number;
    statusMessage: string;
}

export interface ProductAPIResponse {
   response: {
        resultData: {
            productList:{
             modelList: {
                modelcode: string;
                priceDisplay: string;
               
            }
            }
          
        }
    }
    siteCode: string;
    statusCode: number;
    statusMessage: string;
}
export interface CompareDataProps {
    response: {
        resultData: {
            modelList: {
                modelcode: string;
                specs: {
                    attrKey: string;
                    attrName: string;
                    attrValue: string;

                }
            }
        }
    }
    siteCode: string;
    statusCode: number;
    statusMessage: string;
}


export interface DeviceDetails {
    screen_size: string;
    chipset: string;
    price: number;
}

// 2. Define the main object structure, ensuring it has dynamic keys and the 'highlights' key.
export interface CompareData<T extends object> {
    // Device names are dynamic (e.g., 'iPhone_15', 'Galaxy_S24')
    [key: string]: T;


}

// 3. Define the type for the final list of device names (strings).
export type DeviceNameList = string[];

// 4. The utility function to perform the filtering.
export function getDeviceNames<T extends object>(
    data: CompareData<T>
): DeviceNameList {
    // 1. Get all keys from the object.
    // 2. Filter the array, keeping only names (n) that are NOT "highlights".
    const deviceNames: DeviceNameList = Object.keys(data).filter(
        (n) => n !== "highlights"
    );

    return deviceNames;
}

// Interface for the structured data entry containing both the name and the details
export interface DeviceEntry<T> {
    name: string;
    details: T;
}
// 3. The utility function to perform the filtering and return the full data objects.
export function getFilteredDeviceData<T extends object>(
    data: CompareData<T>
): DeviceEntry<T>[] {

    // 1. Get all keys from the object and filter out "highlights".
    const deviceKeys = Object.keys(data).filter(
        (n) => n !== "highlights"
    );

    // 2. Map the filtered keys into structured objects containing the name and the data value.
    const filteredData: DeviceEntry<T>[] = deviceKeys.map(key => ({
        name: key,
        details: data[key]
    }));

    return filteredData;
}
export type PhoneModel = 'S25' | 'S25Ultra';

export interface TabConfig {
  id: PhoneModel;
  label: string;
}
export interface CompareProps {
  
  onDataFetched: (data: APIResponse | { error: string }) => void;
  familyskus: string[]; // This is your inbound prop
}
export interface ProductDataProps {
    onFetchedData: (data: ProductAPIResponse | { error: string }) => void;
    skus: string[];
}
export interface TableProps {
    familyskus: string[];
    skus: string[];
    selectedModel?: string | null | undefined;
    onLoadComplete?: () => void;
    columnWidth?: number | string;
   
}
export interface StyleProps {
    width: number | string;
}

