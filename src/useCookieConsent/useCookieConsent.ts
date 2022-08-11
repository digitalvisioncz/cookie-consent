import {useCallback, useEffect, useMemo} from 'react';
import useCookie from 'react-use-cookie';
import {
    CookieVariant,
    ICookieConsent,
    CookieConsentSettings,
    ConsentCookies,
} from './useCookieConsent.types';

const selectedVariants = {
    yes: 'yes',
    no: 'no',
};

const defaultConsent = [CookieVariant.necessary];

const useCookieConsent = ({
    cookiePrefix = 'cookies',
    cookies = Object.values(CookieVariant),
}: CookieConsentSettings): ICookieConsent => {
    const [consent, setConsent] = useCookie(
        `${cookiePrefix}-consent`,
        JSON.stringify(defaultConsent),
    );
    const [consentAccepted, setConsentAccepted] = useCookie(
        `${cookiePrefix}-consent-accepted`,
        selectedVariants.no,
    );
    const allCookies = useMemo(() => {
        const cookiesWithNecessary = [...cookies, CookieVariant.necessary];

        return [...new Set(cookiesWithNecessary)];
    }, [cookies]);

    const checkConsentAccepted = useCallback(() => {
        if (consentAccepted === selectedVariants.no) {
            setConsentAccepted(selectedVariants.yes);
        }
    }, [consentAccepted, setConsentAccepted]);

    useEffect(() => {
        if (!consentAccepted || consentAccepted === selectedVariants.no) {
            setConsent(JSON.stringify(defaultConsent));
        }
    }, [consentAccepted, setConsent]);

    const {
        acceptAllCookies,
        declineAllCookies,
        acceptSelectedCookies,
    } = useMemo(() => ({
        acceptAllCookies: () => {
            checkConsentAccepted();

            setConsent(JSON.stringify(allCookies));
        },
        declineAllCookies: () => {
            checkConsentAccepted();

            setConsent(JSON.stringify(defaultConsent));
        },
        acceptSelectedCookies: (cookieName: CookieVariant | CookieVariant[]) => {
            checkConsentAccepted();

            let newCookieSettings: ConsentCookies = defaultConsent;

            if (Array.isArray(cookieName)) {
                newCookieSettings = [...newCookieSettings, ...cookieName];
            }

            if (typeof cookieName === 'string') {
                newCookieSettings.push(cookieName);
            }

            setConsent(JSON.stringify([...new Set(newCookieSettings)]));
        },
    }), [
        allCookies,
        checkConsentAccepted,
        setConsent,
    ]);

    return {
        consent: {
            cookies: JSON.parse(consent),
            groups: [],
            isAccepted: consentAccepted === selectedVariants.yes,
        },
        acceptAllCookies,
        declineAllCookies,
        acceptSelectedCookies,
    };
};

export default useCookieConsent;
