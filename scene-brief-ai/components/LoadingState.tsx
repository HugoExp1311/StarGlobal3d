export default function LoadingState() {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium">Đang tạo nội dung...</p>
            <p className="text-sm text-gray-500">AI đang phân tích và tạo mô tả cho dự án của bạn</p>
        </div>
    );
}
