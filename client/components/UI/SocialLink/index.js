import styles from './index.module.scss'

function SocialLink({ url, social, black = false}) {
    const inst = <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C8.74 0 8.333 0.015 7.053 0.072C5.775 0.132 4.905 0.333 4.14 0.63C3.351 0.936 2.681 1.347 2.014 2.014C1.347 2.681 0.935 3.35 0.63 4.14C0.333 4.905 0.131 5.775 0.072 7.053C0.012 8.333 0 8.74 0 12C0 15.26 0.015 15.667 0.072 16.947C0.132 18.224 0.333 19.095 0.63 19.86C0.936 20.648 1.347 21.319 2.014 21.986C2.681 22.652 3.35 23.065 4.14 23.37C4.906 23.666 5.776 23.869 7.053 23.928C8.333 23.988 8.74 24 12 24C15.26 24 15.667 23.985 16.947 23.928C18.224 23.868 19.095 23.666 19.86 23.37C20.648 23.064 21.319 22.652 21.986 21.986C22.652 21.319 23.065 20.651 23.37 19.86C23.666 19.095 23.869 18.224 23.928 16.947C23.988 15.667 24 15.26 24 12C24 8.74 23.985 8.333 23.928 7.053C23.868 5.776 23.666 4.904 23.37 4.14C23.064 3.351 22.652 2.681 21.986 2.014C21.319 1.347 20.651 0.935 19.86 0.63C19.095 0.333 18.224 0.131 16.947 0.072C15.667 0.012 15.26 0 12 0ZM12 2.16C15.203 2.16 15.585 2.176 16.85 2.231C18.02 2.286 18.655 2.48 19.077 2.646C19.639 2.863 20.037 3.123 20.459 3.542C20.878 3.962 21.138 4.361 21.355 4.923C21.519 5.345 21.715 5.98 21.768 7.15C21.825 8.416 21.838 8.796 21.838 12C21.838 15.204 21.823 15.585 21.764 16.85C21.703 18.02 21.508 18.655 21.343 19.077C21.119 19.639 20.864 20.037 20.444 20.459C20.025 20.878 19.62 21.138 19.064 21.355C18.644 21.519 17.999 21.715 16.829 21.768C15.555 21.825 15.18 21.838 11.97 21.838C8.759 21.838 8.384 21.823 7.111 21.764C5.94 21.703 5.295 21.508 4.875 21.343C4.306 21.119 3.915 20.864 3.496 20.444C3.075 20.025 2.806 19.62 2.596 19.064C2.431 18.644 2.237 17.999 2.176 16.829C2.131 15.569 2.115 15.18 2.115 11.985C2.115 8.789 2.131 8.399 2.176 7.124C2.237 5.954 2.431 5.31 2.596 4.89C2.806 4.32 3.075 3.93 3.496 3.509C3.915 3.09 4.306 2.82 4.875 2.611C5.295 2.445 5.926 2.25 7.096 2.19C8.371 2.145 8.746 2.13 11.955 2.13L12 2.16ZM12 5.838C8.595 5.838 5.838 8.598 5.838 12C5.838 15.405 8.598 18.162 12 18.162C15.405 18.162 18.162 15.402 18.162 12C18.162 8.595 15.402 5.838 12 5.838ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16ZM19.846 5.595C19.846 6.39 19.2 7.035 18.406 7.035C17.611 7.035 16.966 6.389 16.966 5.595C16.966 4.801 17.612 4.156 18.406 4.156C19.199 4.155 19.846 4.801 19.846 5.595Z" fill={black?'#ffffff':'#000000'}/>
    </svg>
    const vk = <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M23.4493 5.94799C23.6161 5.40154 23.4493 5 22.6553 5H20.0297C19.3621 5 19.0543 5.34687 18.8874 5.72936C18.8874 5.72936 17.5521 8.92607 15.6606 11.0025C15.0487 11.6036 14.7705 11.7949 14.4367 11.7949C14.2698 11.7949 14.0194 11.6036 14.0194 11.0572V5.94799C14.0194 5.29225 13.8345 5 13.2781 5H9.15213C8.73494 5 8.48403 5.30434 8.48403 5.59278C8.48403 6.21441 9.42974 6.35777 9.52722 8.10641V11.9042C9.52722 12.7368 9.37413 12.8878 9.04032 12.8878C8.15023 12.8878 5.98507 9.67682 4.70093 6.00261C4.44927 5.28847 4.19686 5 3.52583 5H0.900218C0.150044 5 0 5.34687 0 5.72936C0 6.41244 0.890141 9.80039 4.14464 14.2812C6.31429 17.3412 9.37118 19 12.1528 19C13.8218 19 14.0283 18.6316 14.0283 17.997V15.6842C14.0283 14.9474 14.1864 14.8003 14.7149 14.8003C15.1043 14.8003 15.7719 14.9916 17.3296 16.467C19.1099 18.2156 19.4034 19 20.4047 19H23.0304C23.7805 19 24.1556 18.6316 23.9392 17.9045C23.7024 17.1799 22.8525 16.1286 21.7247 14.8823C21.1127 14.1719 20.1947 13.4069 19.9165 13.0243C19.5271 12.5326 19.6384 12.314 19.9165 11.8769C19.9165 11.8769 23.1155 7.45067 23.4493 5.94799Z" fill={black?'#ffffff':'#000000'}/>
               </svg>
    const tg = <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" fill={black?'#ffffff':'#000000'}/>
               </svg>

    const yt = <svg width="24" height="17" viewBox="0 0 24 17" fill="red" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 2.641C23.3624 2.13028 23.095 1.66414 22.7226 1.28926C22.3502 0.91439 21.8858 0.643942 21.376 0.505C19.505 1.19209e-07 12 0 12 0C12 0 4.495 1.19209e-07 2.623 0.505C2.11341 0.644186 1.64929 0.914733 1.27708 1.28958C0.904861 1.66443 0.637591 2.13044 0.502 2.641C0 4.525 0 8.455 0 8.455C0 8.455 0 12.385 0.502 14.269C0.637586 14.7797 0.904975 15.2459 1.27739 15.6207C1.64981 15.9956 2.11418 16.2661 2.624 16.405C4.495 16.91 12 16.91 12 16.91C12 16.91 19.505 16.91 21.377 16.405C21.8869 16.2662 22.3513 15.9957 22.7237 15.6208C23.0961 15.246 23.3635 14.7798 23.499 14.269C24 12.385 24 8.455 24 8.455C24 8.455 24 4.525 23.498 2.641ZM9.545 12.023V4.887L15.818 8.455L9.545 12.023Z" fill={black?'#ffffff':'#000000'}/>
                </svg>



    switch (social) {
        case 'vk':
            return <a className={styles.social + ' ' + (black?styles.social_black:'')} href={url}>{vk}</a>
        case 'inst':
            return <a className={styles.social + ' ' +  (black?styles.social_black:'')} href={url}>{inst}</a>
        case 'tg':
            return <a className={styles.social + ' ' +  (black?styles.social_black:'')} href={url}>{tg}</a>
        case 'yt':
            return <a className={styles.social + ' ' +  (black?styles.social_black:'')} href={url}>{yt}</a>
    }
}

export default SocialLink;