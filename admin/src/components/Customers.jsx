import { useState, useEffect } from "react";
import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/getall');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="card">
                <div className="card-header">
                    <h2 className="text-xl font-semibold">All Users</h2>
                </div>
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Phone</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Role</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-600 dark:text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b border-slate-200 dark:border-slate-800">
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 dark:text-slate-50">
                                            {user.name}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 dark:text-slate-50">
                                            {user.email}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 dark:text-slate-50">
                                            {user.phone}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 dark:text-slate-50">
                                            {user.role}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-x-2">
                                                <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;
