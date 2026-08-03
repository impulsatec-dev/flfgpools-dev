'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { SOCIAL_LINKS } from '@/config/site';

export function ContactForm() {
  const t = useTranslations('Contact.form');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [zipError, setZipError] = useState('');

  const validateZip = (zip: string) => {
    const zipNum = parseInt(zip, 10);
    if (zip.length !== 5 || isNaN(zipNum)) {
      setZipError(t('zipError'));
      return false;
    }
    if (zipNum < 33000 || zipNum > 33499) {
      setZipError(t('zipError'));
      return false;
    }
    setZipError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const zip = formData.get('zip') as string;

    if (!validateZip(zip)) return;

    setStatus('loading');
    try {
      // Simulate API call — replace with real endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-pool-deep mb-1">
          {t('role')}
        </label>
        <p className="text-xs text-pool-deep/60 mb-2">{t('roleHelper')}</p>
        <select
          id="role"
          name="role"
          required
          defaultValue=""
          className="w-full glass-chip rounded-xl px-4 py-3"
        >
          <option value="" disabled>Select…</option>
          <option value="homeowner">{t('roleOptions.homeowner')}</option>
          <option value="contractor">{t('roleOptions.contractor')}</option>
          <option value="realtor">{t('roleOptions.realtor')}</option>
          <option value="investor">{t('roleOptions.investor')}</option>
        </select>
      </div>

      {/* Name & Phone */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-pool-deep mb-1">
            {t('name')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t('namePlaceholder')}
            className="w-full glass-chip rounded-xl px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-pool-deep mb-1">
            {t('phone')}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder={t('phonePlaceholder')}
            className="w-full glass-chip rounded-xl px-4 py-3"
          />
        </div>
      </div>

      {/* Email & ZIP */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-pool-deep mb-1">
            {t('email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t('emailPlaceholder')}
            className="w-full glass-chip rounded-xl px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-pool-deep mb-1">
            {t('zip')}
          </label>
          <p className="text-xs text-pool-deep/60 mb-2">{t('zipHelper')}</p>
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            required
            placeholder="33189"
            onChange={(e) => validateZip(e.target.value)}
            className={`w-full glass-chip rounded-xl px-4 py-3 ${zipError ? 'border-red-400' : ''}`}
          />
          {zipError && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {zipError}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-pool-deep mb-1">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          className="w-full glass-chip rounded-xl px-4 py-3 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full glass-btn-primary px-6 py-3 text-white font-medium disabled:opacity-60"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </span>
        ) : (
          t('submit')
        )}
      </button>

      {/* Feedback */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl"
          >
            <Check className="h-5 w-5" />
            {t('success')}
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl"
          >
            <AlertCircle className="h-5 w-5" />
            {t('error')}{' '}
            <a href={`tel:${SOCIAL_LINKS.phone}`} className="underline">
              {SOCIAL_LINKS.phoneDisplay}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}