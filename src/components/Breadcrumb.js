import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Breadcrumb = () => {
    const router = useRouter();

    const selectedItem = useSelector(state => state?.counter?.activeTab)
    // Split the path into parts, filter out empty strings, and ignore numeric or query parameter values
    const pathArray = router.asPath
        .split('?')[0] // Remove query parameters
        .split('/') // Split path by "/"
        .filter((path) => path && isNaN(path)); // Filter out numeric values (like IDs)

    !router.query.product_name ? pathArray : pathArray.splice(1, 0, selectedItem);
    // Function to format the page name, e.g., convert "mac-sale" to "Mac Sale"
    const formatPageName = (name) => {
        return name
            .replace(/-/g, ' ') // Replace hyphens with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
    };

    return (
        <nav className="breadcrumb-nav" aria-label="breadcrumb">
            <ol className="breadcrumb">
                {router.asPath !== "/" && (
                    <li key="home" className="breadcrumb-item">
                        <Link href="/">Home</Link>
                    </li>
                )}
                {pathArray.map((path, index) => {
                    const href = '/' + pathArray.slice(0, index + 1).join('/');
                    const isLast = index === pathArray.length - 1;
                    return (
                        <li
                            key={href}
                            className={`breadcrumb-item${isLast ? ' active' : ''}`}
                            aria-current={isLast ? 'page' : undefined}
                        >
                            {isLast ? (
                                formatPageName(path)
                            ) : (
                                <Link href={href}>{formatPageName(path)}</Link>
                            )}
                        </li>
                    );
                })}
                {router.pathname == "/mac-parts" && selectedItem && (
                    <li className="breadcrumb-item active" aria-current="page">
                        {formatPageName(selectedItem)}
                    </li>
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
