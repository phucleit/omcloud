import React from 'react'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function Dashboard() {
  const { t } = useTranslation()


  return (
    <div>
      {t('Dashboard')}
    </div>
  )
}
