import React from 'react'


interface HowCardProp {
    title: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
}

const HowCard:React.FC<HowCardProp> = ({title, desc, icon, color}) => {
    return (
        <div>
            <div  className='text-left'>
                <div className={`mb-4 flex text-4xl ${color}`}>
                  <span> {icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
            </div>

        </div>
    )
}

export default HowCard
