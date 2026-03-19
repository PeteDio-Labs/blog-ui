import { useState, useEffect } from 'react';
import api from '../services/api';

export interface EnvironmentInfo {
  environment: 'dev' | 'prod';
  name: string;
  version: string;
}

export const useEnvironment = () => {
  const [info, setInfo] = useState<EnvironmentInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        const data = await api.get<{ environment: string; apiVersion?: string; version?: string }>('/info');
        setInfo({
          environment: data.environment as 'dev' | 'prod',
          name: 'Blog API',
          version: data.apiVersion || data.version || 'unknown'
        });
      } catch (error) {
        console.error('Failed to fetch environment info:', error);
        setInfo({
          environment: (import.meta.env.VITE_ENVIRONMENT || 'dev') as 'dev' | 'prod',
          name: 'Blog API',
          version: 'unknown'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironment();
  }, []);

  return { info, loading };
};
