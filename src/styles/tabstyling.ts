import { createUseStyles } from 'react-jss';

const tabstyleSheet = {
    tabContainer: {
        width: '100%',
        //overflowX: 'scroll ',
    },
    tabList: {
        display: 'flex',
     
        gap: '30px',
        '@media (max-width: 767px)': {
             gap: '20px',
                     padding: '10px 0'
        }
       
    },
    tabtrigger: {
        padding: '12px 20px',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        fontWeight: 500,
        color: '#64748b',
        transition: 'all 0.2s ease',
        borderBottom: '2px solid transparent',
        marginBottom: '-2px',
        '&:hover': {
            color: '#3b82f6',
            backgroundColor: '#f8fafc'
        },
        '&$tabtriggerActive': {
            color: '#3b82f6',
            borderBottom: '2px solid #3b82f6'
        }
    },
    tabtriggerActive: {},
    tabContent: {
        // padding: '24px 8px',
        padding: '10px 0px',
        color: '#1e293b',
        lineHeight: 1.5,
        '@media (max-width: 728px)': {
            padding: '0',
        }
    },
    buttonStyle: {
          backgroundColor: 'transparent',
        border: 'none',
        color: '#000',
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0',
        fontSize: '18px',
        fontFamily: 'SamsungSharpSans',
        padding: '0',
        paddingBottom: '4px',
        width: 'auto',
        '@media (min-width: 728px) and (max-width: 1440px)': {
            fontSize: '1.3vw'
        },
         '@media (max-width: 767px)': {
             //padding: '10px 0',
             fontSize: '15px'
            }
    },
    activebuttonStyle: {
        backgroundColor: 'transparent',
        borderBottom: '2px solid #000',
        border: 'none',
        color: '#000',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        fontSize: '18px',
        fontFamily: 'SamsungSharpSans',
        padding: '0',
        paddingBottom: '4px',
        width: 'auto',
        '@media (min-width: 728px) and (max-width: 1440px)': {
            fontSize: '1.3vw'
        },
         '@media (max-width: 767px)': {
             //padding: '10px 0',
             fontSize: '15px'
         }
    }

};

export const useTabStyles = createUseStyles(tabstyleSheet);
