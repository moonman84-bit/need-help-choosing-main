import React, { useEffect, useState } from "react";
import Table from './components/Table.tsx';
import { useModalStyles } from './styles/modalstyling.ts';
import { useTabStyles } from './styles/tabstyling.ts';
import styles from './css/index.module.css';
import { PhoneModel, TabConfig} from './types/types.ts';
import { Dialog } from '@base-ui/react/dialog';
import { ScrollArea } from '@base-ui/react/scroll-area';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import S25data from './data/s25series_uk.json';



const App: React.FC = () => {
  const classes = useModalStyles();
  const tabClasses = useTabStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const tabs: TabConfig[] = [
    { id: 'S25', label: 'S25+ | S25 | S25 FE'},
    { id: 'S25Ultra', label: 'S25 Ultra | S25 Edge'},
  ];
  const [activeTab, setActiveTab] = useState<PhoneModel>('S25');

//const devices: PhoneData =  S25data;


//const modelSKUS: string[] = Object.values(modelsData.map((modeldata) => modeldata.model.sku));

// const allSkus: 


  const s25skus = ['SM-S936BLBDEUB', 'SM-S931BLBGEUB', 'SM-S731BDBDEUB'];

  const s25ultraskus = ['SM-S938BAKDEUB', 'SM-S937BZKDEUB'];
  //console.log('s25skus:', s25skus);
  const s25familyskus = ['SM-S936', 'SM-S931', 'SM-S731'];
  const s25familyultraskus = ['SM-S938', 'SM-S937'];


  const geturl = new URL(window.location.href);


  const selectedModel = document
    .querySelector(
      `div.s-option-box.hubble-pd-radio.js-radio-wrap.is-checked input[data-typecode=OPT-015]`
    )
    ?.getAttribute("data-displayname");

  const handleShowModal = (event?: Event | React.MouseEvent<HTMLButtonElement>) => {
    // const orignalpopup = document.querySelector('#hubble-service-guide-layer');
    // orignalpopup?.remove();
   
    setIsOpen(true);
    setIsLoading(true);
    //console.log('silly rabbit');
     
    //console.log('geturl:', geturl.host);
    console.log('Modal opened');
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.need-help-to-choose');
      if (target) {
        console.log('Clicked!');
        handleShowModal(e);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);





  const renderTableContent = (familySkus: any, skus: any) => {
    if (isLoading) {
      return <TableSkeleton rows={5} />;
    }
    return <Table familyskus={familySkus} skus={skus} selectedModel={selectedModel || undefined} />;
  };

  return (
    <>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        {geturl.host.includes('localhost')&& (
        <Dialog.Trigger className={styles.Button} onClick={(e) => handleShowModal(e)}>Open dialog</Dialog.Trigger>
        )}
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Viewport className={styles.Viewport}>
            <Dialog.Popup className={styles.Popup}>
              <div className={styles.Actions}>
                <Dialog.Close className={classes.closeButton}></Dialog.Close>
              </div>
              <div className={styles.PopupHeader}>
                <Dialog.Title className={classes.mainTitle}>
                  Compare Galaxy S25</Dialog.Title>
              </div>
              <div className={styles.Description}> 
                {/* <Dialog.Description className={styles.Description}> */}
                <div className={tabClasses.tabList}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      className={`tab-trigger ${activeTab === tab.id ? tabClasses.activebuttonStyle : tabClasses.buttonStyle}`}

                      onClick={() => { setIsLoading(true);setActiveTab(tab.id); }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              {/* </Dialog.Description> */}
              </div>
             
              <ScrollArea.Root className={styles.Body}>
                <ScrollArea.Viewport className={styles.BodyViewport}>
                  <ScrollArea.Content className={styles.BodyContent}>

                    <section className={styles.Section}>
                      <div className={tabClasses.tabContainer}>

                        <div className={tabClasses.tabContent}>
                          <div className={classes.tableOuterContainer}>


                            
                            {/* One Skeleton to rule them all */}
                            {isLoading && <TableSkeleton />}

                            <div style={{ display: isLoading ? 'none' : 'block' }}>
                              {activeTab === 'S25' && (
                                <Table
                                  familyskus={s25familyskus}
                                  skus={s25skus}
                                  onLoadComplete={() => setIsLoading(false)}
                                  selectedModel={selectedModel}
                                />
                              )}
                              {activeTab === 'S25Ultra' && (
                                <Table
                                  familyskus={s25familyultraskus}
                                  skus={s25ultraskus}
                                  onLoadComplete={() => setIsLoading(false)}
                                  selectedModel={selectedModel}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                  </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className={styles.Scrollbar}>
                  <ScrollArea.Thumb className={styles.ScrollbarThumb} />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>

            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>


    </>
  );
}


// --- Sub-component: Table Skeleton ---
// --- Table Skeleton UI ---
const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div style={{ width: '100%', animation: 'fadeIn 0.3s' }}>
    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      <Skeleton width={700} height={30} />
      <Skeleton width={700} height={30} />
    </div>
    {[...Array(rows)].map((_, i) => (
      <div key={i} style={{ marginBottom: '10px' }}>
        <Skeleton height={90} />
      </div>
    ))}
  </div>
);
export default App;
