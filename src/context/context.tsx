import {createContext, useContext, useMemo} from 'react';
import useCookiesConsent from '../hooks/useCookiesConsent';
import {CookieConsentProviderProps, CookiesConsentWrapperProps} from './context.types';
import {ICookieConsent} from '../hooks/useCookiesConsent.types';

const createCookieConsentContext = () => createContext<ICookieConsent>({
    consent: {},
    consentSelected: false,
    declineAllCookies: () => {},
    acceptAllCookies: () => {},
    acceptCookie: () => {},
});

export const CookieConsentContext = createCookieConsentContext();

const CookieConsentProvider = ({
    settings,
    children,
}: CookieConsentProviderProps) => {
    const {
        consent,
        consentSelected,
        acceptAllCookies,
        declineAllCookies,
        acceptCookie,
    } = useCookiesConsent(settings || {});

    const context = useMemo<ICookieConsent>(
        () => ({
            consent,
            consentSelected,
            acceptAllCookies,
            declineAllCookies,
            acceptCookie,
        }),
        [
            consent,
            consentSelected,
            acceptAllCookies,
            declineAllCookies,
            acceptCookie,
        ],
    );

    return (
        <CookieConsentContext.Provider value={context}>
            {children}
        </CookieConsentContext.Provider>
    );
};

export const CookiesConsentWrapper = ({children, settings}: CookiesConsentWrapperProps) => (
    <CookieConsentProvider settings={settings}>
        {children}
    </CookieConsentProvider>
);

export const useCookiesConsentContext = () => useContext(CookieConsentContext);
