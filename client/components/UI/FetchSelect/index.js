import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import React, {useEffect, useMemo, useRef, useState} from 'react';
function FetchSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    useEffect(() => {
       setOptions([])
    }, [fetchOptions])

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

// Usage of DebounceSelect

export async function fetchUserList(username) {
    return fetch(`/api/creator/find/${username}`)
        .then((response) => response.json())
        .then((body) => {
                if (Array.isArray(body)) {
                    return body.map((user) => ({
                        label: user.fullName,
                        value: user.login,
                    }))
                }
                return []
            }
        );
}

export async function fetchReadAlsoPost(title) {
    return fetch(`/api/posts/find/${title}`)
        .then((response) => response.json())
        .then((body) => {
                if (Array.isArray(body)) {
                    return body.map((post) => ({
                        key: post._id,
                        label: post.title,
                        value: post.title,
                    }))
                }
                return []
            }
        );
}

export async function fetchReadAlsoCreatorPost(title) {
    return fetch(`/api/creator/posts/find/${title}`)
        .then((response) => response.json())
        .then((body) => {
                if (Array.isArray(body)) {
                    return body.map((post) => ({
                        key: post._id,
                        label: post.title,
                        value: post.title,
                    }))
                }
                return []
            }
        );
}

export default FetchSelect;