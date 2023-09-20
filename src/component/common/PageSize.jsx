import React, { useState, useEffect } from 'react';
import Selectbox from './atom/Selectbox';

export default function PageSize(props) {
    const { setPageSize = () => {}, options, totalCount } = props;
    const [selected, setSelected] = useState(options[0].value);

    useEffect(() => {
        setPageSize(selected);
    }, [selected]);

    return (
        <div className="flex gap-[0.938rem] items-center">
            <label className="text-text-light text-sm" htmlFor="">
                Show
            </label>
            <Selectbox option={options} selected={setSelected} isPagination={true} />
            <span className="text-text-light text-sm">{`Entries 1-${totalCount < selected ? totalCount : selected} of ${totalCount} entries`}</span>
        </div>
    );
}
