import { Menu, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Message } from '../Explore/exploreTypes';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
    const navItems = [
        { icon: <History className="w-5 h-5" />, label: 'Recent Tabs', active: true },
    ];
    const getExploreMessageHistory = localStorage.getItem("exploreMessage")
    const exploreMessageHistory = getExploreMessageHistory ? JSON.parse(getExploreMessageHistory) : []

    const navigate = useNavigate();
    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // Force a navigation to "/" even if we're already there
        navigate('/', { replace: true });
        // Dispatch a custom event that ExploreView can listen for
        window.dispatchEvent(new CustomEvent('resetExplore'));
    };

    const handleRecentTabs = (message: Message[]) => {
        navigate("/", {
            state: message
        })
    }

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed   top-0 left-0 h-full w-64 bg-[#1A1F2C] border-r border-[#2A2F3C] transform transition-transform duration-300 ease-in-out z-[90] ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <header className="border-b border-[#2A2F3C]">
                        <div className="flex  h-14 px-4 py-2">
                            <a href="/" onClick={handleLogoClick} className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
                                        <path
                                            fill="currentColor"
                                            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-white">
                                    Educasm
                                </span>
                            </a>
                        </div>
                    </header>
                    {/* <button
                        onClick={onToggle}
                        className="lg:hidden text-white hover:text-gray-300 transition-colors "
                    >
                        <X className="w-6 h-6 z-[70]" />
                    </button> */}
                    {/* Navigation */}
                    <nav className="flex px-2 pt-4">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href="#"
                                className='flex w-full items-center space-x-2 px-4 py-2 rounded-lg mb-1 transition-colors'
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>

                    {/* Recent Items List */}
                    <div className="flex-1 pl-11 space-y-3">
                        <div className="space-y-3 max-h-96 overflow-y-auto
                                        [&::-webkit-scrollbar]:w-2
                                        [&::-webkit-scrollbar-track]:rounded-full
                                        [&::-webkit-scrollbar-thumb]:rounded-full
                                        [&::-webkit-scrollbar-track]:bg-neutral-700
                                        [&::-webkit-scrollbar-thumb]:bg-neutral-500">


                            {exploreMessageHistory.length > 0 && exploreMessageHistory.map((item: Message[]) => {
                                const contentTitle = item.length > 0 && item[0].user.content;
                                return <div onClick={() => {
                                    handleRecentTabs(item)
                                    onToggle()
                                }} className="text-sm text-gray-400 py-1 px-2 hover:text-gray-200 cursor-pointer transition-colors">
                                    {contentTitle}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile toggle button */}
            <button
                onClick={onToggle}
                className="fixed top-2 right-4 lg:hidden bg-sidebar-background text-white p-3 rounded-full shadow-lg hover:bg-sidebar-hover transition-colors z-50"
            >
                <Menu className="w-6 h-6" />
            </button>
        </>
    );
};

export default Sidebar;