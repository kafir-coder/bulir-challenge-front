"use client"

import { FC } from "react"
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const LoadMore: FC<{ page: string, disable: boolean }> = ({ page, disable }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('page', term);
    } else {
      params.delete('page');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  if(disable) {
    return <></>
  }

  return(
    <button
      className="text-gray-600 cursor-pointer hover:text-indigo-500 font-bold"
      onClick={() => handleSearch(String(Number(page) + 1))}
    >
      Carregar mais
    </button>
  )
}

export default LoadMore