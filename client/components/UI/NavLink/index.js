import Link from 'next/link'
import {useRouter} from 'next/router'

export default function NavLink({href, children, myClassName, myActiveClassName, handleClick}) {
    const router = useRouter()
    function checkActiveLink() {
        if (href === router.asPath) {
            return myActiveClassName
        }
        if ('/' + router.asPath.replaceAll('/', ' ').split(' ')[1] === href) {
            return myActiveClassName
        }

    }


    return (
        <Link
            href={href}
            onClick={handleClick}
            className={myClassName + ' ' + checkActiveLink()}
        >
            {children}
        </Link>
    )
}