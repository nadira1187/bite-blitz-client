import { PieChart } from 'react-minimal-pie-chart';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaBox, FaStar, FaUsers } from 'react-icons/fa'; // Adding icons
import { Line, Bar } from 'react-chartjs-2'; // Import for additional charts
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// Register necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stat = [] } = useQuery({
        queryKey: ['stat'],
        queryFn: async () => {
            const res = await axiosSecure.get('/piechartdata');
            return res.data;
        }
    });

    const { productCount, reviewCount, userCount, monthlySales, monthlyUsers } = stat;

    const pieChartData = [
        { title: 'No Of Product', value: productCount, color: '#5C6BC0' },
        { title: 'No Of Reviews', value: reviewCount, color: '#1E88E5' },
        { title: 'No Of User', value: userCount, color: '#42A5F5' },
    ];
 // Bar Chart Data
 const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            label: 'Monthly Sales',
            data: monthlySales || [100, 200, 150, 220, 300],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        {
            label: 'Monthly Users',
            data: monthlyUsers || [50, 80, 70, 100, 120],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        },
    ],
};

// Line Chart Data
const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
        {
            label: 'Sales Trend',
            data: [500, 600, 700, 850],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        },
    ],
};

    return (
        <div className='flex flex-col justify-center items-center mt-8 px-4'>
            <h1 className='text-3xl font-semibold mb-6'>Statistics Overview</h1>

            {/* Flex Layout for Pie Chart and Cards */}
            <div className="flex flex-wrap justify-between items-start w-full">
                {/* Pie Chart Section */}
                <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                    <PieChart className='w-64' data={pieChartData} />
                </div>

                {/* Data Summary Cards */}
                <div className="w-full md:w-1/2 flex justify-between gap-6">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-xl w-1/3 text-center transform hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="flex justify-center items-center mb-4">
                            <FaBox className="text-white text-4xl" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Total Products</h3>
                        <p className="text-3xl text-white">{productCount}</p>
                    </div>
                    <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-6 rounded-lg shadow-xl w-1/3 text-center transform hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="flex justify-center items-center mb-4">
                            <FaStar className="text-white text-4xl" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Total Reviews</h3>
                        <p className="text-3xl text-white">{reviewCount}</p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 p-6 rounded-lg shadow-xl w-1/3 text-center transform hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="flex justify-center items-center mb-4">
                            <FaUsers className="text-white text-4xl" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Total Users</h3>
                        <p className="text-3xl text-white">{userCount}</p>
                    </div>
                </div>
            </div>
            
            {/* Action Buttons for Viewing Detailed Stats */}
            <div className="flex mt-6">
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
            <div className="w-full flex flex-col md:flex-row mt-6 gap-8">
                {/* Bar Chart */}
                <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-lg max-w-xl mx-auto">
                    <h2 className="text-2xl font-medium mb-4">Monthly Sales and Users</h2>
                    <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales & Users Overview' } } }} />
                </div>

                {/* Line Chart */}
                <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-lg max-w-xl mx-auto">
                    <h2 className="text-2xl font-medium mb-4">Sales Trend</h2>
                    <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales Trend Over Time' } } }} />
                </div>
            </div>


            {/* Recent Activity Feed */}
            <div className="mt-8 w-full p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-2xl font-medium mb-4">Recent Activity</h3>
                <ul>
                    <li className="mb-2">📦 New Product Added: Product XYZ</li>
                    <li className="mb-2">📝 New Review Posted: Product ABC</li>
                    <li className="mb-2">👥 New User Signed Up: John Doe</li>
                </ul>
            </div>
        </div>
    );
};

export default Statistics;
