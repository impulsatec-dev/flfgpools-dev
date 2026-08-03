import { pools, getPoolBySlug, type Pool } from './pools';

export async function getPoolById(poolId: string): Promise<Pool | undefined> {
  return getPoolBySlug(poolId);
}

export async function getPoolDetailById(poolId: string): Promise<Pool | undefined> {
  const pool = getPoolBySlug(poolId);
  return pool && pool.productClass === 'pool' ? pool : undefined;
}

export async function getSpaById(spaId: string): Promise<Pool | undefined> {
  const pool = getPoolBySlug(spaId);
  return pool?.productClass === 'spa' ? pool : undefined;
}

export function getAllPoolIds(): string[] {
  return pools.filter((p) => p.productClass === 'pool').map((p) => p.slug);
}

export function getAllSpaIds(): string[] {
  return pools.filter((p) => p.productClass === 'spa').map((p) => p.slug);
}

export function getAllLedgeIds(): string[] {
  return pools.filter((p) => p.productClass === 'ledge').map((p) => p.slug);
}
