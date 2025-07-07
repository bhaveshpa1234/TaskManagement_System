import React from 'react';

const Header = () => {
    return (
        <div className='bg-[#1d2125] w-100 h-12 p-3 border-b bordered-box flex flex-row justify-between border-b-[#9fadbc29]'>
            <div className="left justify-center items-center flex">
                <h3 className='text-slate-50'>Task Pilot</h3>
            </div>
            <div className="right flex items-center space-x-4">
                <button className='text-slate-50'>Logout</button>
                <img className='rounded-full h-10 width-auto' src="https://e7.pngegg.com/pngimages/215/344/png-clipart-computer-icons-task-management-action-item-compliance-icon-angle-text.png" alt="" />
            </div>
        </div>
    );
}

export default Header;