import { createUseStyles } from 'react-jss';
import '../css/fonts.css';
import { StyleProps } from '../types/types.ts';




const styleSheet = {

    tableContainer: {

        '@media (max-width: 767px)': {
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollPaddingLeft: '115px',
        },

        marginBottom: '20px',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: (props: StyleProps) => props.width || 194,
            '@media (max-width: 767px)': {
                height: '100%',
            },
            '@media (min-width: 768px)': {
                height: '95%',
            },
            backgroundColor: '#fff', // Match your table background color
            zIndex: 2, // Higher than scrolling cells, but LOWER than sticky header text
            pointerEvents: 'none', // Critical: lets you still click/hover the sticky cells
            borderRadius: '12px 0 0 12px', // Matches your header's radius
        }

    },
    productTable: {

        tableLayout: 'fixed',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        paddingLeft: '0px',
        paddingRight: '0px',
        width: 'max-content',
        minWidth: '1000px', // Fallback
        height: 'auto',
        cursor: 'grab',

        '@media (max-width: 767px)': {
            paddingLeft: '0px',
            paddingRight: '0px'
        }
    },
    tableBody: {


    },
    productHeaderTab: {
        backgroundColor: '#f7f7f7',
        width: '194px',
        height: '194px',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        borderLeft: "1px solid #ccc",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        // padding: '0 16px',
        '@media (min-width: 768px)': {
            width: '194px',
            height: '194px'
        },
        '@media (max-width: 767px)': {
            width: '112px',
            height: '112px'
        }

    },
    productHeaderTabCollapsed: {
        backgroundColor: '#f7f7f7',
        // padding: '0 16px',
        width: '63px',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        borderLeft: "1px solid #ccc",
        borderTopLeftRadius: "15px",
        borderBottomLeftRadius: "15px",

    },
    productLastTab: {
        borderRight: "1px solid #ccc",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        backgroundColor: "#F5F7FE",
        '@media (max-width: 767px)': {
            // width: '240px',
            paddingLeft: '10px!important',


        }
    },
    productTableRows: {
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',

    },
    '@media (min-width: 728px) and (max-width: 1440px)': {
        productDescription: {
            fontSize: '1.11111111vw'
        },

    },
    productName: {
        fontSize: '14px',
        fontFamily: 'SamsungOne',
        fontWeight: '700',
        marginBottom: '10px',
        marginTop: '0px',
        writingMode: 'horizontal-tb',

    },
    productHighlightedName: {
        fontSize: '16px',
        fontFamily: 'SamsungSharpSans',
        '@media (min-width: 728px) and (max-width: 1440px)': {
            fontSize: '1.27vw'
        }

    },

    productDescriptionBox: {
        width: '200px',
        padding: '0',
        margin: '0',
        height: '200px',

        '@media (max-width: 767px)': {
            width: '190px',
            height: '190px',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
        }
    },
    productDescription: {
        color: '#000',
        fontSize: '12px',
        fontStyle: 'normal',
        fontFamily: 'SamsungOne',
        marginBottom: '10px',
        marginTop: '0'
    },

    productPrice: {
        fontSize: '14px',
        fontFamily: 'SamsungOne',
        fontWeight: "700",
        fontStyle: 'normal'
    },

    productDetailsTitles: {
        color: '#000',
        fontSize: '14px',
        fontFamily: 'SamsungOne',
        fontWeight: '700',
        marginTop: '0',
        marginBottom: '10px',

    },
    productDetailsTitleEmpahsisised: {
        color: '#000',
        fontSize: '14px',
        fontFamily: 'SamsungOne',
        fontWeight: '700',
        marginTop: '0',
        marginBottom: '5px'
    },

    productDetailsDescription: {
        width: '290px'
    },
    productImageContainer: {
        width: "100%",
        opacity: '1'

    },
    productImage: {
        maxWidth: '114px',
        '@media (max-width: 767px)': {
            maxWidth: '80px'
        }

    },
    buyText: {
        fontSize: '20px',
        fontFamily: 'SamsungOne',
        fontWeight: 'bold'
    },
    iconContainer: {
        width: "100%",
    },
    icon: {
        maxWidth: "32px"
    },
    verticalAlignTop: {
        verticalAlign: 'top'
    },
    buybutton: {
        backgroundColor: '#2189FF',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        maxWidth: '130px',
        display: "block",
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: '12px',
        // padding: "11px 16px",
      
        fontFamily: 'SamsungOne',
        fontWeight: '700',
        padding: '9px 23px 10px 23px',
        borderRadius: '20px',
        
            width: '100%',
        '@media (min-width: 728px) and (max-width: 1440px)': {
            padding: '.41666667vw 1.31944444vw .41666667vw 1.31944444vw',
            borderRadius: '1.38888889vw',
        },
        '@media (max-width: 767px)': {
            maxWidth: '110px',
            padding: '2.22222222vw 3.61111111vw',
            borderRadius: '5.55555556vw'
        }



    },
    progressBarContainer: {
        display: 'flex',
        alignItems: 'justify-center',
    },
    progressBar: {
        height: '8px',
        width: '100px',
        backgroundColor: '#e0e0e0',
        borderRadius: '3px',
        overflow: 'hidden',
    },
    motionDiv: {
        position: 'absolute',
        top: 0,
        width: '25px',
        height: '8px',
        backgroundColor: '#2189FF',
        borderRadius: '3px',
        transition: 'left 0.3s ease-out',
    },
    viewingTextContainer: {
        backgroundColor: '#2189FF',
        padding: '5px 10px',
        height: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '150px',
        margin: '0 auto'

    },
    viewingText: {
        color: '#fff',
        fontSize: '14px',
        fontFamily: 'SamsungOne',
        fontWeight: '600',
        '@media (min-width: 728px) and (max-width: 1440px)': {
            fontSize: '1.11111111vw'
        }
    },
    buyingTextTitle: {
        marginTop: '18px',
        marginBottom: '18px',
        fontSize: '18px',
        fontFamily: 'SamsungSharpSans',
        '@media (min-width: 728px) and (max-width: 1440px)': {
            // fontSize: '1.2vw'

        },
        '@media  (max-width: 727px)': {
            // fontSize: '4vw'
        }

    },
    stickyHeader: {
        position: 'sticky',
        left: '0',
        zIndex: '10',
        maskImage: 'none',
        WebkitMaskImage: 'none',
        boxShadow: 'inset -1px 0 0 #ccc',
        scrollSnapAlign: 'none',

        '@media (min-width: 768px)': {
            width: '194px',
            height: '194px'
        },
        '@media (max-width: 767px)': {
            width: '112px',
            minWidth: '112px',
            transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            // height: '114px'
        }
        //   '&::before': {
        //     content: "",
        //     postion: 'absolute',
        //     left: '0',
        //     top: '0',
        //     right: '0',
        //     bottom: '0',
        //     backgroundColor: '#f7f7f7',
        //     zIndex: '-1'
        //   }

    },
    bestsellertext: {
        color: '#4487F7',
        fontSize: '10px',
        fontFamily: 'SamsungOne',
        fontWeight: '700',
        fontStyle: 'normal',
        textAlign: 'center',
        marginBottom: '0',
        writingMode: 'horizontal-tb'


    },
    bestsellerButton: {
        padding: '9px 23px 10px 23px',
        borderRadius: '20px',
        border: '1px solid #000',
        fontSize: '12px',
        fontWeight: '700',
        fontFamily: 'SamsungOne',
        display: 'block',
        // margin: '0 auto',
        textDecoration: 'none',
        color: '#000',
         maxWidth: 'fit-content',
            width: '100%',


        '@media (min-width: 728px) and (max-width: 1440px)': {
            padding: '.41666667vw 1.31944444vw .41666667vw 1.31944444vw',
            borderRadius: '1.38888889vw',
        },
        '@media (max-width: 767px)': {
           
            padding: '2.22222222vw 3.61111111vw',
            borderRadius: '5.55555556vw'
        }


    },
    sentinel: {

        //position: 'absolute',
        top: '0',
        bottom: '0',   /* Stretch to full height of the table row */
        width: '5px',
        height: '100%',    /* Explicit height */
        '@media (max-width: 767px)': {
            minHeight: '200px', /* Ensure it covers the whole view area */
        },

        pointerEvents: 'none',
        background: 'transparent',
        left: '0'

    },
    endsentinel: {
        position: 'absolute',
        right: '0',         /* This ensures you must reach the absolute end */
        top: '0',
        bottom: '0',
        width: '1px',
        height: '100%',
        pointerEvents: 'none',
        background: 'transparent'
    },
    productNamesVertical: {
        writingMode: 'vertical-lr',
        display: 'flex',
        rotate: '270deg',
        transformOrigin: 'center',
    },
    productNameAnimation: {
        transition: 'rotate 0.5s ease-in-out',

        rotate: '-90deg',

        // transition: 'transform 0.8s ease',
        //  writingMode: 'vertical-lr',
    },

    productBestsellerVertical: {
        writingMode: 'vertical-lr',
        // display: 'inline-block',
        rotate: '270deg',
        transformOrigin: 'center',
    },
    productBestsellerAnimation: {
        transition: 'rotate 0.5s ease-in-out',
        rotate: '-90deg',
    },

    productTitleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    productTitleContainerVertical: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    tablecells: {
        display: "flex",
        flexDirection: 'column',
        height: '200px',
        justifyContent: 'space-between',
        padding: '16px 20px',
        alignItems: 'flex-start',
        '@media (max-width: 767px)': {
            height: '190px',
            width: '190px'
        }

    },
    tablecellinnerlast:{
         '@media (max-width: 767px)': {
                    padding: '16px 20px 16px 10px !important'
         }
    },
    tablecellsheader: {
        display: "flex",
        flexDirection: 'column',
        height: '200px',
        width: 'auto',
        padding: '0 16px',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 767px)': {
            height: '190px'
        }


    },
    productImageContainerFade: {
        opacity: '0',
        transition: 'opacity 0.3s ease-in-out'
    }


}
export const useStyles = createUseStyles<string, StyleProps>(styleSheet);