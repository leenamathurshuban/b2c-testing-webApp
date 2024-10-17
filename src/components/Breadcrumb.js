import { setCategoryName } from '@/appRedux/counterReducer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const Breadcrumb = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const selectedItem = useSelector(state => state?.counter?.activeTab)
    const productBreadcrumb = useSelector((state) => state?.counter?.productTitle)
    const categoryName = useSelector((state) => state?.counter?.categoryName);
    // Split the path into parts, filter out empty strings, and ignore numeric or query parameter values
    const pathArray = router.asPath
        .split('?')[0] // Remove query parameters
        .split('/') // Split path by "/"
        .filter((path) => path && isNaN(path)); // Filter out numeric values (like IDs)

    router.pathname != '/mac-parts/[product_name]' ? pathArray : pathArray.splice(1, 0, selectedItem, categoryName);

    // Function to format the page name, e.g., convert "mac-sale" to "Mac Sale"
    const formatPageName = (name) => {
        // if (router.pathname == '/[product_name]') {
        //     return productBreadcrumb
        // } else if (router.pathname == '/mac-sale/[tags]') {
        //     const saleRemove = pathArray[1]
        //     if (name === saleRemove) {
        //         if (name.includes('imac')) {
        //             return name
        //                 .replace(/i/g, 'i') // Ensure all 'i' are lowercase
        //                 .replace(/m/g, 'M') // Ensure all 'm' are uppercase
        //                 .replace('-sale', '');
        //         } else {
        //             return name
        //                 .replace('-sale', '')
        //                 .replace(/-/g, ' ') // Replace hyphens with spaces
        //                 .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
        //         }
        //     }
        //     return name
        //         .replace(/-/g, ' ') // Replace hyphens with spaces
        //         .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word

        // }
        // else if (router.pathname == '/mac-sale/[tags]/[allPro]') {
        //     const saleRemove = pathArray[1]
        //     const saleRemove1 = pathArray[2]
        //     if (name === saleRemove || saleRemove1) {
        //         if (name.includes('imac')) {
        //             return name
        //                 .replace(/i/g, 'i') // Ensure all 'i' are lowercase
        //                 .replace(/m/g, 'M') // Ensure all 'm' are uppercase
        //                 .replace('-sale', '');
        //         } else {
        //             return name
        //                 .replace('-sale', '')
        //                 .replace(/-/g, ' ') // Replace hyphens with spaces
        //                 .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
        //         }
        //     }
        //     return name
        //         .replace(/-/g, ' ') // Replace hyphens with spaces
        //         .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word

        // } else if (router.pathname == '/mac-sale/[tags]/[allPro]/[product_name]') {
        //     const findIndex = pathArray.length - 1
        //     const findValue = pathArray[findIndex]
        //     const saleRemove = pathArray[1]
        //     const saleRemove1 = pathArray[2]
        //     if (findValue !== name) {
        //         if (name === saleRemove || saleRemove1) {
        //             if (name.includes('imac')) {
        //                 return name
        //                     .replace(/i/g, 'i') // Ensure all 'i' are lowercase
        //                     .replace(/m/g, 'M') // Ensure all 'm' are uppercase
        //                     .replace('-sale', '');
        //             } else {
        //                 return name
        //                     .replace('-sale', '')
        //                     .replace(/-/g, ' ') // Replace hyphens with spaces
        //                     .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
        //             }
        //         }
        //         return name
        //             .replace(/-/g, ' ') // Replace hyphens with spaces
        //             .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
        //     } else {
        //         return productBreadcrumb
        //     }
        // } else 
        if (router.pathname == '/mac-parts/[product_name]') {
            const findIndex = pathArray.length - 1
            const findValue = pathArray[findIndex]
            if (findValue !== name) {
                if (name === "iMac" || name === "imac") {
                    return name
                        .replace(/i/g, 'i') // Ensure all 'i' are lowercase
                        .replace(/m/g, 'M'); // Ensure all 'm' are uppercase                    
                } else if (name === categoryName) {
                    return categoryName;
                }
                return name
                    .replace(/-/g, ' ') // Replace hyphens with spaces
                    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
            } else {
                return productBreadcrumb
            }
        } else {
            if (name.includes('imac')) {
                return name
                    .replace(/i/g, 'i') // Ensure all 'i' are lowercase
                    .replace(/m/g, 'M') // Ensure all 'm' are uppercase
                    .replace('-sale', '');
            } else if (name === "iMac") {
                return name
            } else if (name === categoryName) {
                return categoryName;
            }
            return name
                .replace(/-/g, ' ') // Replace hyphens with spaces
                .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
        }

    };


    return (
        <>
            {(router.asPath == "/mac-parts" || router.pathname == "/mac-parts/[product_name]") && (
                <nav className="breadcrumb-nav" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {/* {router.asPath == "/mac-parts" && (
                            <li key="home" className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                        )}
                        {router.pathname == "/mac-parts/[product_name]" && (
                            <li key="home" className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                        )} */}
                        <li key="home" className="breadcrumb-item">
                            <Link href="/">Home</Link>
                        </li>
                        {pathArray.map((path, index) => {
                            const href = '/' + pathArray.slice(0, index + 1).join('/');
                            const isLast = index === pathArray.length - 1;
                            if (router.asPath == "/mac-parts" || router.pathname === '/mac-parts/[product_name]') {
                                return (
                                    <li
                                        key={href}
                                        className={`breadcrumb-item${isLast ? ' active' : ''}`}
                                        aria-current={isLast ? 'page' : undefined}
                                    >
                                        {isLast && path !== 'mac-parts' ? (
                                            formatPageName(path)
                                        ) : (
                                            <Link href="/mac-parts">{formatPageName(path)}</Link>
                                        )}
                                    </li>
                                );

                            }

                        })}
                        {router.pathname == "/mac-parts" && selectedItem && (
                            <li className="breadcrumb-item active" aria-current="page">
                                {!categoryName ? (
                                    formatPageName(selectedItem)
                                ) : (
                                    <Link href='/mac-parts' onClick={()=>dispatch(setCategoryName(""))}>
                                        {formatPageName(selectedItem)}
                                    </Link>
                                )}
                            </li>
                        )}
                        {router.pathname == "/mac-parts" && categoryName && (
                            <li className="breadcrumb-item active" aria-current="page">
                                {router.pathname == "/mac-parts/[product_name]" ? (
                                    <Link href='/mac-parts'>
                                        {formatPageName(categoryName)}
                                    </Link>
                                ) : (
                                    formatPageName(categoryName)
                                )}

                            </li>
                        )}
                    </ol>
                </nav>
            )}
        </>
    );
};

export default Breadcrumb;