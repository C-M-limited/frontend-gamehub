import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// import { userService } from 'services';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';

export { RouteGuard };

function RouteGuard({children}: React.PropsWithChildren<{}>) {
    const router = useRouter();
    const loginStatus = useSelector((state:RootState)=>(state.auth))
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        // authCheck(router.asPath);
        if (loginStatus.isLogin){
            router.push({
                pathname: '/',
                query: { returnUrl: router.asPath }
            });
        }

        // // on route change start - hide page content by setting authorized to false  
        // const hideContent = () => setAuthorized(false);
        // router.events.on('routeChangeStart', hideContent);

        // // on route change complete - run auth check 
        // router.events.on('routeChangeComplete', authCheck)

        // // unsubscribe from events in useEffect return function
        // return () => {
        //     router.events.off('routeChangeStart', hideContent);
        //     router.events.off('routeChangeComplete', authCheck);
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // function authCheck(url) {
    //     // redirect to login page if accessing a private page and not logged in 
    //     const publicPaths = ['/login'];
    //     const path = url.split('?')[0];
    //     if (!userService.userValue && !publicPaths.includes(path)) {
    //         setAuthorized(false);
    //         router.push({
    //             pathname: '/login',
    //             query: { returnUrl: router.asPath }
    //         });
    //     } else {
    //         setAuthorized(true);
    //     }
    // }

    return (authorized && children);
}