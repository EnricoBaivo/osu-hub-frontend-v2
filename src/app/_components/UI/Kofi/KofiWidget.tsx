"use client"

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import ButtonNodge from '../Button/ButtonNodge';

declare global {
    interface Window {
        kofiwidget2: any;
    }
}

const KofiWidget = () => {

    return <div className="inline-block whitespace-nowrap min-w-[160px]">
        <Link
            title="Support me on ko-fi.com"
            className=""
            href="https://ko-fi.com/O4O313M0KH"
            target="_blank"
        >
            <ButtonNodge className='text-base flex flex-row items-center justify-center gap-2 normal-case'>
                <img
                    src="https://storage.ko-fi.com/cdn/cup-border.png"
                    alt="Ko-fi donations"
                    className="h-[15px] w-[22px] animate-wiggle"
                />
                Buy me a Coffee
            </ButtonNodge>
        </Link>
    </div>
};

export default KofiWidget;
