import {useCallback, useMemo} from 'react';
import useCookie from 'react-use-cookie';
import {CookieVariant, ICookieConsent, CookieConsentSettings} from './useCookiesConsent.types';

const selectedVariants = {
    yes: 'yes',
    no: 'no',
};

const useCookiesConsent = ({
    cookiePrefix = 'cookies',
}: CookieConsentSettings): ICookieConsent => {
    const [consent, setConsent] = useCookie(
        `${cookiePrefix}-consent`,
        JSON.stringify({
            necessary: true,
        }),
    );
    const [consentSelected, setConsentSelected] = useCookie(
        `${cookiePrefix}-consent-selected`,
        selectedVariants.no,
    );

    const checkConsentSelected = useCallback(() => {
        if (consentSelected === selectedVariants.no) {
            setConsentSelected(selectedVariants.yes);
        }
    }, [consentSelected, setConsentSelected]);

    const {acceptAllCookies, declineAllCookies, acceptCookie} = useMemo(() => ({
        acceptAllCookies: () => {
            checkConsentSelected();

            setConsent(JSON.stringify({
                ...JSON.parse(consent),
                necessary: true,
                statistics: true,
                preferences: true,
                marketing: true,
            }));
        },
        declineAllCookies: () => {
            checkConsentSelected();

            setConsent(JSON.stringify({
                ...JSON.parse(consent),
                necessary: false,
                statistics: false,
                preferences: true,
                marketing: false,
            }));
        },
        acceptCookie: (cookieName: CookieVariant | CookieVariant[]) => {
            checkConsentSelected();

            const newCookieSettings = JSON.parse(consent);

            if (Array.isArray(cookieName)) {
                cookieName.forEach(cookie => {
                    newCookieSettings[cookie] = true;
                });
            }

            if (typeof cookieName === 'string') {
                newCookieSettings[cookieName] = true;
            }

            setConsent(JSON.stringify(newCookieSettings));
        },
    }), [
        checkConsentSelected,
        setConsent,
        consent,
    ]);

    return {
        consent: JSON.parse(consent),
        consentSelected: consentSelected === selectedVariants.yes,
        acceptAllCookies,
        declineAllCookies,
        acceptCookie,
    };
};

export default useCookiesConsent;
