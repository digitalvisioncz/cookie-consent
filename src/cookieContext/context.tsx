import {createContext, useContext, useMemo} from 'react';
import useCookiesConsent from '../useCookieConsent/useCookieConsent';
import {CookieConsentProviderProps, CookiesConsentWrapperProps} from './context.types';
import {ICookieConsent} from '../useCookieConsent/useCookieConsent.types';

const createCookieConsentContext = () => createContext<ICookieConsent>({
    consent: {
        cookies: [],
        groups: [],
        isAccepted: false,
    },
    declineAllCookies: () => {},
    acceptAllCookies: () => {},
    acceptSelectedCookies: () => {},
});

export const CookieConsentContext = createCookieConsentContext();

const CookieConsentProvider = ({
    settings,
    children,
}: CookieConsentProviderProps) => {
    const {
        consent,
        acceptAllCookies,
        declineAllCookies,
        acceptSelectedCookies,
    } = useCookiesConsent(settings || {});

    const context = useMemo<ICookieConsent>(
        () => ({
            consent,
            acceptAllCookies,
            declineAllCookies,
            acceptSelectedCookies,
        }),
        [
            consent,
            acceptAllCookies,
            declineAllCookies,
            acceptSelectedCookies,
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
