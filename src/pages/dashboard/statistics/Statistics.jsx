import { useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Statistics = () => {
    const axiosSecure = useAxiosSecure();
   
    const { data: stat = [], refetch } = useQuery({
        queryKey: ['stat'],
        queryFn: async () => {
            const res = await axios.get('https://byte-blitz-server.vercel.app/piechartdata');
            
            return res.data;
        }
    });

    const { productCount, reviewCount, userCount } = stat;

    const pieChartData = [
        { title: 'No Of Product', value: productCount, color: '#E38627' },
        { title: 'No Of Reviews', value: reviewCount, color: '#C13C37' },
        { title: 'No Of User', value: userCount, color: '#6A2135' },
    ];

    return (
        <div className='flex flex-col justify-center items-center mt-8'>
            <PieChart className='w-80' data={pieChartData} />
            <div className='flex mt-4'>
                {pieChartData.map((item, index) => (
                    <button
                        key={index}
                        style={{
                            backgroundColor: item.color,
                            color: '#fff',
                            padding: '8px',
                            marginRight: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {item.title}: {item.value}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Statistics;
