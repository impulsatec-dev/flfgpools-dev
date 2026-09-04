'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const CONSENT_STORAGE_KEY = 'flfg-form-consent-v1';

type FormConsentProps = {
  accepted: boolean;
  onAccept: () => void;
  id: string;
};

export function useFormConsent() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted');
  }, []);

  const accept = () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    setAccepted(true);
  };

  return { accepted, accept };
}

export function FormConsentNotice({ accepted, onAccept, id }: FormConsentProps) {
  const t = useTranslations('LegalConsent');

  if (accepted) return null;

  return (
    <div className="space-y-3 rounded-xl border border-pool-deep/10 bg-white/40 p-4 text-xs leading-relaxed text-pool-deep/75">
      <p className="font-semibold text-pool-deep">{t('title')}</p>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          name="consent"
          type="checkbox"
          required
          onChange={(event) => {
            if (event.target.checked) onAccept();
          }}
          className="mt-0.5 h-4 w-4 shrink-0 accent-pool-aqua"
        />
        <span>
          {t('agreementPrefix')}{' '}
          <Link href="/privacy-policy" className="font-semibold underline underline-offset-2">
            {t('privacyPolicy')}
          </Link>{' '}
          {t('and')}{' '}
          <Link href="/terms-and-conditions" className="font-semibold underline underline-offset-2">
            {t('termsAndConditions')}
          </Link>
          {t('agreementSuffix')}
        </span>
      </label>
      <p>
        <strong>{t('confidentialityLabel')}:</strong> {t('confidentiality')}
      </p>
    </div>
  );
}
