import React, {useState} from 'react';
import data from './../../assets/borrowers.json'

const JSONFilterPage = () => {
    const [filterBorrowers, setFilterBorrowers] = useState(data);
    const [filter, setFilter] = useState([]);
    const objectKeys = Object.keys(data[0])
    const addANewFilter = () => {
        setFilter([...filter, {where: '', as: '', value: ''}])
    }


    const setFilterObj = (index, event, type) => {
        let value = event.target.value;
        let oldFilters = filter;
        let rem = oldFilters.splice(index, 1)
        rem[0][type] = value;
        oldFilters.splice(index, 0, rem[0]);
        setFilter(oldFilters);
        updateBorrowers();

    }

    const updateBorrowers = () => {
        let filterData = [];
        filterData = data.filter(item => {
            return filter.every(filterItem => {
                console.log(filterItem.where === 'startDate')
                if (filterItem.as === 'includes') {
                    return item[filterItem.where].toLowerCase().includes(filterItem.value)
                } else if (filterItem.as === 'equals') {
                    return item[filterItem.where].toLowerCase() === filterItem.value
                } else if (filterItem.as === 'less') {
                    if (filterItem.where === 'startDate' || filterItem.where === 'dateOfBirth') {
                        console.log(item[filterItem.where], new Date(filterItem.value))
                        return new Date(item[filterItem.where]) <= new Date(filterItem.value)
                    }
                    return item[filterItem.where] <= filterItem.value
                } else if (filterItem.as === 'greater') {
                    if (filterItem.where === 'startDate' || filterItem.where === 'dateOfBirth') {
                        return new Date(item[filterItem.where]) >= new Date(filterItem.value)

                    }
                    return item[filterItem.where] >= filterItem.value
                }


            })
        })
        console.log(filterData)
        setFilterBorrowers(filterData)

    }

    return (
        <div className={'main'}>
            <div className="filterSection">
                <div>
                    <h2>Filters</h2>
                    <button onClick={addANewFilter}> Add a filter</button>
                </div>
                {filter.map((filterItem, index) => {
                    return <div key={index}>
                        <span>Where</span>
                        <select
                            onChange={(e) => setFilterObj(index, e, 'where')}
                            name={'filterID'}>
                            {objectKeys.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        {filterItem.where !== '' && <select
                            onChange={(e) => setFilterObj(index, e, 'as')}>
                            {(filterItem.where === 'startDate' || filterItem.where === 'dateOfBirth' || filterItem.where === 'w2Income' || filterItem.where === 'creditScore') ?
                                <>
                                    <option value=""/>
                                    <option value="greater">Greater than
                                    </option>
                                    <option value="less">Less than</option>
                                </> :
                                <>
                                    <option selected value=""/>
                                    <option value="includes">Includes</option>
                                    <option value="equals">Equals</option>
                                </>
                            }
                        </select>}
                        {filterItem.where !== '' && <input
                            onChange={event => setFilterObj(index, event, 'value')}
                            type={(filterItem.where === 'startDate' || filterItem.where === 'dateOfBirth') ? 'date' : 'text'}/>}
                    </div>
                })}
            </div>
            <h2>Borrowers</h2>
            <table>
                <thead>
                <tr>
                    <th>
                        First name
                    </th>
                    <th>
                        Last name
                    </th>
                    <th>
                        dateOfBirth
                    </th>
                    <th>
                        CreditScore
                    </th>
                    <th>
                        maritalStatus
                    </th>
                    <th>
                        w2Income
                    </th>
                    <th>
                        emailAddress
                    </th>
                    <th>
                        homePhone
                    </th>
                    <th>
                        cellPhone
                    </th>
                    <th>
                        currentAddress
                    </th>
                    <th>
                        employer
                    </th>
                    <th>
                        title
                    </th>
                    <th>
                        startDate
                    </th>
                    <th>
                        subjectPropertyAddress
                    </th>
                </tr>
                </thead>
                <tbody>
                {filterBorrowers.map(item => {
                    return <tr key={item.id}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.dateOfBirth}</td>
                        <td>{item.creditScore}</td>
                        <td>{item.maritalStatus}</td>
                        <td>{item.w2Income}</td>
                        <td>{item.emailAddress}</td>
                        <td>{item.homePhone}</td>
                        <td>{item.cellPhone}</td>
                        <td>{item.currentAddress}</td>
                        <td>{item.employer}</td>
                        <td>{item.title}</td>
                        <td>{item.startDate}</td>
                        <td>{item.subjectPropertyAddress}</td>
                    </tr>
                })}
                {filterBorrowers.length === 0 ? 'No result found make' +
                    ' changes in filter' : null}
                </tbody>
            </table>
        </div>
    );
};

export default JSONFilterPage;
