import React, { useEffect, useState } from 'react';
import { apiSearch } from '../../../lib/api';
import { IUser, IUsersData } from '../../../lib/types';
import { BASE_URL } from '../../../lib/constants';

const debounceSearch = (delay, func) => {
    const timeoutIdRef = useRef(null);

    return (...args) => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }
        // Set a new timeout
        timeoutIdRef.current = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
export const Search = () => {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState<IUsersData[] | undefined>(undefined);
    
    const handleValueChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setValue( event.target.value );
    }

    const handleSearch = async (searchValue) => {
        if (searchValue !== '') {
            const response = await apiSearch(searchValue);
            console.log(response);
            if (response.payload && response.status === 'ok') {
                console.log(response.payload);
                setUsers(response.payload as IUsersData[]);
            }
        }
    };

    // Create a debounced version of the search function
    const debouncedSearch = debounceSearch(500, handleSearch);

    useEffect(() => {
        debouncedSearch(value);
    }, [value]); 

    return (
        <>
            <div className="searched-user">
                <div className="search">
                    <input 
                        type="text" 
                        value={value}
                        onChange={handleValueChange}
                    />
                </div>
                    {users && users.map(user => (
                        <div className="user-data" key={user.id}>
                            <div className="user-photo">
                                {
                                    user.picture && <img src={BASE_URL+user.picture} alt="" />
                                }
                            </div>
                            <p>{user.name} {user.surname}</p>
                        </div>
                    ))}
            </div> 
            {/* //debouncing */}
        </>
    );
};
