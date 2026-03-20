import { createUseStyles } from 'react-jss';
import '../css/fonts.css'


const modalstyleSheet = {
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '100vw',
        height: '100%',
        // opacity: '0.6',
        position: 'fixed',

        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        zIndex: '3100',
        display: 'none'
    },
    modalwrapper: {
        height: '100%',
        width: '100%',
        '@media (min-width: 321px) and (max-width: 576px)': {
            // position: 'relative',
            // padding: '2.77777778vw',


        }
    },
    modalOuterContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (min-width: 321px) and (max-width: 576px)': {
            alignItems: 'start',
            width: 'auto',
            paddingLeft: '15px',
            paddingRight: '15px'


        }

    },
    modalContainer: {
        width: '952px',
        height: '846px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        '@media (min-width: 321px) and (max-width: 576px)': {
            width: '100%',
            overflowY: 'auto',
        }

        //overflow: 'scroll'


    },
    mainTitle: {
        fontSize: '24px',
        fontFamily: 'SamsungOne',
        color: '#000',
        textAlign: 'left',
        fontWeight: '700',
        marginTop: '10px',
        marginBottom: '10px'

    },
    '@media (max-width: 767px)': {
        mainTitle: {
            marginTop: '0px',
            marginBottom: '10px',
            paddingLeft: '0',
            paddingRight: '0',
            margin: "0",



        }
    },
    tableOuterContainer: {
        overflowX: 'hidden',
        height: 'auto',
        width: 'auto',

    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        cursor: 'pointer',
        border: 'none',
        '&::before': {
            content: '""', // <--- FIX: Double quotes inside single quotes
            display: 'block',
            margin: '3px',
            width: '20px',
            height: '20px',
            background: 'url(https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/svg-layer-close.svg) no-repeat 0 0',
            backgroundSize: '100% auto',
            '@media (max-width: 767px)': {
                width: '15px',
                height: '15px'
            }
        }
    },
    closebuttonContainer: {
        position: 'relative',
    },
    modalBackgroundColour: {
        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
        // width: '100vw',
        // height: '100%',
        // // opacity: '0.6',
        // position: 'fixed',
        //  top: '0',
        // left: '0',
        // bottom: '0',
        // right: '0',
        // zIndex: '3100',
    }
};
export const useModalStyles = createUseStyles(modalstyleSheet);