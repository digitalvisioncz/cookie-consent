import {CookieConsentSettings} from '../hooks/useCookiesConsent.types';

export type CookieConsentProviderProps = {
    settings?: CookieConsentSettings,
    children: React.ReactNode,
};

export type CookiesConsentWrapperProps = {
    settings?: CookieConsentSettings,
    children: React.ReactNode,
};
